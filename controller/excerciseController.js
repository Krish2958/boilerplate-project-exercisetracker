const Excercise = require('../models/excercise');
const User = require('../models/user');

exports.createExercise = async (req, res) => {
    try {
        var id = req.params._id;
        const { description, duration, date } = req.body;
        const newExercise = new Excercise({ userId: id, description, duration, date: date || new Date() });
        const savedExercise = await newExercise.save();
        res.json({
            username: (await User.findById(id)).username,
            userId: savedExercise.userId,
            description: savedExercise.description,
            duration: savedExercise.duration,
            date: savedExercise.date.toDateString()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getLogs = async (req, res) => {
    try {
        const a = req.baseUrl;
        const b = String(a);
        const _id = b.split('/')[3];
        const { from, to, limit } = req.query;
        const query = { userId: _id };

        if (from && to) {
            query.date = { $gte: new Date(from), $lte: new Date(to) };
        } else if (from) {
            query.date = { $gte: new Date(from) };
        } else if (to) {
            query.date = { $lte: new Date(to) };
        }


        const arrayOfExercises = await Excercise.find(query).limit(parseInt(limit));

        res.json({ 
            username: (await User.findById(_id)).username,
            _id: _id, 
            count: arrayOfExercises.length,
            logs: arrayOfExercises.map(exercise => ({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}