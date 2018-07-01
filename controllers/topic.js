const categoryModel = require('../models/category');
const topicModel = require('../models/topic');

exports.showCreate = (req, res) => {
   categoryModel.getAll((err, categories) => {
      if (err) {
        return res.send('服务器内部错误'); 
      }
      res.render('topic/create.html', {
         categories,
         user: req.session.user
      });
   })
}

//处理发布话题
exports.handleCreate = (req, res) => {
   if (!req.session.user) {
      res.json({
         code: 403,
         msg: '登录过期,请先登录'
      })
   }
   req.body.userId = req.session.user.id;
   req.body.createdAt = new Date();
   topicModel.createTopic(req.body, (err, isOK) => {
      if (err) {
         return res.json({
            code: 500,
            msg: '服务器内部错误'
         })
      }
      if (isOK) {
         res.json({
            code: 200,
            msg: '添加话题成功'
         })
      } else {
         res.json({
            code: 400,
            msg: '添加话题失败'
         })
      }
   })
}
exports.showTopic = (req, res) => {
  //  console.log(req.params);
   const id = req.params.topicID;
   if (isNaN(id)) {
     return res.send('参数错误');
   }
   topicModel.getById(id, (err, topic) => {
      if (err) {
         return res.send('服务器内部错误');
      }
      res.render('topic/show.html',{
         topic,
         user: req.session.user
      });
   })
   
}

//显示编辑话题页面
exports.showEdit = (req, res) => {
  categoryModel.getAll((err, categories) => {
    if (err) {
      return res.json({
        code: 500,
        msg: '服务器内部错误'
      })
    }
    const id = req.params.topicID;
    if (isNaN(id)) {
      return res.json({
        code: 401,
        msg: '参数错误'
      })
    }
    topicModel.getById(id, (err, topic) => {
      if (err) {
        return res.send('服务器内部错误');
      }
      if (topic) {
        res.render('topic/edit.html', {
          categories,
          topic
        });
      } else {
        return res.send('没有查到数据');
      }
    })
  })
  
}


//处理编辑请求
exports.handleEdit = (req, res) => {
  
}

//删除话题
exports.handleDelete = (req, res) => {
  const id = req.params.topicID;
  if (isNaN(id)) {
    return res.send('参数错误');
  }
  topicModel.deldeteById(id, (err, isOK) => {
    if (err) {
      return res.send('服务器内部错误');
    }
    if (isOK) {
      res.redirect('/');
    } else {
      return res.send('删除失败');
    }
  })
}