const db = require('./db_helper');
const md5 = require('md5');

exports.showSignin = (req, res) => {
   res.render('signin.html');
}
exports.handleSignin = (req, res) => {
   // res.render('signin.html');
   //验证邮箱是否正确
   db.query(
            'select * from `users` where `email`=?',
            req.body.email,
            (err, results) => {
               if (err) {
                  return res.json({
                     code: 500,
                     message: '服务器内部错误'
                  });
               }
               if (results.length <= 0) {
                  return res.json({
                     code: 401,
                     message: '邮箱不存在'
                  })
               }

               //验证密码是否正确
               const password = md5(req.body.password);
               if (password != results[0].password) {
                  return res.json({
                     code: 402,
                     message: '密码错误'
                  })
               }
               res.json({
                  code: 200,
                  message: '登录成功'
               })
            })
}
exports.showSignup = (req, res) => {
   res.render('signup.html');
}
exports.handleSignup = (req, res) => {
   //验证邮箱是否存在
   db.query('select * from `users` where email=?',
            req.body.email,
            (err, results) => {
               if (err) {
                  return res.send('服务器内部错误');
               }
               if (results.length > 0) {
                  res.render('signup.html', {
                     msg: '邮箱已存在'
                  })
                  return;
               }

               //验证昵称是否存在
               db.query('select * from `users` where nickname=?',
                        req.body.nickname,
                        (err, results) => {
                           if (err) {
                              return res.send('服务器内部错误');
                           }
                           if (results.length > 0) {
                              res.render('signup.html', {
                                 msg: '昵称已存在'
                              })
                           }

                           req.body.createdAt = new Date();
                           db.query('insert into `users` set ?', 
                                    req.body,
                                    (err, results) => {
                                       if (err) {
                                          console.log(err);
                                          return res.send('服务器内部错误');
                                       }
                                       // console.log(results);
                                       if (results.affectedRows === 1) {
                                          res.redirect('/signin');
                                          
                                       } else {
                                          res.render('signup.html', {
                                             msg: "注册失败"
                                          })
                                       }
                                    });
                        })
            })
            
   
}
exports.handleSignout = (req, res) => {
   res.send();
}

 
