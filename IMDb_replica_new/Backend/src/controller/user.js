const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup  = async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email }).exec();
        if (existingUser) {
            return res.status(409).json({
                message: 'User already registered with this email',
            });
        }

        const { firstname, lastname, email, password } = req.body;
        const _user = new User({
            firstname,
            lastname,
            email,
            password
        });

        const savedUser = await _user.save();
        return res.status(201).json({
            // user: savedUser,
            message: 'User created successfully'
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};

exports.signin = async (req, res) => {
    const user = await User.findOne ({ email: req.body.email}).exec();
    if(user){

        if(user.authenticate(req.body.password)){
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: `1h`});
            const { _id, firstname, lastname, email } = user;
            res.status(200).json({
                token,
                user: {
                    _id, firstname, lastname, email
                }
            });

        }else{
            return res.status(400).json({
                message: `Invalid password`
            })
        }
    }else {
        return res.status(400).json({message: 'something went wrong'})
    }
};

const tokenBlacklist = new Set();

exports.signout = async (req,res) => {
    const token = req.header('Authorization');

    if (token) {
        tokenBlacklist.add(token);
        return res.status(200).json({ message: 'User signed out successfully' });
  } else {
        return res.status(400).json({ message: 'No token provided' });
  }
};

exports.signoutTokenRevoke = (req, res, next) => {
    const token = req.header('Authorization');
    if (token && tokenBlacklist.has(token)) {
      return res.status(401).json({ message: 'Token revoked' });
    }
    next();
  }

exports.requireSignin = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = decoded;
        next();
    });
};