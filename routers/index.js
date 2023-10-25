const HomeController = require('../controllers/homeController')
const mainRouter = require('./mainRouter')
const router = require('express').Router()


router.get('/', HomeController.home)

router.get('/register', HomeController.home)
router.post('/register', HomeController.home)


router.get('/login', HomeController.home)
router.post('/login', HomeController.home)

router.use('/main', mainRouter)

  

module.exports = router