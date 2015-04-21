module.exports = function(factory) {
	factory.define('provider')
	  .attr('email', 'tuiqwe1@gmail.com')
	  .attr('password', '14491992')
	  .attr('firstName', 'Vuong')
	  .attr('lastName', 'Ngo')
	  .attr('abn', 'hfaiyhuhewioare')
	  .attr('address', '16 Keats Ave, Kingsbury')
	  .attr('lat', 16573684686384)
	  .attr('lng', 3497638623662333)
	  .attr('postcode', 6352);
	factory.define("active_provider").parent("provider")
	  .attr("active", true);
};