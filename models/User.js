var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	email: { type: Types.Email, initial: true, required: false, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: false, hidden: true },
	addresses: { type: Types.Relationship, ref: 'Address', required: false, many: true, initial: false, },
  	createdAt: { type: Types.Datetime, required: false, default: new Date() },
}, 'Profile', {
	profileImage: { type: Types.CloudinaryImage, initial: false, required: false, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' },
	name: { type: Types.Name, required: false, index: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true, required: false },
	type: {
		type: Types.Select,
		required: false,
		default: 'User',
		options: [
			{
				value: 'Admin',
				label: 'Admin'
			},
			{
				value: 'Staff',
				label: 'Staff',
			},
			{
				value: 'User',
				label: 'User',
			}
		]
	}
}, 'Social Accounts', {
	facebook: {
		ID: { type: String, required: false },
		token: { type: String, required: false }
	},
	google: {
		ID: { type: String, required: false },
		token: { type: String, required: false }
	}
}, 'Other', {
	stripe: {
		customerID: { type: String, required: false },
	},
	deviceIdentifier: {
		type: String,
		required: false,
		initial: false,
	},
	resetPasswordToken: {
		type: String,
		required: false,
		hidden: true,
		initial: false,
	},
	resetPasswordExpires: {
		type: Date,
		required: false,
		hidden: false,
		initial: false,
	}
});

User.schema.pre('save', async function (next) {
  this.createdAt = new Date();
  next();
});


// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Order', path: 'orders', refPath: 'user' });
User.relationship({ ref: 'MealReview', path: 'mealReviews', refPath: 'user' });
User.relationship({ ref: 'Address', path: 'addresses', refPath: 'user' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin, profileImage';
User.register();
