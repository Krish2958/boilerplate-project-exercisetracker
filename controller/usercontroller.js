const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const arrayOfUsers = await User.find({});
        res.json(arrayOfUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get users' });
    }
}

exports.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({ username });
    try {
        const savedUser = await newUser.save();
        res.json({
            username: savedUser.username,
            _id: savedUser._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
}
