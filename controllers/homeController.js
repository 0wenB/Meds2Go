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
            const emailUnique = req.flash('unique')


            res.render('register', { emailError, passError, nameError, ageError, profileImageError, balanceError, addressError, emailUnique })
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

                        case 'Password must be at least 8 characters and no more than 40 characters long':
                            req.flash('pass', 'Password must be at least 8 characters and no more than 40 characters long')
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

            } else if (error.name === "SequelizeUniqueConstraintError") {
                req.flash('unique', `Email: ${error.errors[0].instance.email} is already registered`)
                res.redirect('/register')

            } else {
                res.send(error)

            }
        }
    }
    static async loginGet(req, res) {
        try {
            const emailError = req.flash('email')
            const passError = req.flash('password')
            res.render('login', { emailError, passError })
        } catch (error) {
            res.send(error)
        }
    }
    static async loginPost(req, res) {
        try {

            const { email, password } = req.body
            // console.log(password);
            let data = await User.findOne({ where: { email } })
            let profile
            if (data) {
                profile = await Profile.findOne({ where: { UserId: data.id } })
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
                    req.flash('password', 'Invalid Password')

                    res.redirect(`/login`)
                }

            } else {

                req.flash('email', 'Invalid Email')
                res.redirect(`/login`)

            }

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async logout(req, res) {
        console.log('logout>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        req.session.logout = true
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