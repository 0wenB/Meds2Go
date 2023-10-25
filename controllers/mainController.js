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
            
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = MainController