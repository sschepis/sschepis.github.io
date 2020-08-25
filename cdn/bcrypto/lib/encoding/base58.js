/*!
 * base58.js - base58 for bcrypto
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcrypto
 */

'use strict';

if (process.env.NODE_BACKEND === 'js')
  module.exports = require('../js/base58');
else
  module.exports = require('../native/base58');
