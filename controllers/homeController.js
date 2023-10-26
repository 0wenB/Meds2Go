const { Invoice, Medicine, Profile, User, sequelize } = require('../models/index.js')
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
            const emailError = req.flash('email')
            const passError = req.flash('pass')
            const nameError = req.flash('name')
            const ageError = req.flash('age')
            const profileImageError = req.flash('profileImage')
            const balanceError = req.flash('balance')
            const addressError = req.flash('address')


            res.render('register', { emailError, passError, nameError, ageError, profileImageError, balanceError, addressError })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async registerPost(req, res) {
        try {
            const { email, password, name, age, profileImage, gender, balance, address } = req.body

            const result = await sequelize.transaction(async (ts) => {


                let data = await User.create({ email, password }, { transaction: ts })
                await Profile.create({ UserId: data.id, name, age, profileImage, gender, balance, address }, { transaction: ts })

            });
            // console.log(req.body);


            res.redirect('/login')
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let messages = error.errors.map(el => el.message)
                console.log(messages);
                messages.forEach(el => {
                    switch (el) {
                        case 'Email cannot be Empty':
                            req.flash('email', 'Email cannot be Empty')
                            break;

                        case 'Your input must be an Email':
                            req.flash('email', 'Your input must be an Email')
                            break;

                        case 'Password cannot be Null':
                            req.flash('pass', 'Password cannot be Null')
                            break;

                        case 'Name Cannot be Empty':
                            req.flash('name', 'Name Cannot be Empty')
                            break;

                        case 'Age Cannot be Empty':
                            req.flash('age', 'Age Cannot be Empty')
                            break;

                        case 'Profile Image Cannot be Empty':
                            req.flash('profileImage', 'Profile Image Cannot be Empty')
                            break;

                        case 'Balance Cannot be Empty':
                            req.flash('balance', 'Balance Cannot be Empty')
                            break;

                        case 'Address Cannot be Empty':
                            req.flash('address', 'Address Cannot be Empty')
                            break;

                        default:
                            break;
                    }
                })
                res.redirect('/register')

            } else {
                res.send(error)

            }
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
            if (data) {
                let profile = await Profile.findOne({ where: { UserId: data.id } })
            }
            // console.log(data);
            if (data) {
                const isValidPassword = bcrypt.compareSync(password, data.password);
                if (isValidPassword) {
                    req.session.userId = data.id
                    req.session.profileId = profile.id

                    if (data.isAdmin === true) {
                        res.redirect(`/main/admin`)

                    } else {
                        res.redirect(`/main/${data.id}`)

                    }
                } else {
                    const error = 'Invalid Password'
                    res.redirect(`/login?error=${error}`)
                }

            } else {

                const error = 'Invalid Email'
                res.redirect(`/login?error=${error}`)

            }

        } catch (error) {
            console.log(error);
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