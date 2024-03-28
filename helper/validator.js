const connect = require('../db/connection');
var validate = []

const registrationSchema = {
    username: {
        custom: {
            options: value => {
                // return connect.findUserByUsername(value).then(function(user) {
                //     if (user) {
                //         throw new Error('this user is already in use');
                //     }
                // })

                // return connect.connection.query(
                //     'SELECT * FROM users WHERE username=? ',[value], 
                //     function (err, results) {
                //         if (err) throw err
                       
                //         if(results[0]) {return true}
                //     }
                // );
                
                // User.find({
                //     username: value
                // }).then(user => {
                //     if (user.length > 0) {
                //         return Promise.reject('Username already in use')
                //     }
                // })
            }
        },
        errorMessage: "this user is already in us",

    },
    gender: {
        notEmpty: true,
        errorMessage: "Gender field cannot be empty"
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    phone: {
        notEmpty: true,
        errorMessage: "Phone number cannot be empty"
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return User.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    }
                })
            }
        }
    }
}

const loginSchema = {
    username: {
        notEmpty: true,
    },
   
    password: {
        notEmpty: true,
    },
    
}



validate.registrationSchema =registrationSchema;
validate.loginSchema =loginSchema;


module.exports = validate