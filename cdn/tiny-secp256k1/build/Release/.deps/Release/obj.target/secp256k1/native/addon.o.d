cmd_Release/obj.target/secp256k1/native/addon.o := c++ '-DNODE_GYP_MODULE_NAME=secp256k1' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DUSE_NUM_NONE=1' '-DUSE_FIELD_INV_BUILTIN=1' '-DUSE_SCALAR_INV_BUILTIN=1' '-DHAVE___INT128=1' '-DUSE_ASM_X86_64=1' '-DUSE_FIELD_5X52=1' '-DUSE_FIELD_5X52_INT128=1' '-DUSE_SCALAR_4X64=1' '-DBUILDING_NODE_EXTENSION' -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/src -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/openssl/config -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/openssl/openssl/include -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/uv/include -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/zlib -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/v8/include -I/usr/local/include -I../native/secp256k1 -I../native/secp256k1/contrib -I../native/secp256k1/include -I../native/secp256k1/src -I../../nan  -Os -gdwarf-2 -mmacosx-version-min=10.7 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++1y -stdlib=libc++ -fno-rtti -fno-exceptions -stdlib=libc++ -MMD -MF ./Release/.deps/Release/obj.target/secp256k1/native/addon.o.d.raw   -c -o Release/obj.target/secp256k1/native/addon.o ../native/addon.cpp
Release/obj.target/secp256k1/native/addon.o: ../native/addon.cpp \
  ../../nan/nan.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_version.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/errno.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/version.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/unix.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/threadpool.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/darwin.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8-internal.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8-version.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8config.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8-platform.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_buffer.h \
  /Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_object_wrap.h \
  ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
  ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
  ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
  ../../nan/nan_implementation_12_inl.h \
  ../../nan/nan_persistent_12_inl.h ../../nan/nan_weak.h \
  ../../nan/nan_object_wrap.h ../../nan/nan_private.h \
  ../../nan/nan_typedarray_contents.h ../../nan/nan_json.h \
  ../native/secp256k1/include/secp256k1.h
../native/addon.cpp:
../../nan/nan.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_version.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/errno.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/version.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/unix.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/threadpool.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/uv/darwin.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8-internal.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8-version.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8config.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/v8-platform.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_buffer.h:
/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node/node_object_wrap.h:
../../nan/nan_callbacks.h:
../../nan/nan_callbacks_12_inl.h:
../../nan/nan_maybe_43_inl.h:
../../nan/nan_converters.h:
../../nan/nan_converters_43_inl.h:
../../nan/nan_new.h:
../../nan/nan_implementation_12_inl.h:
../../nan/nan_persistent_12_inl.h:
../../nan/nan_weak.h:
../../nan/nan_object_wrap.h:
../../nan/nan_private.h:
../../nan/nan_typedarray_contents.h:
../../nan/nan_json.h:
../native/secp256k1/include/secp256k1.h:
