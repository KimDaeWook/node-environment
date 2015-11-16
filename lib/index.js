(function(){

	var argv = require('optimist')
		.default('envOption', {})
		.argv;	

 	var deepExtend = require('./deep-extend');	
	 
	var fs = require('fs');
	var os = require('os');
	
	var RegexHandler = require("./RegexHandler");
	
	var _FileCache = {};
	var _HandlerCache = {};
	
	var DEFAULT_OPTIONS = {
		"file" : "environments.json",
		"ignoreCache" : false,
		"ignoreArguments" : false
	}
	
	function readEnvironments(path, ignoreCache) {
		
		if((!path) || (fs.existsSync(path) == false)) return {};
		
		var environments;
		if(!_FileCache[path] || ignoreCache) {
			
			// read from file
			var data = fs.readFileSync(path, 'utf8');
			_FileCache[path] = environments = JSON.parse(data);
			
		} else {
			
			// read from cache
			environments = _FileCache[path];
		}
		
		return environments || {};
		
	}
	
	function findMatchEnvironments(environments, options) {
		
		var envKeys = Object.keys(environments);
		var matchedEnvironments = envKeys.filter(function(envKey){
			
			var environment = environments[envKey];
			
			if(envKey == "$default") return false;
			if(!environment.$conditions) return true;
			if(environment.$conditions.length == 0) return true;
			
			return Object.keys(environment.$conditions).every(function(conditionKey){
				
				var handler = _HandlerCache[conditionKey];
				if(!handler) return true;
				
				var condition = environment.$conditions[conditionKey];
				return handler(condition, environment, options);
				
			})
			
		});
		
		return matchedEnvironments;
		
	}
	
	function extendEnvironment(resultValues, environment, options) {		
		
		resultValues = deepExtend(resultValues, readEnvironments(environment.$base, options.ignoreCache));
		resultValues = deepExtend(resultValues, environment || {});
		return resultValues;
	}
	
	var Environment = function(options){
		
		options = deepExtend(DEFAULT_OPTIONS, options || {});
		
		if(!options.ignoreArguments) {
			options = deepExtend(options, argv.envOption);	
		}	
		
		var environments = readEnvironments(options.file, options.ignoreCache);

		// get target environments
		if(environments) {
									
			var defaultEnvironment = environments["$default"] || {}; 		
			var resultValues = extendEnvironment({}, defaultEnvironment, options);
							
			var matchedEnvironments = findMatchEnvironments(environments, options);			
			matchedEnvironments.forEach(function(envKey){				
				resultValues = extendEnvironment(resultValues, environments[envKey], options);				
			});			
			
			resultValues.getEnvironments = function() {
				return matchedEnvironments;
			}
			resultValues.is = function(environmentName) {
				return matchedEnvironments.indexOf(environmentName) >= 0;
			}
			
			delete resultValues["$conditions"];
			delete resultValues["$base"];
			
			return resultValues;
																		
		} else {
			
			return {};
			
		}

		
		
		
	}
	
	
	// register environment handler
	Environment.registerHandler = function(name, handler) {
		_HandlerCache[name] = handler;
	} 
	
	// unregister environment handler 
	Environment.unregisterHandler = function(name) {
		
		if(!_HandlerCache[name]) return;
		delete _HandlerCache[name];
						
	} 
	
	
	Environment.registerHandler("ip", RegexHandler.create(function(environment, options){				
		var ifaces = os.networkInterfaces();				
		function IPv4Filter(iface) { return !('IPv4' !== iface.family || iface.internal !== false); };				
		return options.ip || Object.keys(ifaces).map(function(name){
			return ifaces[name].filter(IPv4Filter).map(function(iface){ return iface.address; })
		}).reduce(function(prev, current, result){
			return prev.concat(current);
		});	
				
	}));
	
	Environment.registerHandler("hostName", RegexHandler.create(function(environment, options){
		return options.hostName || os.hostname();	
	}));
	
	Environment.registerHandler("userAgent", RegexHandler.create(function(environment, options){
		return options.userAgent;
	}));
	
	
	
	module.exports = Environment; 
	
})();