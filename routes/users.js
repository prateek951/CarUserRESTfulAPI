const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const userController = require('../controllers/users');

const {validateParam, validateBody, schemas} = require('../helpers/routeHelpers');

router.route('/')
    //RETRIEVE THE LIST OF ALL THE USERS
    .get(userController.index)
    //CREATE A NEW USER
    .post(validateBody(schemas.userSchema), userController.newUser);

router.route('/:userId')
    //RETRIEVE A SPECIFIC USER
    .get(validateParam(schemas.idSchema,'userId'),userController.getUser)
    //UPDATE A SPECIFIC USER
    .put([validateParam(schemas.idSchema,'userId'),validateBody(schemas.userSchema)],userController.updateUser)
    //PATCH A SPECIFIC USER
    .patch([validateParam(schemas.idSchema,'userId'),validateBody(schemas.userSchema)],userController.patchUser);

router.route('/:userId/cars')
    //RETRIEVE THE LIST OF ALL THE CARS OF A SPECIFIC USER
    .get(validateParam(schemas.idSchema,'userId'),userController.getUserCars)
    //CREATE A NEW CAR FOR THE SPECIFIC USER
    .post([validateParam(schemas.idSchema, 'userId'),validateBody(schemas.userCarSchema)],userController.newUserCar);

    module.exports = router;