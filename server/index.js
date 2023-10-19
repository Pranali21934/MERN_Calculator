const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors=require('cors');
const User=require('./modal/User');
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authenticate= require('./controller/authenticate');
// Connect to MongoDB
const DB='mongodb+srv://redskull:redskull2118@cluster0.ti3awfp.mongodb.net/Calculator?retryWrites=true&w=majority'; mongoose.connect(DB,{ useNewUrlParser:true, useUnifiedTopology:true }).then(()=>{ console.log(`Connected to DB`); }).catch((err)=>{ console.log(err); });

// Middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
  };
app.use(cors(corsOptions));

    app.post("/signup",(req,res)=>{ 
        console.log(req);
        const {email,password}=req.body; 
        console.log(req.body); 
        if( !email || !password) {
         return res.status(400).json({error:"Please fill field"});
         }
         User.findOne({email:email}).then((userexists)=>{ 
          // console.log(userexists);
          // console.log("console.log(userexists);console.log(userexists);console.log(userexists);console.log(userexists);");
          // console.log(userexists);
        if(userexists) { 
        return res.status(404).json({err:"email already exists"}); 
        }
         const user=new User({email,password});
         user.save().then(()=>{ 
        return res.status(200).json({Message:req.body});
         }).catch((err)=>{ return res.status(500).json({err:"failed to register"}); });
        }).catch((err)=>{ console.log(err); }) });


app.post("/login", async (req,res)=>
    {
     try{ 
        let token;
        const {email,password}=req.body; 
        console.log(req.body); 

        if(!email || !password) {
            console.log("Please fill field");
            return res.status(400).json({error:"Please fill field"});
        }
         const userLogin= await User.findOne({email :email});
         if(userLogin)
         {
            const isMatch= await bcrypt.compare(password ,userLogin.password);
            token= await userLogin.generateAuthToken();
            res.cookie("jwttoken" ,token ,{
                expires :new Date(Date.now() +25892000000),
                httpOnly:true
            });

            if(!isMatch)
            {
                console.log("Invalid password");
               return res.status(422).json({error:"Invalid password"});
            }
            else
            {
                console.log("Logged in");
              return res.json({message:"Logged in"});
            }
           
         }
         else
         {
            console.log("Invalid email");
            return res.status(422).json({error:"Invalid email"});
         }
       
    }
    catch(err){
          console.log(err);
    }
    });

    app.get('/ab',authenticate, async(req,res)=>{
        res.send(req.rootUser);
    });


    app.post('/addcalculation', async (req, res) => {
        try {
            const { input, calculatedResult, userid, calname } = req.body; // Extract calculation data from the request body
      
          // Create a new calculation object
          
        //   console.log(newCalculation)
          console.log(userid)
         const findeduser= await User.findOne({_id:userid});
         console.log("findsjdhfjsdhgfjgdsjfgjsdgfjsdgjfgdsgfgdsgfhdsgfhgsdhfghsdgfhgsdjfgjdsgfjgsdgdfjdsgjfgsdjgfjsdgfjgsdjfgsdjgfsdgjfgdsjgeduser")
         console.log(findeduser)
         if (!findeduser) {
            return res.status(404).json({ error: 'User not found' });
          }
       

        console.log(input, calculatedResult)
          
          findeduser.calculations.push({expression: input, result: calculatedResult, calname:calname});

         // Save the updated user document
          await findeduser.save();
       
      
          return res.status(201).json({ message: 'Calculation added successfully', findeduser });
        } catch (error) {
          console.error('Error adding calculation:', error);
          res.status(500).json({ error: 'Failed to add calculation' });
        }
      });


      app.delete('/delete', async (req, res) => {
        try {
          const { userId, calculationId } = req.body;
      
          // Find the user by their unique ID
          const user = await User.findOne({ _id: userId });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Find the index of the calculation to delete in the calculations array
          const calculationIndex = user.calculations.findIndex((calc) => calc._id.toString() === calculationId);
      
          if (calculationIndex === -1) {
            return res.status(404).json({ error: 'Calculation not found' });
          }
      
          // Remove the calculation from the calculations array
          user.calculations.splice(calculationIndex, 1);
      
          // Save the updated user document
          await user.save();
      
          return res.status(200).json({ message: 'Calculation deleted successfully', user });
        } catch (error) {
          console.error('Error deleting calculation:', error);
          res.status(500).json({ error: 'Failed to delete calculation' });
        }
      });
      
   

app.listen(8000);