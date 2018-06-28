const db = require('./db_helper');

exports.showSignin = (req, res) => {
   res.render('signin.html');
}
exports.handleSignin = (req, res) => {
   res.render('signin.html');
}
exports.showSignup = (req, res) => {
   res.render('signup.html');
}
exports.handleSignup = (req, res) => {
   
            
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
}
exports.handleSignout = (req, res) => {
   res.send();
}

 
