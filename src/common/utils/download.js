/**
 * Created by dgunzi on 2017/5/11.
 */
import $axios from '@/plugins/ajax'

function getDownload(url, data) {
  if (data) {
    saveLog(data, '成功');
  }
  var downloadIframe = document.createElement('iframe');
  downloadIframe.style.display = 'none';
  downloadIframe.src = $axios.basePath() + url;
  document.body.appendChild(downloadIframe);
}

function postDownload(url, data) {
  $axios.post(url, data).then(function (response) {
    let url = response.url;
    if (typeof response.data !== 'undefined') {
      for (let i = 0, length = response.data.length; i < length; i++) {
        url += data[i];
      }
    }
    getDownload(url, data);
  }).catch(function (error) {
    console.log(error);
    saveLog(data, '失败')
  });
}

// 记录系统日志
function saveLog(logArr, res) {
  let jsonArr = [];
  let data = logArr.data;
  let resStatus = res;
  let logTemplateAry = logArr.logTemplate.split('|');
  let length = document.getElementsByClassName('s-breadcrumb-item-inner').length;
  if (length <= 2) {
    let moduleName = document.getElementsByClassName('s-breadcrumb-item-inner')[1].innerHTML.trim();
    if (logArr.data && logArr.data.length > 0) {
      for (let i = 0; i < logArr.data.length; i++) {
        let jsonData = {
          moduleName: moduleName, // 模块名
          operatingType: 1, // 操作类型
          operatingContent: logTemplateAry[0] + '【' + moduleName + '>' + handleLog(data[i], logTemplateAry[1]) + '】' + resStatus
        };
        jsonArr.push(jsonData);
      }
    } else {
      let jsonData = {
        moduleName: moduleName,
        operatingType: 1,
        operatingContent: logTemplateAry[0] + '【' + moduleName + '>' + logTemplateAry[1] + '】' + resStatus
      };
      jsonArr.push(jsonData);
    }
  } else if (length > 2) {
    let moduleName = document.getElementsByClassName('s-breadcrumb-item-inner')[length - 1].innerHTML.trim();
    if (logArr.data && logArr.data.length > 0) {
      let level1 = document.getElementsByClassName('s-breadcrumb-item-inner')[1].innerHTML.trim();
      let level2 = document.getElementsByClassName('s-breadcrumb-item-inner')[2].innerHTML.trim();
      for (let i = 0; i < logArr.data.length; i++) {
        let jsonData = {
          moduleName: moduleName, // 模块名
          operatingType: 1, // 操作类型
          operatingContent: logTemplateAry[0] + '【' + level1 + '>' + level2 + '>' + handleLog(data[i], logTemplateAry[1]) + '】' + resStatus
        };
        jsonArr.push(jsonData);
      }
    } else {
      let names = document.getElementsByClassName('s-breadcrumb-item-inner');
      var str = '';
      for (let i = 1; i < names.length; i++) {
        str += names[i].innerHTML.trim() + '>';
      }
      let jsonData = {
        moduleName: moduleName,
        operatingType: 1,
        operatingContent: logTemplateAry[0] + '【' + str + logTemplateAry[1] + '】' + resStatus
      };
      jsonArr.push(jsonData);
    }
    // var str = '';
    // for (let i = 1; i < names.length; i++) {
    //   str += names[i].innerHTML.trim() + '>';
    // }
    // let jsonData = {
    //   moduleName: moduleName,
    //   operatingType: 1,
    //   operatingContent: logTemplateAry[0] + '【' + str + logTemplateAry[1] + '】' + resStatus
    // };
    // jsonArr.push(jsonData);
  }
  $axios.post('/sysOperatingLog/saveLog', jsonArr);
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

export default function (url, options) {
  if (arguments.length < 2) {
    getDownload(url);
  } else {
    if (options.type && options.type.toLowerCase() === 'post') {
      postDownload(url, options.data);
    } else if (options.type && options.type.toLowerCase() === 'get') {
      getDownload(url);
    } else if (options.logTemplate) {
      getDownload(url, options);
    } else {
      getDownload(url);
    }
  }
}
