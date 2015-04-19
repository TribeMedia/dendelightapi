/**
 * Notification Controller
 *
 */
module.exports = {

  provider_notification: function (req, res) {
    var providerId = req.provider.id;

    ProviderNotification.find({where: {providerId: providerId}, sort: 'createAt DESC', limit: 10}, function (err, notifications) {
      if (err) return res.notFound();
      res.ok(notifications);
    })
  },

  provider_read_notification: function (req, res) {
    var providerId = req.provider.id;

    ProviderNotification.update({providerId: providerId}, {read: true}, function (err, notifications) {
      if (err) return res.notFound();
      res.ok(notifications);
    })
  }

}