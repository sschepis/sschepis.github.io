function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

import { Buffer } from "buffer";
import { NOISE_MSG_MAX_LENGTH_BYTES, NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG } from "./constants";
// Returns generator that encrypts payload from the user
export function encryptStream(handshake) {
  return /*#__PURE__*/function () {
    var _ref = _wrapAsyncGenerator(function* (source) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = _asyncIterator(source), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
          const chunk = _value;
          const chunkBuffer = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.length);

          for (let i = 0; i < chunkBuffer.length; i += NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG) {
            let end = i + NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG;

            if (end > chunkBuffer.length) {
              end = chunkBuffer.length;
            }

            const data = handshake.encrypt(chunkBuffer.slice(i, end), handshake.session);
            yield data;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            yield _awaitAsyncGenerator(_iterator.return());
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
} // Decrypt received payload to the user

export function decryptStream(handshake) {
  return /*#__PURE__*/function () {
    var _ref2 = _wrapAsyncGenerator(function* (source) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;

      var _iteratorError2;

      try {
        for (var _iterator2 = _asyncIterator(source), _step2, _value2; _step2 = yield _awaitAsyncGenerator(_iterator2.next()), _iteratorNormalCompletion2 = _step2.done, _value2 = yield _awaitAsyncGenerator(_step2.value), !_iteratorNormalCompletion2; _iteratorNormalCompletion2 = true) {
          const chunk = _value2;
          const chunkBuffer = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.length);

          for (let i = 0; i < chunkBuffer.length; i += NOISE_MSG_MAX_LENGTH_BYTES) {
            let end = i + NOISE_MSG_MAX_LENGTH_BYTES;

            if (end > chunkBuffer.length) {
              end = chunkBuffer.length;
            }

            const chunk = chunkBuffer.slice(i, end);
            const {
              plaintext: decrypted,
              valid
            } = yield _awaitAsyncGenerator(handshake.decrypt(chunk, handshake.session));

            if (!valid) {
              throw new Error("Failed to validate decrypted chunk");
            }

            yield decrypted;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            yield _awaitAsyncGenerator(_iterator2.return());
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
}
//# sourceMappingURL=crypto.js.map