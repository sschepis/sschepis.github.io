"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heartbeat = void 0;
const constants = __importStar(require("./constants"));
const getGossipPeers_1 = require("./getGossipPeers");
const utils_1 = require("./utils");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const errcode = require("err-code");
class Heartbeat {
    /**
     * @param {Object} gossipsub
     * @constructor
     */
    constructor(gossipsub) {
        this.gossipsub = gossipsub;
    }
    start() {
        if (this._heartbeatTimer) {
            const errMsg = 'Heartbeat timer is already running';
            this.gossipsub.log(errMsg);
            throw errcode(new Error(errMsg), 'ERR_HEARTBEAT_ALREADY_RUNNING');
        }
        const heartbeat = this._heartbeat.bind(this);
        const timeout = setTimeout(() => {
            heartbeat();
            this._heartbeatTimer.runPeriodically(heartbeat, constants.GossipsubHeartbeatInterval);
        }, constants.GossipsubHeartbeatInitialDelay);
        this._heartbeatTimer = {
            _intervalId: undefined,
            runPeriodically: (fn, period) => {
                this._heartbeatTimer._intervalId = setInterval(fn, period);
            },
            cancel: () => {
                clearTimeout(timeout);
                clearInterval(this._heartbeatTimer._intervalId);
            }
        };
    }
    /**
     * Unmounts the gossipsub protocol and shuts down every connection
     * @override
     * @returns {void}
     */
    stop() {
        if (!this._heartbeatTimer) {
            const errMsg = 'Heartbeat timer is not running';
            this.gossipsub.log(errMsg);
            throw errcode(new Error(errMsg), 'ERR_HEARTBEAT_NO_RUNNING');
        }
        this._heartbeatTimer.cancel();
        this._heartbeatTimer = null;
    }
    /**
     * Maintains the mesh and fanout maps in gossipsub.
     *
     * @returns {void}
     */
    _heartbeat() {
        // flush pending control message from retries and gossip
        // that hasn't been piggybacked since the last heartbeat
        this.gossipsub._flush();
        /**
         * @type {Map<Peer, Array<String>>}
         */
        const tograft = new Map();
        const toprune = new Map();
        // maintain the mesh for topics we have joined
        this.gossipsub.mesh.forEach((peers, topic) => {
            // do we have enough peers?
            if (peers.size < constants.GossipsubDlo) {
                const ineed = constants.GossipsubD - peers.size;
                const peersSet = getGossipPeers_1.getGossipPeers(this.gossipsub, topic, ineed);
                peersSet.forEach((peer) => {
                    // add topic peers not already in mesh
                    if (peers.has(peer)) {
                        return;
                    }
                    this.gossipsub.log('HEARTBEAT: Add mesh link to %s in %s', peer.id.toB58String(), topic);
                    peers.add(peer);
                    const peerGrafts = tograft.get(peer);
                    if (!peerGrafts) {
                        tograft.set(peer, [topic]);
                    }
                    else {
                        peerGrafts.push(topic);
                    }
                });
            }
            // do we have to many peers?
            if (peers.size > constants.GossipsubDhi) {
                const idontneed = peers.size - constants.GossipsubD;
                let peersArray = Array.from(peers);
                peersArray = utils_1.shuffle(peersArray);
                peersArray = peersArray.slice(0, idontneed);
                peersArray.forEach((peer) => {
                    this.gossipsub.log('HEARTBEAT: Remove mesh link to %s in %s', peer.id.toB58String(), topic);
                    peers.delete(peer);
                    const peerPrunes = toprune.get(peer);
                    if (!peerPrunes) {
                        toprune.set(peer, [topic]);
                    }
                    else {
                        peerPrunes.push(topic);
                    }
                });
            }
            this.gossipsub._emitGossip(topic, peers);
        });
        // expire fanout for topics we haven't published to in a while
        const now = this.gossipsub._now();
        this.gossipsub.lastpub.forEach((lastpb, topic) => {
            if ((lastpb + constants.GossipsubFanoutTTL) < now) {
                this.gossipsub.fanout.delete(topic);
                this.gossipsub.lastpub.delete(topic);
            }
        });
        // maintain our fanout for topics we are publishing but we have not joined
        this.gossipsub.fanout.forEach((peers, topic) => {
            // checks whether our peers are still in the topic
            const topicGossip = this.gossipsub.topics.get(topic);
            peers.forEach((peer) => {
                if (topicGossip.has(peer)) {
                    peers.delete(peer);
                }
            });
            // do we need more peers?
            if (peers.size < constants.GossipsubD) {
                const ineed = constants.GossipsubD - peers.size;
                const peersSet = getGossipPeers_1.getGossipPeers(this.gossipsub, topic, ineed);
                peersSet.forEach((peer) => {
                    if (!peers.has(peer)) {
                        return;
                    }
                    peers.add(peer);
                });
            }
            this.gossipsub._emitGossip(topic, peers);
        });
        // send coalesced GRAFT/PRUNE messages (will piggyback gossip)
        this.gossipsub._sendGraftPrune(tograft, toprune);
        // advance the message history window
        this.gossipsub.messageCache.shift();
        this.gossipsub.emit('gossipsub:heartbeat');
    }
}
exports.Heartbeat = Heartbeat;
