exports.showSignin = (req, res) => {
   res.render('signin.html');
}
exports.handleSignin = (req, res) => {
   res.send();
}
exports.showSignup = (req, res) => {
   res.render('signup.html');
}
exports.handleSignup = (req, res) => {
   res.send();
}
exports.handleSignout = (req, res) => {
   res.send();
}