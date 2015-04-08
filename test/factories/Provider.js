module.exports = function(factory) {
	factory.define('provider')
	  .attr('email', 'tuiqwe1@gmail.com')
	  .attr('password', '14491992')
	  .attr('firstName', 'Vuong')
	  .attr('lastName', 'Ngo');

	factory.define("active_provider").parent("provider")
	  .attr("active", true);
};