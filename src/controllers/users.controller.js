const usersController = {}
const User = require('../models/User')
const passport = require('passport')

usersController.signup = async (req,res)=> {
    const errors = []
    const {name,email,password,confirm_password,phone} = req.body
    if(password !== confirm_password){
        errors.push({text:'Las contraseñas no coinciden'})
    }
    else if(password.length < 6){
        errors.push({text:"Las contraseñas deben ser mayores a 6 caracteres"})
    }
    if (errors.length > 0){
        res.render('index',{errors,
            name,
            email,
            confirm_password,
            password,
        phone})
    }else{
        const emailUser = await User.findOne({email : email});
        if(emailUser){
            req.flash('error_msg','Error de registro : El correo esta en uso.')
            res.redirect('/')
            
        } else {
            const newUser = new User({name , email,password , phone})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg','Registro exitoso, inicia sesión para comenzar!.')
            res.redirect('/')
        }
    }
}

usersController.signin = passport.authenticate("local" , {
    failureRedirect : '/',
    successRedirect : '/notes',
    failureFlash: true
})

usersController.logout = (req,res) => {
    req.logout();
    res.redirect('/');
}

module.exports = usersController
