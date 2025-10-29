const Queue = require('bull');
const imageQueue = new Queue('image', process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const { callImageProvider } = require('../services/imageProvider');

function initQueue() {
  imageQueue.process(async (job) => {
    const { userId, prompt, options } = job.data;
    const imageUrl = await callImageProvider(prompt, options);
    return { imageUrl };
  });
}

module.exports = { initQueue };
