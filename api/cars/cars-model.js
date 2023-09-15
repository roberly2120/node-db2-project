const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = async (id) => {
  const car = await db('cars').where('id' , id)
  return car;
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  const newCar = await db('cars').where('id', id)
  return newCar;
}

module.exports = {
  getAll,
  getById,
  create
}