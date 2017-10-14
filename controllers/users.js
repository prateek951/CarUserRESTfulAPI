const User = require('../models/user');
const Cars = require('../models/car');



module.exports =  {
    index : (req,res,next)=> {
        //RETRIEVING THE LIST OF THE USERS USING CALLBACKS
        User.find({},(err,data)=>{
            if(err){
                next(err);
            }
            res.status(200).json(data);
        });
        //RETRIEVING THE LIST OF THE USERS USING PROMISES
       // User.find({}).exec().then(users=> res.status(200).json(users)).catch(err => next(err));
    },
    //COMMENT ABOVE index FUNCTION AND UNCOMMEND THE GIVEN CODE TO ENJOY THE POWER OF ASYNC AWAIT
    // index: async (req,res,next)=>{
    //    try {
    //        const users = await User.find({});
    //        throw new Error('error occured');  
    //        res.status(200).json(users);
    //    }
    //    catch(err){
    //        next(err);
    //    }
    // },
    newUser : (req,res,next)=>{
        //M1 - USING THE MONGOOSE METHOD WITH THE PROMISES
        
        //User.create(req.body).then(user=> res.status(200).json(data)).catch(err=>res.send('Error has occured'));
        
        //END OF M1
        
        // M2 - USING THE MONGOOSE METHOD save IN THE CALLBACKS way
        
        //Create a new user
        //const newUser = new User(req.body);
        //Try saving the user
        // newUser.save((err,user)=>{
        //     if(err)
        //     res.send('Error has occured');
        //     res.status(201).json(user);
        // });

        //END OF M2

        //M3 USING PROMISES WITHOUT THE CREATE METHOD
        const newUser = new User(req.value.body);
        newUser.save()
            .then(user => res.status(201).json(user))
                .catch(err => next(err));
        //END OF M3

        
     },
    //COMMENT M3 AND UNCOMMENT THE BELOW CODE TO UNDERSTAND THE POWER OF ASYNC AWAIT
     
    //  newUser : async (req,res,next) => {
    //         try{
    //         //CREATE A NEW USER
    //         const newUser = new User(req.body);
    //         //TRY SAVING THE NEW USER
    //         const user =  await newUser.save();
    //         }
    //         catch(err){
    //             next(err);
    //         }
    //  }


    getUser: async (req,res,next) => {
        //NEW WAY
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },
    updateUser: async (req,res,next)=>{
        const {userId} = req.value.params;
        //ENSURE THAT req.body CONTAINS ALL THE FIELDS
        const newUser = req.value.body;
        
        const user = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json(user);
    },
    patchUser: async (req,res,next) =>{
        const {userId} = req.value.params;
        //req.body MAY CONTAIN ANY NUMBER OF FIELDS
        const newUser = req.value.body;

        const user = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json(user);
    },
    getUserCars : (req,res,next)=> {
        //BEFORE GETTING THE CARS OF THE SPECIFIC USER,FIND THE SPECIFIC USER FIRST
        const {userId} = req.value.params;
        const user = await User.findById(userId).populate('cars');
        res.status(201).json();
    },
    newUserCar: async (req,res,next)=>{
        //TAP THE PERSON WHO BOUGHT THE NEW CAR
        const {userId} = req.value.params;
        //CREATE A NEW CAR
        const newCar = new Car(req.value.body);

        //FIND THE USER FIRST WHO BOUGHT THE NEW CAR
        const user = await User.findById(userId);
        //ASSIGN  USER AS THE CAR SELLER
        newCar.seller = user;
        //SAVE THE NEW CAR
        await newCar.save();
        //SAVE THE USER
        await user.save();
        res.status(201).json(user);
    }
};
