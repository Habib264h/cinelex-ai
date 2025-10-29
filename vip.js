module.exports = function(req, res, next) {
  const user = req.user;
  if(!user) return res.status(401).json({error:'Unauthorized'});
  const now = Date.now();
  if(user.is_vip && user.vip_expiry && new Date(user.vip_expiry).getTime() > now) return next();
  return res.status(402).json({error:'VIP required'});
}
