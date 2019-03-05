var express = require('express');
var router = express.Router();
var func = require("../function")
var userController=require('../controllers/user-controller')

router.post("/signUp",async(req,res)=>{
    func.printLog(func.logCons.LOG_LEVEL_INFO,"/api/auth/signUp",func.logCons.LOG_ENTER)
    try{
        let response=await userController.createUser(req,res)
        res.send(func.responseGeneratore(false,201,"user ragister successfully",response))
        func.printLog(func.logCons.LOG_LEVEL_DEBUG, "response=>" + JSON.stringify(response))
        func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/signUp", func.logCons.LOG_EXIT)
    }
    catch(err){
        func.printLog(func.logCons.LOG_LEVEL_ERROR, "error=>" + err)
        func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/signUp", func.logCons.LOG_EXIT)
        res.send(func.errorResGen(true,"error in signup",401,"please insert proper email and password",err))
    }
})

router.post("/signIn", async (req, res) => {
    func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/signIn", func.logCons.LOG_ENTER)
    try {
        let response = await userController.verifyUser(req, res)
        res.send(func.responseGeneratore(false, 201, "user Login successfully", response))
        func.printLog(func.logCons.LOG_LEVEL_DEBUG, "response=>" + JSON.stringify(response))
        func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/signIn", func.logCons.LOG_EXIT)
    } catch (err) {
        func.printLog(func.logCons.LOG_LEVEL_ERROR, "error=>" + err)
        func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/signIn", func.logCons.LOG_EXIT)
        res.send(func.errorResGen(true, "error in signIn", 401, "please insert proper email and password", err))
    }
})

router.get("/user", async (req, res) => {
    func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/user", func.logCons.LOG_ENTER)
    try {
        let response = await userController.getUserList(req, res)
        res.send(func.responseGeneratore(false, 201, "userList find successFully", response))
        func.printLog(func.logCons.LOG_LEVEL_DEBUG, "response=>" + JSON.stringify(response))
        func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/user", func.logCons.LOG_EXIT)
    } catch (err) {
        func.printLog(func.logCons.LOG_LEVEL_ERROR, "error=>" + err)
        func.printLog(func.logCons.LOG_LEVEL_INFO, "/api/auth/user", func.logCons.LOG_EXIT)
        res.send(func.errorResGen(true, "error in finding userlist", 401, "error in finding userlist", err))
    }
})
module.exports=router