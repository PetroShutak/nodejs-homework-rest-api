const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'home work done' })
  req.app.get('io').emit('contacts', 'contacts')
  next();
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
  req.app.get('io').emit('contacts', 'contacts')
  next();
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
  req.app.get('io').emit('contacts', 'contacts')
  next();

})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
  req.app.get('io').emit('contacts', 'contacts')
  next();

})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
  req.app.get('io').emit('contacts', 'contacts')
  next();
})

module.exports = router
