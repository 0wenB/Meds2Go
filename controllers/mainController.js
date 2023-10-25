const {Invoice,Medicine,Profile,User} = require('../models')

class MainController{


    static async mainPagePatient(req,res){
        try {
            const userProfile = await Profile.findByPk(req.params.idPatient)
            const medicines = await Medicine.findAll()
            res.render('mainPage', {userProfile, medicines})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async mainPageAdmin(req,res){
        try {
            const userProfile = await Profile.findByPk(req.params.idPatient)
            const medicines = await Medicine.findAll()
            res.render('mainPage', {userProfile, medicines})
        } catch (error) {
            res.send(error)
        }
    }

    static async postInvoice(req,res){
        try {
            const input = {
                ProfileId : req.params.idPatient,
                MedicineId : req.params.idMedicine,
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