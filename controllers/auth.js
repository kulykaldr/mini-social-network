const User = require('../models/user');

exports.userSignup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            error: 'Email is already use in system'
        })
    }

    const user = await new User(req.body);
    user.save();
    return res.json({
        message: 'Signup success! Please login!'
    })
};
