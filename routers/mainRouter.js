const MainController = require('../controllers/mainController')

const router = require('express').Router()
const isLoggedIn = 

router.use((req,res,next) => {
    console.log(req.session);
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/login?message=Please login First')
    }
})
//render main page, tampilan profile user dan find all medicines
router.get('/:idPatient', MainController.mainPagePatient)
//post ke invoices idPatient dan idMedicine dari params
router.post('/:idPatient/buy/:idMedicine', MainController.postInvoice)
// render halaman checkout obat
router.get('/:idPatient/checkout', MainController.checkout)
//post destroy
router.get('/:idPatient/checkout/complete', MainController.checkoutDestroy)

router.get('/:idPatient/thankyou', MainController.thankYouPage)







module.exports = router
