const db = require('../../data/db-config')
const Cars = require('./cars-model')
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const [car] = await Cars.getById(req.params.id);
  if(car) {
    req.car = car;
    next();
  } else {
    next({
      status: 404,
      message: `car with id ${req.params.id} is not found`
    })
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if(!vin) {
    next({
      status: 400,
      message: 'vin is missing'
    })
  }
  else if (!make) {
    next({
      status: 400,
      message: 'make is missing'
    })
  }
  else if (!model) {
    next({
      status: 400,
      message: 'model is missing'
    })
  }
  else if (!mileage) {
    next({
      status: 400,
      message: 'mileage is missing'
    })
  } else {
    next();
  } 
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if(isValidVin) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const vinCheck = await db('cars').where('vin', req.body.vin)
  if(!vinCheck.length) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} already exists`
    })
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
