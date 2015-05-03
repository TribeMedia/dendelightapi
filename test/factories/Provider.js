module.exports = function(factory) {
	factory.define('provider')
	  .attr('email', 'tuiqwe1@gmail.com')
	  .attr('password', '14491992')
	  .attr('firstName', 'Vuong')
	  .attr('lastName', 'Ngo')
	  .attr('abn', 'hs83u7fhd80')
	  .attr('service', ['mowing', 'leaf_removal'])
	  .attr('location', { type: 'Point', coordinates: [144.963089, -37.807880]})
	  .attr('address', '16 Keats Avenue, Kingsbury')
	  .attr('postcode', 3083);
	factory.define("active_provider").parent("provider")
	  .attr("active", true);
};