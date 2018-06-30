const categoryModel = require('../models/category');

exports.showCreate = (req, res) => {
   categoryModel.getAll((err, categories) => {
      // if (err) {
      //   return res.send('服务器内部错误'); 
      // }
      res.render('topic/create.html', {
         categories
      });
   })
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