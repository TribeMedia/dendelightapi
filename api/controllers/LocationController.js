/**
 * Location Controller
 *
 */
module.exports = {

  ip_lookup: function (req, res) {

    var geoip = require('geoip-lite');

    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    var geo = geoip.lookup(ip);

    if (!geo) return res.notFound();

    res.ok(geo);
  },
    
}