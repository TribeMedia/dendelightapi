/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': "hasToken",
  UserController: {
    create: true,
    find: 'isUser',
    update: 'isUser',
    destroy: 'isUser'
  },
  ProviderController: {
    test: true,
    create: true,
    find: 'isProvider',
    update: 'isProvider',
    destroy: 'isProvider'
  },
  BookingController: {
    create: 'isUser',
    find: 'isAdmin',
    update: 'isUser',
    destroy: 'isUser'
  },
  QuoteController: {
    create: 'isProvider',
    find: 'isAdmin',
    update: 'isProvider',
    destroy: 'isProvider'
  },
  ServiceController: {
    create: 'isAdmin',
    find: 'isAdmin',
    update: 'isAdmin',
    destroy: 'isAdmin'
  },
  TransactionController: {
    user_booking_info: 'isUser',
    user_quote_info: 'isUser',
    user_quote_accept: 'isUser',
    provider_task: 'isProvider',
    provider_quote_active: 'isProvider'
  },
  AuthController: {
    '*': true,
  },
  MowingController: {
    '*': 'isAdmin',
    get_info: true
  }, 
  LeafRemovalController: {
    '*': 'isAdmin',
    get_info: true
  }, 
  WeedControlController: {
    '*': 'isAdmin',
    get_info: true
  }, 
  YardCleaningController: {
    '*': 'isAdmin',
    get_info: true
  }, 
  PaymentController: {
    charge: 'isUser'
  },
  NotificationController: {
    provider_notification: 'isProvider',
    provider_read_notification: 'isProvider'
  }
  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
