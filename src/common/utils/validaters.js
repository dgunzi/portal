/**
 * Created by tang on 2017/5/11.
 */
function validatorNotNull(rule, value, callback) {
  if (value || value === 0) {
    callback();
  } else {
    callback(new Error('不能为空'));
  }
};

function validatorIP(rule, value, callback) {
  if (!value) {
    callback();
    return;
  };
  let regIpv4 = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
  var regIpv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  if (value.indexOf(',') !== -1) {
    let arr = value.split(',');
    for (let i = 0; i < arr.length; i++) {
      if (!regIpv4.test(arr[i]) && !regIpv6.test(arr[i])) {
        callback(new Error(`第${i + 1}个ip格式不正确`));
      }
    }
  } else {
    if (!regIpv4.test(value) && !regIpv6.test(value)) {
      callback(new Error('ip格式不正确'));
    }
  }
  callback();
};

function isIpv4(value) {
  let flag = true;
  let reg = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
  if (value.indexOf(',') !== -1) {
    let arr = value.split(',');
    for (let i = 0; i < arr.length; i++) {
      if (!reg.test(arr[i])) {
        flag = false;
      }
    }
  } else {
    if (!reg.test(value)) {
      flag = false;
    }
  }
  return flag;
}
function isIpv6(value) {
  let flag = true;
  var reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  if (value.indexOf(',') !== -1) {
    let arr = value.split(',');
    for (let i = 0; i < arr.length; i++) {
      if (!reg.test(arr[i])) {
        flag = false;
      }
    }
  } else {
    if (!reg.test(value)) {
      flag = false;
    }
  }
  return flag;
}
function isIp(value) {
  if (!value) return true;
  if (isIpv4(value) || isIpv6(value)) {
    return true;
  }
  return false;
}

function isMac(value) {
  if (!value) return true;
  let flag = true;
  let reg = /^[0-9a-fA-F]{2}((:[0-9a-fA-F]{2}){5}|(\-[0-9a-fA-F]{2}){5})$/;
  if (value.indexOf(',') !== -1) {
    let arr = value.split(',');
    for (let i = 0; i < arr.length; i++) {
      if (!reg.test(arr[i])) {
        flag = false;
      }
    }
  } else {
    if (!reg.test(value)) {
      flag = false;
    }
  }
  return flag;
}

function validatorIsNumber(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  let reg = /^\d+$/;
  if (!reg.test(value)) {
    callback(new Error(`只能是数字`));
  }
  callback();
}

function isNum(value) {
  if (!value) return true;
  let reg = /^\d+$/;
  if (!reg.test(value)) {
    return false;
  }
  return true;
}

function validatorMaxNum(num) {
  return function (rule, value, callback) {
    if (!value) {
      callback();
      return;
    }
    if (value - 0 > num) {
      callback(new Error(`最大值为${num}`));
    } else {
      callback();
    }
  }
}

function validatorMinNum(num) {
  return function (rule, value, callback) {
    if (!value) {
      callback();
      return;
    }
    if (value - 0 < num) {
      callback(new Error(`最小值为${num}`));
    } else {
      callback();
    }
  }
}
/**
 *  方法属性以is开头，可供外部直接使用方法
 *  注意： Max、Min是检测字符串长度，MaxNum、MinNum是检测数值大小
 */
export default {
  NotNull: { required: true, validator: validatorNotNull, trigger: 'blur' },
  // NotNull: { required: true, message: '不能为空', trigger: 'blur' },
  IP: { validator: validatorIP, trigger: 'blur' },
  Mac: {pattern: /^[0-9a-fA-F]{2}((:[0-9a-fA-F]{2}){5}|(\-[0-9a-fA-F]{2}){5})$/, message: 'mac地址格式不对', trigger: 'blur'},
  Number: { validator: validatorIsNumber, trigger: 'blur' },
  Name: { pattern: /^[\u4e00-\u9fa5|\w|\-|\.]+$/, message: '由中文、字母、数字、符号[_-.]组成', trigger: 'blur' },
  Max(num) {
    return { max: num, message: `最大长度为${num}`, trigger: 'blur' };
  },
  Min(num) {
    return { min: num, message: `最小字节数为${num}`, trigger: 'blur' };
  },
  MaxNum(num) {
    return { validator: validatorMaxNum(num), trigger: 'blur' }
  },
  MinNum(num) {
    return { validator: validatorMinNum(num), trigger: 'blur' }
  },
  // 国内移动电话
  MobilePhone: { pattern: /^(13|14|15|18)[0-9]{9}$/, message: '电话号码格式不对', trigger: 'blur' },
  // 国内固定电话
  TelePhone: { pattern: /^[0-9-()（）]{7,18}$/, message: '电话号码格式不对', trigger: 'blur' },
  Email: { pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/, message: 'email格式不对', trigger: 'blur' },
  IdCard: { pattern: /^\d{17}[\d|x]|\d{15}$/, message: '身份证号格式不对', trigger: 'blur' },
  isIpv4: isIpv4,
  isIpv6: isIpv6,
  isIp: isIp,
  isMac: isMac,
  isNum: isNum
}
