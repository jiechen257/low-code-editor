// 引入 express 框架 -> 需 npm 安装
const express = require('express');

/**
 * 初始化框架,并将初始化后的函数给予 '当前页面'全局变量 app
 * 也就是说, app 是 express
 */
const app = express();

//跨域请求cors
const allowCors = function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:8080");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Credentials", "true");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
}
app.use(allowCors)


/* 配置框架环境 S */

// 设置 public 为静态文件的存放文件夹
app.use('/public', express.static('public'));


/* 配置框架环境 E */


app.get('/', function(req, res) {
  res.send('Hello World');
})

app.use('/upload', require('./router/upload'))

const server = app.listen(8090, function() {

  const port = server.address().port;

  console.log("Node.JS 服务器已启动，访问地址： http://localhost:%s", port)

})
