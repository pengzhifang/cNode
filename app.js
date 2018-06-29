const express = require('express');
const art = require('express-art-template');
const router = require('./routes/router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config');

const app = new express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html', art);
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

var db = config.database;
var options = {
	host: db.localhost,
	port: db.port,
	user: db.user,
	password: db.password,
	database: db.database
};

var sessionStore = new MySQLStore(options);

app.use(session({
   key: 'session_id',  //修改session的名称
   secret: 'keyboard cat',  //对sessionid进行加密
   store: sessionStore,     //配置把session数据存储到MySQL数据库中
   resave: false,           //强制重新存储服务器上的session数据
   saveUninitialized: true  //默认即使不写session也会生成sessionid;
}))

app.listen(config.port, () => {
   console.log('监听' + config.port);
})

app.use(router);