const { Op } = require('sequelize');
const { Invoice, Medicine, Profile, User } = require('../models');
const formatNumber = require('../helpers/formatNumber');
class MainController {


    static async mainPagePatient(req, res) {
        try {
            let option = {}
            if (req.query.filter) {
                option.where = {
                    category: req.query.filter
                }
            }
            if (req.query.search) {
                option.where = {
                    name: {
                        [Op.iLike]:`%${req.query.search}%`
                    }
                }
            }
            console.log(req.session,'<<<<<<<');
            const userProfile = await Profile.findByPk(req.session.profileId)
            const medicines = await Medicine.findAll(option)
            res.render('mainPage', { userProfile, medicines, formatNumber })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async mainPageAdmin(req, res) {
        try {
            let option = {}
            if (req.query.filter) {
                option.where = {
                    category: req.query.filter
                }
            }
            if (req.query.search) {
                option.where = {
                    name: {
                        [Op.iLike]:`%${req.query.search}%`
                    }
                }
            }
            const userProfile = await Profile.findByPk(req.session.profileId)
            const medicines = await Medicine.findAll(option)
            res.render('mainPageAdmin', { userProfile, medicines, formatNumber })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async checkout(req, res) {
        try {
            // console.log('masuk');
            let data = await Profile.findOne({ where: { id: req.session.profileId }, include: { all: true, nested: true } })
            // console.log(data.Invoices);
            res.render('checkout', { data, formatNumber })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async checkoutDestroy(req, res) {
        try {
            if (req.query.total) {
                let deduct = await Profile.deductBalance(req.session.profileId,req.query.total)
            }
            const { idPatient } = req.params
            await Invoice.destroy({ where: { ProfileId: req.session.profileId } })
            
            res.redirect(`/main/${idPatient}/thankyou`)
        } catch (error) {
            res.send(error)
        }
    }
    static async thankYouPage(req, res) {
        try {
            const { idPatient } = req.params
            let data = await Profile.findByPk(req.session.profileId)
            // console.log(data);
            res.render('thankyou', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async postInvoice(req, res) {
        try {
            const input = {
                ProfileId: req.session.profileId,
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