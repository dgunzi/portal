#工具方法目录
## download
文件下载工具方法，其中只有一个方法，import后直接调用，示例如下
```
// get请求
 Download('http://192.168.212.53:8080/operationSettings/downloadChrome');
```
```
// post请求，服务器端返回的参数需要包含一个下载路径
 Download('http://192.168.212.53:8080/operationSettings/downloadChrome'，{type:'post',data:{fileUuid:'123123'}});
```
