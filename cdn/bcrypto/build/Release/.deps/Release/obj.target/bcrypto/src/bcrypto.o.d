cmd_Release/obj.target/bcrypto/src/bcrypto.o := c++ '-DNODE_GYP_MODULE_NAME=bcrypto' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DTORSION_USE_64BIT' '-DTORSION_USE_ASM' '-DTORSION_USE_OPENSSL' '-DBCRYPTO_USE_SECP256K1' '-DUSE_ENDOMORPHISM' '-DENABLE_MODULE_ECDH' '-DENABLE_MODULE_ELLIGATOR' '-DENABLE_MODULE_EXTRA' '-DENABLE_MODULE_RECOVERY' '-DENABLE_MODULE_SCHNORRLEG' '-DHAVE___INT128' '-DUSE_ASM_X86_64' '-DUSE_FIELD_5X52' '-DUSE_SCALAR_4X64' '-DUSE_NUM_NONE' '-DUSE_FIELD_INV_BUILTIN' '-DUSE_SCALAR_INV_BUILTIN' '-DBUILDING_NODE_EXTENSION' -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/src -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/openssl/config -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/openssl/openssl/include -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/uv/include -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/zlib -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/v8/include -I../src/torsion/include  -Os -gdwarf-2 -mmacosx-version-min=10.10 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++1y -stdlib=libc++ -fno-rtti -fno-exceptions -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/bcrypto/src/bcrypto.o.d.raw   -c -o Release/obj.target/bcrypto/src/bcrypto.o ../src/bcrypto.cc
Release/obj.target/bcrypto/src/bcrypto.o: ../src/bcrypto.cc \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_api.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/js_native_api.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/js_native_api_types.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_api_types.h \
  ../src/torsion/include/torsion/aead.h \
  ../src/torsion/include/torsion/chacha20.h \
  ../src/torsion/include/torsion/poly1305.h \
  ../src/torsion/include/torsion/drbg.h \
  ../src/torsion/include/torsion/hash.h \
  ../src/torsion/include/torsion/dsa.h \
  ../src/torsion/include/torsion/ecc.h \
  ../src/torsion/include/torsion/kdf.h \
  ../src/torsion/include/torsion/rsa.h \
  ../src/torsion/include/torsion/salsa20.h \
  ../src/torsion/include/torsion/siphash.h \
  ../src/torsion/include/torsion/util.h ../src/base58/base58.h \
  ../src/bech32/bech32.h ../src/cash32/cash32.h ../src/murmur3/murmur3.h \
  ../src/secp256k1/include/secp256k1.h \
  ../src/secp256k1/include/secp256k1_ecdh.h \
  ../src/secp256k1/include/secp256k1_elligator.h \
  ../src/secp256k1/include/secp256k1_extra.h \
  ../src/secp256k1/include/secp256k1_recovery.h \
  ../src/secp256k1/include/secp256k1_schnorrleg.h \
  ../src/secp256k1/contrib/lax_der_parsing.h \
  ../src/secp256k1/contrib/../include/secp256k1.h
../src/bcrypto.cc:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_api.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/js_native_api.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/js_native_api_types.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_api_types.h:
../src/torsion/include/torsion/aead.h:
../src/torsion/include/torsion/chacha20.h:
../src/torsion/include/torsion/poly1305.h:
../src/torsion/include/torsion/drbg.h:
../src/torsion/include/torsion/hash.h:
../src/torsion/include/torsion/dsa.h:
../src/torsion/include/torsion/ecc.h:
../src/torsion/include/torsion/kdf.h:
../src/torsion/include/torsion/rsa.h:
../src/torsion/include/torsion/salsa20.h:
../src/torsion/include/torsion/siphash.h:
../src/torsion/include/torsion/util.h:
../src/base58/base58.h:
../src/bech32/bech32.h:
../src/cash32/cash32.h:
../src/murmur3/murmur3.h:
../src/secp256k1/include/secp256k1.h:
../src/secp256k1/include/secp256k1_ecdh.h:
../src/secp256k1/include/secp256k1_elligator.h:
../src/secp256k1/include/secp256k1_extra.h:
../src/secp256k1/include/secp256k1_recovery.h:
../src/secp256k1/include/secp256k1_schnorrleg.h:
../src/secp256k1/contrib/lax_der_parsing.h:
../src/secp256k1/contrib/../include/secp256k1.h:
