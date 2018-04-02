/**
 * Created by jesseonolememen on 21/10/2017.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Address Model
 * ==========
 */

var Address = new keystone.List('Address', {
	hidden: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Address.add({
	address: {
		type: Types.Location,
		required: false,
		initial: true
	},
	name: {
		type: Types.Name,
		required: false,
		initial: true
	},
	user: {
		type: Types.Relationship,
		ref: 'User',
		required: false,
		initial: false
	},
});

Address.register();
