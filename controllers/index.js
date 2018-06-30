const topicModel = require('../models/topic');
const moment = require('moment');

exports.showIndex = (req, res) => {
   topicModel.selectAll((err, topics) => {
      res.render('index.html', {
         user: req.session.user,
         topics,
         moment
      });
   })
   
}