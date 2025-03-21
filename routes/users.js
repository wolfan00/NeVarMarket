
const router = require('express').Router();
const User = require('../models/User');
const {auth,authAdmin} = require('../middleware/auth');

router.get('/',auth, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id',auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth,async (req, res) => {
  const {
    first_name,
    last_name,
    age,
    gender,
    email,
    password,
    phone,
    address,
  } = req.body;

  try {
    const newUser = await User.create({
      first_name,
      last_name,
      age,
      gender,
      email,
      password,
      phone,
      address,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

router.put('/:id',auth, async (req, res) => {
  const { first_name, lastname, age, gender, email, password, phone, address } =
    req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.first_name = first_name || user.first_name;
    user.last_name = lastname || user.last_name;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

router.delete('/:id',auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
