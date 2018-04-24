/**
 * Created by alex on 2017/5/5.
 */
import axios from 'axios';
import {merge} from 'lodash'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));
axios.defaults.withCredentials = true;

const globalOptions = {
  baseURL: 'https://192.168.211.218',
  timeout: 60000,
  headers: {
    'axios-header': 'axios'
  }
};

/**
 * 对所有请求添加时间戳
 */
function convertURL(url) {
  // 获取时间戳
  let timstamp = (new Date()).valueOf();
  // 将时间戳信息拼接到url上
  if (url.indexOf('?') >= 0) {
    url = url + '&t=' + timstamp;
  } else {
    url = url + '?t=' + timstamp;
  }
  return url;
}

function checkStatus(response) {
  if (!response || response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: response.statusText
    }
  }
}

function checkCode(res) {
  if (res && res.data.code === -404) {
    alert(res.data.message)
  }
  return res
}

function checkTimeout(res) {
  if (res && res.data === 'timeout') {
    let theme = localStorage.getItem('theme')
    localStorage.clear()
    if (theme !== null) {
      localStorage.setItem('theme', theme)
    }
    location.reload('/login');
    return res
  } else {
    return res
  }
}

function checkRes(res) {
  let success = ['success', 'success_on', 'success_off', 'true', true];
  let str = '';
  if (res) {
    if (success.indexOf(res.data) !== -1) {
      str = '成功';
    } else if (isArray(res.data)) {
      str = '成功';
    } else if (res.data.true) {
      str = '成功';
    } else if (Object.keys(res.data).length === 0 && typeof res.data === 'object') {
      str = '成功';
    } else if (res.data.success || res.data.saveSuccess || res.data.modifySuccess) {
      str = '成功'
    } else if (res.data.hasOwnProperty('saveSuccess') || res.data.hasOwnProperty('success') || res.data.hasOwnProperty('modifySuccess')) {
      str = '成功'
    } else if (res.data instanceof Object) {
      if (res.data.true || res.data.uuid || res.data.status === true || res.data.status === 'true') {
        str = '成功'
      } else {
        str = '失败'
      }
    } else if (res.data > 0) {
      str = '成功'
    } else if (typeof res.data === 'string' && res.data.indexOf('成功') !== -1) {
      str = '成功'
    } else if (typeof res.data.msg === 'string' && res.data.msg.indexOf('成功') !== -1) {
      str = '成功'
    } else if (res.data.result && res.data.result === 'success') {
      str = '成功'
    } else {
      str = '失败'
    }
  }
  return str;
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

// 操作类型
const typeObj = {
  '配置': 1,
  '新建': 2,
  '编辑': 3,
  '删除': 4,
  '登陆': 5,
  '退出': 5
};

// 根据接口url判断操作类型
function checkUrl(url) {
  let urlAry = url.split('/');
  let lastStr = urlAry[urlAry.length - 1];
  if (lastStr.indexOf('save') !== -1 && lastStr.indexOf('save') === 0) {
    return typeObj['新建'];
  }
  if (lastStr.indexOf('delete') !== -1 && lastStr.indexOf('delete') === 0) {
    return typeObj['删除'];
  }
  if (lastStr.indexOf('update') !== -1 && lastStr.indexOf('update') === 0) {
    return typeObj['编辑'];
  }
  if (urlAry[urlAry.length - 2] && urlAry[urlAry.length - 2].indexOf('delete') !== -1 && urlAry[urlAry.length - 2].indexOf('delete') === 0) {
    return typeObj['删除'];
  }
}

// 处理日志模板
function handleLog(obj, str) {
  let data = obj;
  let logTemplate = str;
  let reg = /#([^#]+)#/g;
  let arr = [];
  var temp = '';
  while ((temp = reg.exec(logTemplate))) {
    arr.push(temp[1]);
  }
  for (let i = 0, l = arr.length; i < l; i++) {
    logTemplate = logTemplate.replace(new RegExp('#' + arr[i] + '#', 'g'), data[arr[i]]);
  }
  return logTemplate;
}

// 获取模块名
function getBread() {
  let moduleName = '';
  let length = document.getElementsByClassName('s-breadcrumb-item-inner').length;
  if (length <= 2) {
    moduleName = document.getElementsByClassName('s-breadcrumb-item-inner')[1].innerHTML.trim();
  } else if (length > 2) {
    moduleName = document.getElementsByClassName('s-breadcrumb-item-inner')[length - 1].innerHTML.trim();
  }
  return moduleName;
}

// 处理系统日志数据
function handleData(logArr, url, res) {
  let jsonArr = [];
  let data = logArr.data;
  let logTemplateAry = logArr.logTemplate.split('|');
  let length = document.getElementsByClassName('s-breadcrumb-item-inner').length;
  let moduleName = getBread(); // 模块名
  let resStatus = '';          // 操作结果
  let operatingType;           // 操作类型
  if (url) {
    operatingType = filterType(logArr.logTemplate, url)
  } else {
    operatingType = 1;
  }
  if (logArr.result) {
    resStatus = logArr.result;
  }
  if (res) {
    resStatus = res;
  }
  if (length <= 2) {
    if (logArr.data && logArr.data.length > 0) {
      for (let i = 0; i < logArr.data.length; i++) {
        let jsonData = {
          moduleName: moduleName, // 模块名
          operatingType: operatingType, // 操作类型
          operatingContent: logTemplateAry[0] + '【' + moduleName + '>' + handleLog(data[i], logTemplateAry[1]) + '】' + resStatus
        };
        jsonArr.push(jsonData);
      }
    } else {
      if (logTemplateAry[1] === undefined) {
        let jsonData = {
          moduleName: moduleName,
          operatingType: operatingType,
          operatingContent: logTemplateAry[0] + '【' + moduleName + '】' + resStatus
        };
        jsonArr.push(jsonData);
      } else {
        let jsonData = {
          moduleName: moduleName,
          operatingType: operatingType,
          operatingContent: logTemplateAry[0] + '【' + moduleName + '>' + logTemplateAry[1] + '】' + resStatus
        };
        jsonArr.push(jsonData);
      }
    }
  } else if (length > 2) {
    if (logArr.data && logArr.data.length > 0) {
      let level1 = document.getElementsByClassName('s-breadcrumb-item-inner')[1].innerHTML.trim();
      let level2 = document.getElementsByClassName('s-breadcrumb-item-inner')[2].innerHTML.trim();
      for (let i = 0; i < logArr.data.length; i++) {
        if (handleLog(data[i], logTemplateAry[1]).includes(moduleName)) {
          let jsonData = {
            moduleName: moduleName,       // 模块名
            operatingType: operatingType, // 操作类型
            operatingContent: logTemplateAry[0] + '【' + level1 + '>' + handleLog(data[i], logTemplateAry[1]) + '】' + resStatus
          };
          jsonArr.push(jsonData);
        } else {
          let jsonData = {
            moduleName: moduleName,       // 模块名
            operatingType: operatingType, // 操作类型
            operatingContent: logTemplateAry[0] + '【' + level1 + '>' + level2 + '>' + handleLog(data[i], logTemplateAry[1]) + '】' + resStatus
          };
          jsonArr.push(jsonData);
        }
      }
    } else {
      let names = document.getElementsByClassName('s-breadcrumb-item-inner');
      if (logTemplateAry[1] === undefined) {
        let str = '';
        for (let i = 1; i < names.length; i++) {
          if (i < names.length - 1) {
            str += names[i].innerHTML.trim() + '>';
          } else {
            str += names[i].innerHTML.trim();
          }
        }
        let jsonData = {
          moduleName: moduleName,
          operatingType: operatingType,
          operatingContent: logTemplateAry[0] + '【' + str + '】' + resStatus
        };
        jsonArr.push(jsonData);
      } else {
        let str = '';
        for (let i = 1; i < names.length; i++) {
          str += names[i].innerHTML.trim() + '>';
        }
        let jsonData = {
          moduleName: moduleName,
          operatingType: operatingType,
          operatingContent: logTemplateAry[0] + '【' + str + logTemplateAry[1] + '】' + resStatus
        };
        jsonArr.push(jsonData);
      }
    }
  }
  return jsonArr;
}

function logIn(logArr, url, res) {
  let arr = handleData(logArr, url, res);
  axios.post(globalOptions.baseURL + '/sysOperatingLog/saveLog', arr).then(checkStatus).then(checkCode)
}

// 过滤操作类型(系统综合日志)
function filterType(str, url) {
  let type;
  let logTemplate = str;
  let logTemplateAry = logTemplate.split('|');
  if (logTemplateAry.length === 2) {
    if (typeof typeObj[logTemplateAry[0]] !== 'undefined') {
      type = typeObj[logTemplateAry[0]];
    } else {
      type = 1;
    }
  } else {
    type = checkUrl(url);
  }
  return type;
}

export default {
  basePath () {
    return globalOptions.baseURL;
  },
  post (url, data, config) {
    let options = {};
    let logObj;
    if (arguments.length === 4) {
      logObj = arguments[3];
    } else if (arguments.length === 3 && typeof (arguments[2].logTemplate) === 'string') {
      logObj = arguments[2];
      config = {};
    }
    if (typeof config !== 'undefined') {
      options = merge(globalOptions, config);
    } else {
      options = globalOptions;
    }
    return axios.post(convertURL(url), data, options).then(checkStatus).then(checkCode).then(checkTimeout).then((res) => {
      if (logObj) {
        logIn(logObj, url, checkRes(res));
      }
      return res;
    })
  },
  get (url, params, config) {
    let options = {};
    let logObj = {};
    if (typeof config !== 'undefined') {
      if (params && params.logTemplate) {
        options = merge({}, globalOptions, config)
      } else {
        options = merge({}, globalOptions, {params: params}, config)
      }
    } else {
      if (params && params.logTemplate) {
        options = merge({}, globalOptions);
      } else {
        options = merge({}, globalOptions, {params: params});
      }
    }
    if (params && params.logTemplate) {
      logObj = params;
    }
    return axios.get(convertURL(url), options).then(checkStatus).then(checkCode).then((res) => {
      if (logObj && logObj.logTemplate) {
        logIn(logObj, url, checkRes(res));
      }
      return res;
    })
  },
  log(logObj) {
    if (logObj) {
      logIn(logObj);
    }
  }
}
