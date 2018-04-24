export function isIp(ip) {
  let reg = new RegExp(/^((([0-9]|(([1-9]|1[0-9])[0-9]))|(2([0-4][0-9]|5[0-5])))\.){3}(([0-9]|(([1-9]|1[0-9])[0-9]))|(2([0-4][0-9]|5[0-5])))$/);
  return reg.test(ip);
}

export function isMac(mac) {
  let reg = new RegExp(/^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/);
  return reg.test(mac);
}

export function isPosInt(num) {
  let reg = new RegExp(/^[1-9][0-9]*$/);
  return reg.test(num);
}
