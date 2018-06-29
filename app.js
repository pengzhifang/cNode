const express = require('express');
const art = require('express-art-template');
const router = require('./routes/router');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = new express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html', art);
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true
}))

const PORT = 3000;
app.listen(PORT, () => {
   console.log('监听3000端口');
})

app.use(router);