(function(){
	
	var util = require("util");

	function match(keys, conditions, environment, options) {
		
		if(!conditions) return true;
		
		if(!keys) return false;
				
		if(util.isArray(keys) == false) keys = [ keys.toString() ];
		if(util.isArray(conditions) == false) conditions = [ conditions.toString() ];
		
		return conditions.some(function(condition){
			return keys.some(function(key){				
				if(key == condition) return true;				
				return key.match(condition);
			})
		})		
	}
	
	var handler = function(){

	}
	
	handler.create = function(keyProvider){
			
		return function(conditions, environment, options){
			var keys = keyProvider(environment, options);
			return match(keys, conditions, environment, options);
		}
		
	}

	
	module.exports = handler; 
	
})();