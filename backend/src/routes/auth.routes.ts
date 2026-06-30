import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller";
import { Response,Request } from "express";
const router =Router();
router.post("/sign-up",registerUser)
router.post("/sign-in",loginUser)
router.post("/forgot-password",(req:Request,res:Response)=>{
    res.json("Lets change the forgoten  pin")
    
})
router.post("/resert-password",(req:Request,res:Response)=>{
    res.send("Lets change the known pin")

})
router.post("/sign-out",(req:Request,res:Response)=>{
    res.send("Lets sign-out")

})
export default router;