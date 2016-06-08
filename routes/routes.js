
module.exports = function(app) {

	app.get('/', function(req, res){
		require('../views/index.marko.html').render({
            name: 'Frank',
            count: 30,
            colors: ['red', 'green', 'blue']
        }, res);
	});
};
