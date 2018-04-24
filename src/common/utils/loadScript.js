/**
 * Created by dingyf on 2017/6/30.
 */
export default function loadScript (url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript';
  if (script.readyState) {  // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.body.appendChild(script);
}
