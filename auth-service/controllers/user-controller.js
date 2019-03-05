var func=require('../function')
var userModel = require("../model/user-model")
const bcrypt = require('bcrypt');
var self = module.exports = {
    createUser:(req,res)=>{
    let body=req.body
    func.printLog(func.logCons.LOG_LEVEL_INFO, "createUser()", func.logCons.LOG_ENTER)
    func.printLog(func.logCons.LOG_LEVEL_DEBUG,"body=>"+JSON.stringify(body))
     return new Promise(async(resolve,reject)=>{
         let encryPass=await self.encrypassWord(body.password)
        let user=new userModel({
            name:body.name,
            email:body.email,
            password:encryPass
        })

        user.save((err,saveUser)=>{
            if(err)
            {
                func.printLog(func.logCons.LOG_LEVEL_ERROR, "error=>" + err)
                reject(err)
            }
            else{
                resolve(saveUser)
            }
        })
     })
    },

    verifyUser:(req,res)=>{
     let body = req.body
     func.printLog(func.logCons.LOG_LEVEL_INFO, "createUser()", func.logCons.LOG_ENTER)
     func.printLog(func.logCons.LOG_LEVEL_DEBUG, "body=>" + JSON.stringify(body))
      return new Promise(async (resolve, reject) => {
        let email=body.email
        userModel.findOne({email:email},async(err,user)=>{
            if(err)
            {
                func.printLog(func.logCons.LOG_LEVEL_ERROR, "error=>" + err)
                reject(err)
            }
            if(!user)
            {
                reject("user not found with this email id")
            }
            else{
                let verifyStatus=await self.decrypassWord(body.password,user.password)
                console.log(verifyStatus)
                if (verifyStatus)
                {
                    resolve(user)
                }
                else{
                    reject("email and password do not match")
                }
            }
        })
      })
    },

    getUserList:(req,res)=>{
    func.printLog(func.logCons.LOG_LEVEL_INFO, "getUserList()", func.logCons.LOG_ENTER)
     return new Promise(async (resolve, reject) => {
       userModel.find({},(err,uselist)=>{
           if(err)
           {
               func.printLog(func.logCons.LOG_LEVEL_ERROR, "error=>" + err)
               reject(err)
           }
           else{
               resolve(uselist)
           }
       })
     })
    },

    encrypassWord:(pass)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.hash(pass, 10, function (err, hash) {
                if(err)
                {
                    func.printLog(func.logCons.LOG_LEVEL_ERROR,"error=>"+err)
                    reject(err)
                }
                else{
                    resolve(hash)
                }
            });
        })
        
    },

     decrypassWord: (pass,hash) => {
           return new Promise((resolve, reject) => {
             bcrypt.compare(pass, hash, function (err, res) {
                 if (res) {
                     resolve(true)
                 } else {
                     resolve(false)
                 }
             });
           })
     }
}