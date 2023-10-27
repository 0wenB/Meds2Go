const MainController = require('../controllers/mainController')

const router = require('express').Router()

let isAdmin = function (req, res, next) {
    if (req.session.userId == 1) {
        console.log('halohalo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        next()
    } else {
        res.redirect('/login?message=You are not an Admin')
    }
  };

router.get('/admin',isAdmin, MainController.mainPageAdmin)

router.get('/admin/addMedicine',isAdmin, MainController.renderAddMedicine)
router.post('/admin/addMedicine',isAdmin, MainController.AddMedicine)

router.get('/admin/edit/:medId',isAdmin, MainController.renderEditMedicine)
router.post('/admin/edit/:medId',isAdmin, MainController.editMedicine)

router.get('/admin/delete/:medId',isAdmin, MainController.deleteMedicine)



router.use((req,res,next) => {
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
