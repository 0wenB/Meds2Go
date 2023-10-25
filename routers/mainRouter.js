const MainController = require('../controllers/mainController')

const router = require('express').Router()

//render main page, tampilan profile user dan find all medicines
router.get('/:idPatient', MainController.mainPagePatient)
//post ke invoices idPatient dan idMedicine dari params
router.post('/:idPatient/buy/:idMedicine', MainController.mainPagePatient)
// render halaman checkout obat
router.get('/:idPatient/checkout', MainController.mainPagePatient)
//post destroy
router.get('/:idPatient/checkout/complete', MainController.mainPagePatient)

router.get('/:idPatient/thankyou', MainController.mainPagePatient)







module.exports = router
