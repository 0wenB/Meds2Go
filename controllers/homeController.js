const { Invoice, Medicine, Profile, User } = require('../models/index.js')


class HomeController {

    static async home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }
    static async registerGet(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }
    static async registerPost(req, res) {
        try {
            // console.log(req.body);
            const { email, password } = req.body

            await User.create({ email, password })

            res.send('masuk registerPost')
        } catch (error) {
            res.send(error)
        }
    }
    static async loginGet(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }
    static async loginPost(req, res) {
        try {
            res.send('masuk loginPost')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = HomeController