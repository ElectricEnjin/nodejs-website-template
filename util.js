exports.isDev = function() {
    return process.argv.indexOf('dev') != -1;
};

exports.scriptSrc = function(scriptPath) {
	return scriptPath.substr(scriptPath.indexOf('/', 1));
};