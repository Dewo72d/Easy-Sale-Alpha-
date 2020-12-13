const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {jwtSecret} = require('../config/authConfig');
const db = require('../models/db');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try{
                db.connection.query(`SELECT * FROM users WHERE id = ('${payload.id}')`, (err, result) => {
                    if (result.length == 0) {console.log('Ошибка токена');}
                     else {
                        done(null, result[0].id)
                    }
                })
            }
            catch (e) {
                console.log(e);
            }
        })
    )
}

//Возможны траблы с асинхронными методами 