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

  // Create user
  'post /api/v1/user': 'UserController.create',
  // Find user
  'get /api/v1/user/:id?': 'UserController.find',
  // Update user
  'put /api/v1/user/:id?': 'UserController.update',
  // Delete user
  'delete /api/v1/user/:id?': 'UserController.destroy',
  // User confirm
  'put /api/v1/user_confirm/:id?': 'AuthController.user_confirm',

  // Create provider
  'post /api/v1/provider': 'ProviderController.create',
  // Find provider
  'get /api/v1/provider/:id?': 'ProviderController.find',
  // Update provider
  'put /api/v1/provider/:id?': 'ProviderController.update',
  // Delete provider
  'delete /api/v1/provider/:id?': 'ProviderController.destroy',
  // Provider confirm
  'put /api/v1/provider_confirm/:id?': 'AuthController.provider_confirm',
  // User login
  'post /api/v1/user_login': 'AuthController.user_login',
  // Provider login 
  'post /api/v1/provider_login': 'AuthController.provider_login',
  // Logout
  'post /api/v1/logout': 'AuthController.logout',
  // Login with fb
  'get /api/v1/auth/facebook': 'AuthController.facebook',
  'get /api/v1/auth/facebook/callback': 'AuthController.facebook_callback',
  // Stripe 
  'get /api/v1/auth/stripe': 'AuthController.stripe',
  'get /api/v1/auth/stripe/callback': 'AuthController.stripe_callback',

  // Create service
  'post /api/v1/service': 'ServiceController.create',
  // Find service
  'get /api/v1/service/:id?': 'ServiceController.find',
  // Update service
  'put /api/v1/service/:id?': 'ServiceController.update',
  // Delete service
  'delete /api/v1/service/:id?': 'ServiceController.destroy',
  
  // Payment with Stripe
  'post /api/v1/charge': 'PaymentController.charge'
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
