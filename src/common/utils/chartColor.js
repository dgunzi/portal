/**
 * Created by dingyf on 2017/6/15.
 */
export default function getColorList(xdata) {
  var colorList = [];
  for (let i = 0; i <= xdata.length - 1; i++) {
    switch (xdata[i]) {
      case '正常':colorList.push('#16b69a'); break;
      case '告警':colorList.push('#ffbd64'); break;
      case '宕机':colorList.push('#eb7d7e'); break;
      case '严重':colorList.push('#eb7d7e'); break;
      case '主要':colorList.push('#cd6894'); break;
      case '次要':colorList.push('#724c7d'); break;
      case '警告':colorList.push('#ffbd64'); break;
      case '提示':colorList.push('#5ab1ef'); break;
      case '未知':colorList.push('#7b7e89'); break;
      case '警报':colorList.push('#e5cf0d'); break;
      case '致命':colorList.push('#d57deb'); break;
      case '错误':colorList.push('#eb7d7e'); break;
      case '信息':colorList.push('#9bcb62'); break;
      case '应急':colorList.push('#95706d'); break;
      case '诊断':colorList.push('#14B79B'); break;
    }
  }
  return colorList;
}
