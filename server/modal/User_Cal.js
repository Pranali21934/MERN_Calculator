const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');
const usercal = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        
    }
})

// hodschema.pre('save' ,async function(next){
//     if(this.isModified('password'))
//     {
//         this.password= await bcrypt.hash(this.password,12);
//     }
//     next();
// });

// hodschema.methods.generateAuthToken= async function(){
//     try{
//         const token= jwt.sign({_id:this._id},"MYNAMEISPARVEZKHANPRANALIVANIHALDWANIKATHGODAM");
//         this.tokens=this.tokens.concat({token:token});
//         await this.save();
//         console.log(token);
//         return token;
//     }
//     catch(err){
//         res.send(err);
//     }
// }

const user = mongoose.model('user', usercal)

module.exports=user;
