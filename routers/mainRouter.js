const MainController = require('../controllers/mainController')

const router = require('express').Router()
const isLoggedIn = 

router.use((req,res,next) => {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/login?message=Please login First')
    }
})

router.get('/admin', MainController.mainPageAdmin)

router.get('/admin/addMedicine', MainController.renderAddMedicine)
router.post('/admin/addMedicine', MainController.AddMedicine)

router.get('/admin/edit/:medId', MainController.renderEditMedicine)
router.post('/admin/edit/:medId', MainController.editMedicine)

router.get('/admin/delete/:medId', MainController.deleteMedicine)

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
