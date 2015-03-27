module.exports = function(factory) {
	factory.define('user')
	  .attr('email', 'tuiqwe@gmail.com')
	  .attr('password', '1449199arewre2');

	factory.define("active_user").parent("user")
	  .attr("active", true);
};