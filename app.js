const express = require('express');
const art = require('express-art-template');
const router = require('./routes/router');

const app = new express();

app.engine('html', art);
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

const PORT = 3000;
app.listen(PORT, () => {
   console.log('监听3000端口');
})

app.use(router);