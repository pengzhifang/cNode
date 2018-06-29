const userModel = require('../models/user');
const md5 = require('md5');

exports.showSignin = (req, res) => {
   res.render('signin.html');
}

//处理登录页面
exports.handleSignin = (req, res) => {
   // res.render('signin.html');
   //验证邮箱是否正确
   userModel.getByEmail(req.body.email, (err, user) => {
      if (err) {
         return res.send('服务器内部错误');
      }
      if (!user) {
         return res.json({
            code: 401,
            message: '邮箱不存在'
         })
      }
      //验证密码是否正确
      const password = md5(req.body.password);
      if (password === user.password) {

         //设置session
         delete user.password;
         req.session.user = user;

         res.json({
            code: 200,
            message: '登录成功'
         })
         
      } else {
         return res.json({
            code: 402,
            message: '密码错误,请重新输入'
         })
      }
   })
}
exports.showSignup = (req, res) => {
   res.render('signup.html');
}

//处理注册页面
exports.handleSignup = (req, res) => {
   //验证邮箱是否存在
   // console.log(req.body);
   userModel.getByEmail(req.body.email, (err, user) => {
      if (err) {
         return res.send('服务器内部错误');
      }
      if (user) {
         return res.render('signup.html', {
            msg: '邮箱已存在'
         });
      }
      userModel.getByNickname(req.body.nickname, (err, user) => {
         if (err) {
            return res.send('服务器内部错误');
         }
         if (user) {
            return res.render('signup.html', {
               msg: '昵称已存在'
            })
         }
         req.body.createdAt = new Date();
         req.body.password = md5(req.body.password);
         userModel.create(req.body, (err, isOK) => {
            if (err) {
               return res.send('服务器内部错误');
            }
            if (isOK) {
               res.redirect('/signin');
            } else {
               res.render('signup.html', {
                  msg: '注册失败'
               });
            }
         })
      })
   })
            
   
}

//实现退出功能
exports.handleSignout = (req, res) => {
   req.session.destroy();
   res.redirect('/signin');
}

 
