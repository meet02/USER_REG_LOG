const mongoose = require('mongoose')
const func = require('./function')
const conne = mongoose.connect('mongodb://localhost:27017/UserInfo', {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    func.printLog(func.logCons.LOG_LEVEL_ERROR, "Error in Database Connection", func.logCons.LOG_LEVEL_ERROR)
  } else {
    func.printLog(func.logCons.LOG_LEVEL_INFO, "Data base connected succesfully", func.logCons.LOG_ENTER)
  }

})
