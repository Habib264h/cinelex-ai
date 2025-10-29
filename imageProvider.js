async function callImageProvider(prompt, options) {
  // Placeholder provider: returns a dummy image URL after a delay.
  await new Promise(r=>setTimeout(r, 1500));
  return `https://dummyimage.com/1024x1024/000/fff&text=${encodeURIComponent(prompt)}`;
}

module.exports = { callImageProvider };
