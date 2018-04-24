/**
 * Created by alex on 2017/5/20.
 */

/* 对象交集 */
export function intersectObj(sourceObj, targetObj) {
  var res = {};
  for (let key in targetObj) {
    if (sourceObj.hasOwnProperty(key) && (targetObj.hasOwnProperty(key))) {
      res[key] = targetObj[key]
    }
  }
  return res;
}
/* 批量操作时候获取UUID */
export function batchUuid(uuid, arr) {
  var res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let key in arr[i]) {
      if (key === uuid) {
        res.push(arr[i][key])
      }
    }
  }
  return res;
}
/**
 *
 * @param arr 原数组
 * @param arrkey 原数组中的key
 * @param reskey 输出结果的key
 * @returns {Array}
 */
export function batchUuids(arr, arrkey, reskey) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][arrkey]) {
      res.push({});
      res[i][reskey] = arr[i][arrkey];
    }
  }
  return res;
}
/**
 * 告警新增-删除客户端引用
 * @param arr 数据列表的数组
 * @param uuidarr 要删除的uuid数组
 * @param uuid 匹配uuid删除
 */
export function delArray(arr, uuidarr, uuid) {
  if (arr.length > 0 && uuidarr.length > 0 && uuid) {
    for (let i = 0; i < uuidarr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j][uuid] === uuidarr[i][uuid]) {
          arr.splice(j, 1);
          break;
        }
      }
    }
  }
}

export function delDiffArray(arr, delarr) {
  for (let i = 0; i < delarr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (delarr[i].tmp && arr[j].tmp && delarr[i].userRealName === arr[j].userRealName) {
        arr.splice(j, 1);
        break;
      } else {
        if (delarr[i].uuid === arr[j].uuid) {
          arr.splice(j, 1);
          break;
        }
      }
    }
  }
}

/**
 * 事件中心-规则部分-数字转为对应的label
 * @param arr 存有key和label的数组
 * @param string  key的字符串
 * @param key key名
 * @returns {Array}
 */
export function numTransToArr(arr, string, key) {
  if (!key) {
    key = 'id';
  }
  let res = [];
  let sArr = string.split(',');
  for (let i = 0; i < sArr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (Number(sArr[i]) === arr[j][key]) {
        res.push(arr[j]);
        break;
      }
    }
  }
  return res;
}

export function numTransToString(arr, num, key1, key2) {
  if (num) {
    num = Number(num);
    if (!key1) {
      key1 = 'id';
    }
    if (!key2) {
      key2 = 'name';
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key1] && arr[i][key1] === num) {
        if (arr[i][key2]) {
          return ' ' + arr[i][key2] + ' ';
        } else {
          return '';
        }
      }
    }
  } else {
    return '';
  }
}
