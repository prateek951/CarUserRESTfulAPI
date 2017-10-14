const Car = require('../models/car');
const User = require('../models/user')
module.exports = {
    index: async (req,res,next) => {
            //RETRIEVE THE LIST OF ALL THE CARS
          try {
              const cars = await Car.find({});
              res.status(200).json(cars);
          } catch (error) {
              next(err);
          }           
        },
    newCar: async (req,res,next) =>{
        //1.FIND THE ACTUAL SELLER
        const seller = await User.findById(req.value.body.seller);
        //2. CREATE A NEW CAR
        const newCar = req.value.body;
        delete newCar.seller;

        const car = new Car(newCar);
        car.seller = seller;
        await car.save();
        
        //3. ADD NEW CREATED CAR TO THE ACTUAL SELLER
        seller.cars.push(car);
        await seller.save();
        
        res.status(200).json(car);
    
    },
    getCar: async (req,res,next) => {
        //RETRIEVE THE SPECIFIC CAR THAT IS REQUIRED
        const car = await Car.findById(req.value.params.carId);
        res.status(200).json(car);
    },
    updateCar: async (req,res,next) => {
        const {carId} = req.value.params;
        const newCar = req.value.body;
        const car = await Car.findByIdAndUpdate(carId,newCar);
        res.status(200).json(car);
    },
    patchCar: (req,res,next) => {
        //UPDATE SPECIFIC DETAILS ABOUT THE CAR
        const {carId} = req.value.params;
        const newCar = req.value.body;
        const car = await Car.findByIdAndUpdate(carId,newCar);
        res.status(200).json(car);
    },
    deleteCar: (req,res,next) => {
        //TAP THE CAR WHICH TO BE DELETED
        const {carId} = req.value.params;
        
        //FIND THE CAR
        const car = await Car.findById(carId);
        if(!car) {
            return res.status(404).json({error : 'CAR DOES NOT EXIST'});
        }
        const sellerId = car.seller;
        //FIND THE SELLER
        const seller = await User.findById(sellerId);

        //REMOVE THE CAR
        await car.remove();
        //REMOVE THE CAR FROM THE SELLER'S SELLING LIST
        seller.cars.pull(car);
        await seller.save();

        res.status(200).json({success : true});
    
    }
    
}