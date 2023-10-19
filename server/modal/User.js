const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt= require("jsonwebtoken");
const userschema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,   
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    calculations: [
        {
          calname:String,
          expression: String,
          result: Number,
        },
      ],
})
userschema.pre('save' ,async function(next){
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
    }
    next();
});
userschema.methods.generateAuthToken= async function(){
    try{
        const token= jwt.sign({_id:this._id},"MYNAMEISFULLSTACKWEBDEVELOPMENTCALCULATORCALCULATORAUTHENTICATION");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        console.log(token);
        return token;
    }
    catch(err){
        res.send(err);
    }
}

const user = mongoose.model('user', userschema)

module.exports=user;
