const logger=require('./lib/logger')

var self=module.exports={
    logCons:require('./utils/constant/logConstant'),
    urlCons:require('./utils/constant/Constant-url'),
    logger:logger,
    
    errorResGen:(status,msg,statuscode,description,err)=>{
        self.printLog(self.logCons.LOG_LEVEL_INFO," errorResGen()",self.logCons.LOG_ENTER)
        console.log("in error module")
        response={},
        response ["error_status"]=status,
        response["msg"]=msg,
        response["statuscode"]=statuscode
        response["description"]=description
        response["err"]=err
        self.printLog(self.logCons.LOG_LEVEL_ERROR,"Error="+JSON.stringify(response))
        
      return response
    },
    responseGeneratore:(status,statusCode,msg,data)=>{
        self.printLog(self.logCons.LOG_LEVEL_INFO," responseGeneratore()",self.logCons.LOG_ENTER)
        response={},
        response["error_status"]=status,
        response["statusCode"]=statusCode,
        response["msg"]=msg,
        response["data"]=data
        // self.printLog(self.logCons.LOG_LEVEL_DEBUG,"ResponceData="+JSON.stringify(response))
        // self.printLog(self.logCons.LOG_LEVEL_INFO,"responceGeneratore()",self.logCons.LOG_EXIT_FROM_FUNC)
        return response   
    },

    printLog: function (level, msg, type) {
        // TODO:if msg is json then use JSON.stringify()
        if (typeof type !== 'undefined') {
          switch (type) {
            case 0: // ENTER
              msg = this.logCons.LOG_ENTER_INTO_FUNC + msg
              break
            case 1: // EXIT
              msg = this.logCons.LOG_EXIT_FROM_FUNC + msg
              break
          }
        }
        switch (level) {
          case this.logCons.LOG_LEVEL_ERROR:
            logger.error(msg)
            break
          case this.logCons.LOG_LEVEL_WARN:
            logger.warn(msg)
            break
          case this.logCons.LOG_LEVEL_DEBUG:
            logger.debug(msg)
            break
          case this.logCons.LOG_LEVEL_SILLY:
          case this.logCons.LOG_LEVEL_VERBOSE:
            logger.trace(msg)
            break
          case this.logCons.LOG_LEVEL_INFO:
          default:
            logger.info(msg)
        }
      },
     
}