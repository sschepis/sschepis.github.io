cmd_Release/obj.target/bcrypto/src/secp256k1/src/secp256k1.o := cc '-DNODE_GYP_MODULE_NAME=bcrypto' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DTORSION_USE_64BIT' '-DTORSION_USE_ASM' '-DTORSION_USE_OPENSSL' '-DBCRYPTO_USE_SECP256K1' '-DUSE_ENDOMORPHISM' '-DENABLE_MODULE_ECDH' '-DENABLE_MODULE_ELLIGATOR' '-DENABLE_MODULE_EXTRA' '-DENABLE_MODULE_RECOVERY' '-DENABLE_MODULE_SCHNORRLEG' '-DHAVE___INT128' '-DUSE_ASM_X86_64' '-DUSE_FIELD_5X52' '-DUSE_SCALAR_4X64' '-DUSE_NUM_NONE' '-DUSE_FIELD_INV_BUILTIN' '-DUSE_SCALAR_INV_BUILTIN' '-DBUILDING_NODE_EXTENSION' -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/include/node -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/src -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/openssl/config -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/openssl/openssl/include -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/uv/include -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/zlib -I/Users/sschepis/Library/Caches/node-gyp/12.16.3/deps/v8/include -I../src/torsion/include  -Os -gdwarf-2 -mmacosx-version-min=10.10 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/bcrypto/src/secp256k1/src/secp256k1.o.d.raw   -c -o Release/obj.target/bcrypto/src/secp256k1/src/secp256k1.o ../src/secp256k1/src/secp256k1.c
Release/obj.target/bcrypto/src/secp256k1/src/secp256k1.o: \
  ../src/secp256k1/src/secp256k1.c \
  ../src/secp256k1/src/../include/secp256k1.h \
  ../src/secp256k1/src/util.h ../src/secp256k1/src/num_impl.h \
  ../src/secp256k1/src/num.h ../src/secp256k1/src/field_impl.h \
  ../src/secp256k1/src/field_5x52_impl.h ../src/secp256k1/src/field.h \
  ../src/secp256k1/src/field_5x52.h \
  ../src/secp256k1/src/field_5x52_asm_impl.h \
  ../src/secp256k1/src/scalar_impl.h ../src/secp256k1/src/group.h \
  ../src/secp256k1/src/scalar.h ../src/secp256k1/src/scalar_4x64.h \
  ../src/secp256k1/src/scalar_4x64_impl.h \
  ../src/secp256k1/src/group_impl.h ../src/secp256k1/src/ecmult_impl.h \
  ../src/secp256k1/src/ecmult.h ../src/secp256k1/src/scratch.h \
  ../src/secp256k1/src/ecmult_const_impl.h \
  ../src/secp256k1/src/ecmult_const.h \
  ../src/secp256k1/src/ecmult_gen_impl.h \
  ../src/secp256k1/src/ecmult_gen.h ../src/secp256k1/src/hash_impl.h \
  ../src/secp256k1/src/hash.h ../src/secp256k1/src/ecdsa_impl.h \
  ../src/secp256k1/src/ecdsa.h ../src/secp256k1/src/eckey_impl.h \
  ../src/secp256k1/src/eckey.h ../src/secp256k1/src/scratch_impl.h \
  ../src/secp256k1/src/modules/ecdh/main_impl.h \
  ../src/secp256k1/src/modules/ecdh/../../../include/secp256k1_ecdh.h \
  ../src/secp256k1/src/modules/ecdh/../../ecmult_const_impl.h \
  ../src/secp256k1/src/modules/schnorrleg/main_impl.h \
  ../src/secp256k1/src/modules/schnorrleg/../../../include/secp256k1.h \
  ../src/secp256k1/src/modules/schnorrleg/../../../include/secp256k1_schnorrleg.h \
  ../src/secp256k1/src/modules/schnorrleg/../../hash.h \
  ../src/secp256k1/src/modules/recovery/main_impl.h \
  ../src/secp256k1/src/modules/recovery/../../../include/secp256k1_recovery.h \
  ../src/secp256k1/src/modules/elligator/main_impl.h \
  ../src/secp256k1/src/modules/elligator/../../../include/secp256k1_elligator.h \
  ../src/secp256k1/src/modules/extra/main_impl.h \
  ../src/secp256k1/src/modules/extra/../../../include/secp256k1_extra.h
../src/secp256k1/src/secp256k1.c:
../src/secp256k1/src/../include/secp256k1.h:
../src/secp256k1/src/util.h:
../src/secp256k1/src/num_impl.h:
../src/secp256k1/src/num.h:
../src/secp256k1/src/field_impl.h:
../src/secp256k1/src/field_5x52_impl.h:
../src/secp256k1/src/field.h:
../src/secp256k1/src/field_5x52.h:
../src/secp256k1/src/field_5x52_asm_impl.h:
../src/secp256k1/src/scalar_impl.h:
../src/secp256k1/src/group.h:
../src/secp256k1/src/scalar.h:
../src/secp256k1/src/scalar_4x64.h:
../src/secp256k1/src/scalar_4x64_impl.h:
../src/secp256k1/src/group_impl.h:
../src/secp256k1/src/ecmult_impl.h:
../src/secp256k1/src/ecmult.h:
../src/secp256k1/src/scratch.h:
../src/secp256k1/src/ecmult_const_impl.h:
../src/secp256k1/src/ecmult_const.h:
../src/secp256k1/src/ecmult_gen_impl.h:
../src/secp256k1/src/ecmult_gen.h:
../src/secp256k1/src/hash_impl.h:
../src/secp256k1/src/hash.h:
../src/secp256k1/src/ecdsa_impl.h:
../src/secp256k1/src/ecdsa.h:
../src/secp256k1/src/eckey_impl.h:
../src/secp256k1/src/eckey.h:
../src/secp256k1/src/scratch_impl.h:
../src/secp256k1/src/modules/ecdh/main_impl.h:
../src/secp256k1/src/modules/ecdh/../../../include/secp256k1_ecdh.h:
../src/secp256k1/src/modules/ecdh/../../ecmult_const_impl.h:
../src/secp256k1/src/modules/schnorrleg/main_impl.h:
../src/secp256k1/src/modules/schnorrleg/../../../include/secp256k1.h:
../src/secp256k1/src/modules/schnorrleg/../../../include/secp256k1_schnorrleg.h:
../src/secp256k1/src/modules/schnorrleg/../../hash.h:
../src/secp256k1/src/modules/recovery/main_impl.h:
../src/secp256k1/src/modules/recovery/../../../include/secp256k1_recovery.h:
../src/secp256k1/src/modules/elligator/main_impl.h:
../src/secp256k1/src/modules/elligator/../../../include/secp256k1_elligator.h:
../src/secp256k1/src/modules/extra/main_impl.h:
../src/secp256k1/src/modules/extra/../../../include/secp256k1_extra.h:
