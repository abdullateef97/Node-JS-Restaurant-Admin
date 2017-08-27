/**
 * Created by jesseonolememen on 21/08/2017.
 */
var keystone = require('keystone');
var restaurant = require('../../helpers/restaurant');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	restaurant.calculateTotalSales()
		.then(result => {
			view.render('dashboard', { totalSales: result });
		})
		.catch(error => {
			console.log(error);
			view.render('dashboard', { totalSales: 0 });
		});

};
