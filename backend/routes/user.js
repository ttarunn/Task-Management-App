const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async(req,res) => {
    const  { email, name } = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password ,10);
        
        const newUser = new User ({
            name:name,
            email:email,
            password: encryptedPassword,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message:"User Registered succesfully!",
            user:savedUser
        })
        
    }
    catch (err){
        res.status(500).json({
            err:err
        })
    }
}

const login = async (req,res) => {
    
    try{
        const user = await User.findOne( { email:req.body.email } );
        if(user){
            const validate = await bcrypt.compare(req.body.password, user.password);
        //if user validate true then jwt token will be generated
        if(validate){
            const jwkToken = jwt.sign({
                email:user.email,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"1hr"
            });
            
            res.status(200).json({
                message:"Success",
                token:jwkToken,
                user: user
            })
        }else{
            res.status(400).json({
                message:"Wrong Credential!"
            })
        }
        }else{
            res.status(400).json({
                message:"User Not Found"
            })
        }
    }
    catch (err){
        res.status(500).json({
            message:"Internal Server Error!",
            err:err
        })
    }
}

module.exports = { register, login }