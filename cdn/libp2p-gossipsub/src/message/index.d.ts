/// <reference types="node" />
/**
 * Subscription Options
 */
export interface SubOpts {
    /**
     * Whether to subscribe of unsubscribe
     * true for subscribe, false for unsubscribe
     */
    subscribe?: boolean;
    /**
     * Topic ID
     */
    topicID?: string;
}
/**
 * Pubsub message
 */
export interface Message {
    /**
     * Peer id of the author of the message
     *
     * Note: This is not necessarily the peer who sent the RPC this message is contained in
     */
    from?: Buffer;
    /**
     * Opaque blob of data
     */
    data?: Buffer;
    /**
     * 64-bit big-endian uint
     *
     * No two messages on a topic from the same peer should have the same seqno value
     */
    seqno?: Buffer;
    /**
     * Set of topics being published to
     */
    topicIDs: string[];
    /**
     * Signature of the message
     *
     * The signature is computed over the marshalled message protobuf excluding the key field
     * The protobuf bloc is prefixed by the string `libp2p-pubsub:` before signing
     */
    signature?: Buffer;
    /**
     * Signing key
     */
    key?: Buffer;
}
declare type Overwrite<T1, T2> = {
    [P in Exclude<keyof T1, keyof T2>]: T1[P];
} & T2;
/**
 * Pubsub message, with `from` as a base58-encoded string
 */
export declare type InMessage = Overwrite<Message, {
    /**
     * Base58-encoded peer id
     */
    from?: string;
}>;
/**
 * IHAVE control message
 * Sent to notify a peer with a list of messages that were recently seen by the local router in the included topic id
 */
export interface ControlIHave {
    topicID?: string;
    messageIDs: string[];
}
/**
 * IWANT control message
 * Sent to request the full content of messages whose IDs were announced by a remote peer in an IHAVE message
 */
export interface ControlIWant {
    messageIDs: string[];
}
/**
 * GRAFT control message
 * Sent to notify a peer that it has been added to the local router's mesh for the included topic id
 */
export interface ControlGraft {
    topicID?: string;
}
/**
 * PRUNE control message
 * Sent to notify a peer that it has been removed from the local router's mesh for the included topic id
 */
export interface ControlPrune {
    topicID?: string;
}
/**
 * Gossip control message container
 */
export interface ControlMessage {
    ihave: ControlIHave[];
    iwant: ControlIWant[];
    graft: ControlGraft[];
    prune: ControlPrune[];
}
/**
 * Gossipsub RPC message
 */
export interface RPC {
    subscriptions: SubOpts[];
    msgs: Message[];
    control?: ControlMessage;
}
interface ProtoCodec<T> {
    encode(obj: T): Buffer;
    decode(buf: Buffer): T;
}
export declare const RPCCodec: ProtoCodec<RPC>;
export {};
