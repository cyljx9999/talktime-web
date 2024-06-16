// @ts-ignore
import { JSEncrypt } from "encryptlong"

// rsa公钥加密
export function rsaEncrypt(param) {
    const encrypt = new JSEncrypt()
    // @ts-ignore
    encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiquj4HR5VBtSJiKTyr18/vLaO5fJb6L/BrawFR4u+QCP3SF6SEd4pwp5Ev2R5pS34YGU00XFCejPgDfsSnRITanvv5a5wnNLFJMaz7ACxCrZjmW3z+ZppR/I19mJsaTOOopChUMJNBdvxUO13suwYad1Nhk5fmAJn0xQJgeWR/QIDAQAB")
    // @ts-ignore
    return encrypt.encryptLong(encodeURIComponent(JSON.stringify(param)))
}


// rsa私钥加密
export function rsaDecrypt(param) {
    const encrypt = new JSEncrypt()
    // @ts-ignore
    encrypt.setPrivateKey("MIICWgIBAAKBgG0ZdSVQahU6blq3eAUdvGwH2jjKj7l1ZEQUexTFTt3Hg3LsumBVPFtMptgMQzLhwAzp0NiZHHd9DuGDT/jOq4+vbWsvCZQeo+RqK2qi49y8duoOYlUwHHYAgqMlguanR+0M4tXDOO+uExAbMYROQmRxR5JWlUbhBlqyvPKKLFvlAgMBAAECgYA12fQN+BR06AOiuZ7/f38LIBEiKTIqS/yy8h0S0pWsORf0OU+Bz3DcbAiK6fqdefsPJLaWw3TeshcPT37BBFqADA5aOCp5rsR5JJVg9FD/ieZ8JmL28PPwXwQ4uwGabuslk5F3p/uH1APPi8Zq0Uh+XOX6qQ7zayrHtSln10ImgQJBAKexfNQtczc3dd+WuoiebCAEW+kAtiBooYdUSBq5fCwwxLdqwUTwLfFN3EUN1L+iklGTtg0V8+gpTieqo1N/HCECQQCmjQI0ziuDq5Vx0JMP0VDGb/WMHbAHaOygVVUjAAJPC9I8M0bSINd0xkAlQsIV3+6yc4ymvVL4n96GjUnFiOdFAkBCMKBg73+mr9Fq64e9HSr4iD/u/ETnDeWUEQRU6BnHJ4i+DPk0SMkZke37o7Xx3i163Z7iE2Quov8iUQwejPGBAkA+xAFC2Te45V7qh4oEegOQ5PyKk12VTUtvmPj+ubAlDfVqzoAwDERmM5hU8nWmPL/97GHjLJIqNEVuO6zDjrZpAkABobpOY2cge7G7UWsWzI40vJemdfpyFQ+mM/qiMPGzM/9xwczjuRa7TD2ulh5aKI5BZw35ggrn23IJECrUI92u")
    // @ts-ignore
    return JSON.parse(encrypt.decryptLong(param))
}
