/**
 * Created by YOU on 2017/4/27.
 */
function addZero(str) {
  str += ''
  return str.length > 1 ? str : '0' + str
}
export default function () {
  let time = new Date()
  return `${time.getFullYear()}-${addZero(time.getMonth() + 1)}-${addZero(time.getDate())} ${addZero(time.getHours())}:${addZero(time.getMinutes())}:${addZero(time.getSeconds())}`
}
