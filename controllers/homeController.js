const { Invoice, Medicine, Profile, User } = require('../models/index.js')
const bcrypt = require('bcrypt');

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

            res.redirect('/login')
        } catch (error) {
            console.log(error);
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

            const { email, password } = req.body
            // console.log(password);
            let data = await User.findOne({ where: { email } })
            // console.log(data);
            if (data) {
                const isValidPassword = bcrypt.compareSync(password, data.password);
                if (isValidPassword) {
                    req.session.userId = data.id
                    res.redirect(`/main/${data.id}`)
                } else {
                    const error = 'Invalid Password'
                    res.redirect(`/login?error=${error}`)
                }

            } else {
                const error = 'Invalid Email'
                res.redirect(`/login?error=${error}`)

            }

        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    }
    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) res.send(err)
                else {
                    res.redirect('/')
                }
            })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = HomeController