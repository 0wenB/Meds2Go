const { Invoice, Medicine, Profile, User } = require('../models')

class MainController {


    static async mainPagePatient(req, res) {
        try {
            const userProfile = await Profile.findByPk(req.params.idPatient)
            const medicines = await Medicine.findAll()
            res.render('mainPage', { userProfile, medicines })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async mainPageAdmin(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    static async checkout(req, res) {
        try {
            // console.log('masuk');
            const { idPatient } = req.params
            let data = await Profile.findOne({ where: { id: idPatient }, include: { all: true, nested: true } })
            // console.log(data.Invoices);
            res.render('checkout', { data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async checkoutDestroy(req, res) {
        try {
            const { idPatient } = req.params
            await Invoice.destroy({ where: { ProfileId: idPatient } })
            res.redirect(`/main/${idPatient}/thankyou`)
        } catch (error) {
            res.send(error)
        }
    }
    static async thankYouPage(req, res) {
        try {
            const { idPatient } = req.params
            let data = await Profile.findByPk(idPatient)
            // console.log(data);
            res.render('thankyou', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async postInvoice(req, res) {
        try {
            const input = {
                ProfileId: req.params.idPatient,
                MedicineId: req.params.idMedicine,
                quantity: req.body.quantity
            }
            let addedInvoice = await Invoice.create(input)
            console.log(addedInvoice);
            res.redirect(`/main/${req.params.idPatient}?data=${addedInvoice.MedicineId},${addedInvoice.quantity}`)
        } catch (error) {
            res.send(error)

        }
    }
}

module.exports = MainController