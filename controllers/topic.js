const categoryModel = require('../models/category');

exports.showCreate = (req, res) => {
   
   res.render('topic/create.html')
}
exports.handleCreate = (req, res) => {
   res.send('handleCreate');
}
exports.showTopic = (req, res) => {
   res.send('showTopic');
}
exports.showEdit = (req, res) => {
   res.send('showEdit');
}
exports.handleEdit = (req, res) => {
   res.send('handleEdit');
}