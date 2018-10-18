/**
 * Created by dingyf on 2017/7/4.
 */

let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/* RGB和非标准的颜色转换为标准的16进制 */
export default function colorHex (str) {
  var that = str;
  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      var numHex = '#';
      for (var j = 0; j < aNum.length; j += 1) {
        numHex += (aNum[j] + aNum[j]);
      }
      return numHex;
    }
  } else {
    return that;
  }
}
