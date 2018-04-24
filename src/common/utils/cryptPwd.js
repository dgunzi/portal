/**
 *  应测试要求，给表单提交时要用base64加密。
 *
 *  Javascript内部的字符串，都以utf-16的形式进行保存，因此编码的时候，
 *  我们首先必须将utf-8的值转成utf-16再编码，解码的时候，则是解码后还需要将utf-16的值转回成utf-8。
 * */

function utf16to8(str) {
  let out, i, len, c;
  out = '';
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}

function utf8to16(str) {
  let out, i, len, c;
  let char2, char3;
  out = '';
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
// 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:
      case 13:
// 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
// 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
}

export function encryptPwd(pwd) {
  return btoa(utf8to16(pwd));
}

export function decryptPwd(pwd) {
  return utf16to8(atob(pwd));
}

const cryptPwd = {
  encryptPwd,
  decryptPwd
};

export default cryptPwd;
