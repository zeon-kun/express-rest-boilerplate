const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validations.js');
const { UserModel }= require('../models');

// JWT Expiration Duration
const expiresIn = '24h'; // 1 hour token expiration

// Register Route
router.post('/register', async (req, res) => {
    // Validation check
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Email uniqueness check
    const emailExists = await UserModel.findOne({ where: { email : req.body.email } });
    if (emailExists) return res.status(400).send('Email address already exists');

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Save user
    const user = new UserModel({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();

        // Create JWT Token
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn });
        
        // Send response with token and expiration time
        res.send({
            token,
            expires: new Date(Date.now() + 60 * 60 * 1000) // Expiration in 1 hour
        });
    } catch (error) {
        res.send({ message: error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    // Validation check
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Email existence check
    const registeredUser = await UserModel.findOne({ where: { email : req.body.email } });
    if (!registeredUser) return res.status(400).send('User with this email does not exist');

    // Check password
    const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
    if (!passwordMatch) return res.status(400).send('Email or Password do not match');

    // Create JWT Token
    const token = jwt.sign({ _id: registeredUser._id }, process.env.JWT_SECRET, { expiresIn });

    // Send response with token and expiration time
    res.send({
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Expiration in 1 hour
    });
});

module.exports = router;
