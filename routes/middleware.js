const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    verifyFaculty : (req, res, next) => {
        let token = req.cookies.token;
        // console.log(token);
        if(!token) {
            res.redirect('/login');
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(200).send(err);
                return;
            }

            // console.log(decoded);
            // console.log(req.params);
            if(decoded.facultyId == req.params.id) {
                next();
                return;
            } else {
                res.status(403).json({
                    message : 'Permission denied'
                })
            }
    
        })

    },

    ifLoggedIn : (req, res, next) => {
        let token = req.cookies.token;
        // console.log(token);
        if(token == null) {
            next();
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(403).send(err);
                return;
            }

            res.redirect('/faculty/' + decoded.facultyId);
        })

        
    }
}