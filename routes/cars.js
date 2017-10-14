const router= require('express-promise-router');

const CarsController = require('../controllers/cars');
const {
    validateBody,
    validateParam,
    schemas
} = require('../helpers/routeHelpers');

router.route('/')
    //RETRIEVE THE LIST OF ALL THE CARS
    .get(CarsController.index)
    .post(validateBody(schemas.carSchema),CarsController.newCar); 

router.route('/:carId')
    .get(validateParam(schemas.idSchema, 'carId'),CarsController.getCar)
    .put([validateParam(schemas.idSchema, 'carId'),validateBody(schemas.putCarSchema)],CarsController.updateCar)
    .patch([validateParam(schemas.idSchema, 'carId'),validateBody(schemas.patchCarSchema)],CarsController.patchCar)
    .delete(validateParam(schemas.idSchema, 'carId'),CarsController.deleteCar);
    
    module.exports = router;