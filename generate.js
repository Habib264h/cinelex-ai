const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Queue = require('bull');

const imageQueue = new Queue('image', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

router.post('/image', auth, async (req, res) => {
  const { prompt, options } = req.body;
  if(!prompt) return res.status(400).json({error:'prompt required'});
  const job = await imageQueue.add({ userId: req.user.id, prompt, options });
  res.json({ jobId: job.id });
});

router.get('/job/:id', auth, async (req, res) => {
  const job = await imageQueue.getJob(req.params.id);
  if(!job) return res.status(404).json({error:'not found'});
  const state = await job.getState();
  const result = job.returnvalue;
  res.json({ state, result });
});

module.exports = router;
