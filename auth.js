const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret';

// NOTE: this is an in-memory demo store. Replace with DB and bcrypt in production.
let users = [];

router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  if(!email || !password) return res.status(400).json({error:'email and password required'});
  if(users.find(u=>u.email===email)) return res.status(400).json({error:'exists'});
  const user = { id: users.length+1, email, password, name, is_vip:false };
  users.push(user);
  const token = jwt.sign({ id:user.id, email:user.email, is_vip:user.is_vip }, SECRET);
  res.json({ token, user: { id:user.id, email:user.email, is_vip:user.is_vip } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email && u.password===password);
  if(!user) return res.status(401).json({error:'invalid'});
  const token = jwt.sign({ id:user.id, email:user.email, is_vip:user.is_vip, vip_expiry:user.vip_expiry }, SECRET);
  res.json({ token, user: { id:user.id, email:user.email, is_vip:user.is_vip } });
});

module.exports = router;
