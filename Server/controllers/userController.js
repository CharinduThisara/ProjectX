const User = require("../model/userModel");
const bcrypt = require("bcrypt") 

module.exports.register = async (req,res,next)=>{
try{
    const{password,confirmpassword,username,email}=req.body;
    const usernameCheck = await User.findOne({username})

    if (usernameCheck)
        return res.json({msg:"username already exists",status:false})

    const emailCheck = await User.findOne({email})

    if (emailCheck)
        return res.json({msg:"email already exists",status:false})

    const hashedpass = await bcrypt.hash(password,10)

    const user = await User.create({
        email,
        username,
        password:hashedpass
    });
    delete user.password;
    return res.json({status:true, user})
}catch(e){
    next(e);
}   
}

module.exports.login = async (req,res,next)=>{
    try{
        const{username,password}=req.body;
        const user = await User.findOne({username})
        console.log(req.body);
        if (!user)
            return res.json({msg:"username or password doesn't match",status:false})
     
        const isValidPass = await bcrypt.compare(password,user.password)

        if (!isValidPass)
            return res.json({msg:"username or password doesn't match",status:false})
        else{
            delete user.password;
            return res.json({status:true, user})
        }
            
    }catch(e){
        next(e);
    } 
    }

module.exports.setAvatar = async (req,res,next)=>{
    try{
        const userID = req.params.id;
        const avatarImage = req.body.image;

        await User.findByIdAndUpdate(userID,
            {
                isAvatarImageSet:true,
                avatarImage
            });
        
        const user = await User.findById(userID)

        res.json({isSet:user.isAvatarImageSet,image:user.avatarImage})

        } 
        
    catch(e){
        console.log("error")
        next(e);
    } 
    }


module.exports.getAllUsers = async (req,res,next)=>{
    try{
        const userID = req.params.id;
        //console.log("hi")
        const users = await User.find({_id:{$ne: userID}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
        //console.log(users)
        res.json(users)

    }
    catch(e){
        next(e)
    }
}