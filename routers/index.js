const HomeController = require('../controllers/homeController')
const mainRouter = require('./mainRouter')
const router = require('express').Router()


router.get('/', HomeController.home)

router.get('/register', HomeController.registerGet)

router.post('/register', HomeController.registerPost)

router.get('/login', HomeController.loginGet)
router.post('/login', HomeController.loginPost)
router.get('/logout', HomeController.logout)

router.use('/main', mainRouter)



module.exports = router