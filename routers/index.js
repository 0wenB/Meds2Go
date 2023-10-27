const HomeController = require('../controllers/homeController')
const mainRouter = require('./mainRouter')
const router = require('express').Router()

let getUserOrLogin = function (req, res, next) {
    let user = req.session.userId;
  
    if (user == null) {
        delete req.session.userId; 
        next();
    } else {
      req.session.userId = req.session.userId;
      res.redirect(`/main/${user}`);
    }
  };

router.get('/',getUserOrLogin, HomeController.home)

router.get('/register',getUserOrLogin, HomeController.registerGet)

router.post('/register',getUserOrLogin, HomeController.registerPost)

router.get('/login',getUserOrLogin, HomeController.loginGet)
router.post('/login',getUserOrLogin, HomeController.loginPost)
router.get('/logout', HomeController.logout)

router.use('/main', mainRouter)



module.exports = router