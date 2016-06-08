
var fs = require('fs');

function gatherTemplates(dirs, collector) {
	
	collector = collector || [];
	
	for (var i = 0; i < dirs.length; i++) {
		var dir = dirs[i] + '/';
		var dirItems = fs.readdirSync(dir);
		for (var j = 0; j < dirItems.length; j++) {
			
			var path = dir + dirItems[j];
			var stats = fs.statSync(path);
			
			if (stats.isDirectory()) {
				gatherTemplates([path], collector);
			} else if (/\.marko.html$/.test(path)) {
				collector.push(path);
			}
		}
	}
	
	return collector;
}


module.exports = function() {
	var path = require('path');

	if (process.env.NODE_ENV !== 'production') {
		
		console.log('Enable hot reloading in development');
		require('marko/hot-reload').enable();
		
		var templates = gatherTemplates(['layouts', 'views', 'components']);
		
		templates.forEach(function(template) {
			var templatePath = path.join(__dirname, template);
			
			console.log('Watching: ' + templatePath);
			
			fs.watch(templatePath, { recursive: true }, function (event, filename) {
				
				console.log('Reloading: ' + templatePath);
				
				// Pass along the *full* template path to marko
				require('marko/hot-reload').handleFileModified(templatePath);
			});		
		});
	}
};