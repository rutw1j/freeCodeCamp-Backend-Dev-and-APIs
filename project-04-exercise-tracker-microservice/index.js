const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


/* Connect to MongoDB */
mongoose.connect(process.env['MONGO_URI'])
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((error) => console.log('Connection Failed !!\n', error));
/* Connect to MongoDB */


/* Exercise Tracker API */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, },
});

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true, },
  description: { type: String, required: true, },
  duration: { type: Number, required: true, },
  date: { type: Date, default: Date.now, },
});

const User = mongoose.model('Users', userSchema, 'Users');
const Exercise = mongoose.model('Exercises', exerciseSchema, 'Exercises');

app.post('/api/users', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res.json({ error: 'User already exists', username: existingUser.username, _id: existingUser._id });
    } else {
      const user = new User({ username: req.body.username });
      await user.save();
      res.json({ username: user.username, _id: user._id });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error getting users' });
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const user = await User.findById(_id);

    const exercise = new Exercise({ userId: _id, description: description, duration: duration, date: date });
    await exercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
  } catch (error) {
    console.log('Post Exercise Error \n', error);
    res.status(500).json({ error: 'Error Adding Exercise' });
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = await User.findById(_id);

    const exercises = await Exercise.find({ userId: _id })
      .where('date')
      .gte(from || '1900-01-01')
      .lte(to || '2100-12-31')
      .limit(parseInt(limit) || 0)
      .exec();

    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    res.json({ _id: user._id, username: user.username, count: log.length, log });
  } catch (error) {
    console.log('Logs Error\n', error);
    res.status(500).json({ error: 'Error Getting exercise Logs' })
  }
});
/* Exercise Tracker API */


/* Admin Remove All (not required for completion of exercise tracker project) */
const adminPassword = process.env.ADMIN_PASSWORD;

app.all('/api/admin/remove-all/:password', async (req, res) => {
  try {
    const providedPassword = req.params.password;
    if (providedPassword === adminPassword) {
      await User.deleteMany({});
      await Exercise.deleteMany({});
      res.json({ message: 'All documents from Users and Exercises removed successfully' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error removing documents' });
  }
});
/* Admin Remove All (not required for completion of exercise tracker project) */


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your App is Listening on Port : ${listener.address().port}`);
});