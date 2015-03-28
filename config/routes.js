/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  // Set Authorization: 'Bearer' + token to get access to routes (except signup, login)
  // Carefull with json response in Array or Object format

  'post /api/v1/login': 'AuthController.login',
  // Logout
  'post /api/v1/logout': 'AuthController.logout',
  // Login with fb
  'get /api/v1/auth/facebook': 'AuthController.facebook',
  'get /api/v1/auth/facebook/callback': 'AuthController.facebook_callback',
  // Create occasion
  'post /api/v1/occasion': 'OccasionController.create',
  // Find particular occasion by id. Findall() by /api/v1/occasion
  'get /api/v1/occasion/:id?': 'OccasionController.find',
  // Update occasion
  'put /api/v1/occasion/:id?': 'OccasionController.update',
  // Delete occasion
  'delete /api/v1/occasion/:id?': 'OccasionController.destroy',
  // Create size
  'post /api/v1/occasion_size': 'OccasionSizeController.create',
  // Find size
  'get /api/v1/occasion_size/:id?': 'OccasionSizeController.find',
  // Update size
  'put /api/v1/occasion_size/:id?': 'OccasionSizeController.update',
  // Delete size
  'delete /api/v1/occasion_size/:id?': 'OccasionSizeController.destroy',
  // Create service
  'post /api/v1/service': 'ServiceController.create',
  // Find service
  'get /api/v1/service/:id?': 'ServiceController.find',
  // Update service
  'put /api/v1/service/:id?': 'ServiceController.update',
  // Delete service
  'delete /api/v1/service/:id?': 'ServiceController.destroy'
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
