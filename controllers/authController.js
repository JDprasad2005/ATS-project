const users=require('../models/users');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await users.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'Email already registered' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newuser = await users.create({ username, email, password: hashedPassword });

  res.status(201).json({ msg: 'User registered successfully' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, { httpOnly: true,maxAge:60*60*1000, /*sameSite: 'Strict'*/ }).json({
    msg: 'Login successful',
    user: { id: user._id, email: user.email, username: user.username }
  });
};

module.exports={
  register,login
};