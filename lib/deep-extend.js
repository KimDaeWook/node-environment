'use strict';

function clone(x) {
	
	if(!x) return x;
	
	
	if(Array.isArray(x)) {
	
		var resultArray = [];
		x.forEach(function(v) {
			resultArray.push(clone(v));
		});
		return resultArray;
		
	} else if(typeof x === "object") {
		var resultObj = {};
		var keys = Object.keys(x);	
		keys.forEach(function(key){
			resultObj[key] = clone(x[key]);
		});
		return resultObj;		
	} else {
		return x;
	}
			
}

module.exports = function extend(x, y) {	
	
	if(typeof x !== typeof y) {
		return clone(y);
	}
	
	var result = clone(x);
		
	if(Array.isArray(y)) {
	
		y.forEach(function(v) {
			if(result.indexOf(v) < 0){
				result.push(clone(v));	
			}			
		});
		
		return result;	
		
	} else if(typeof y === "object") {
		var keys = Object.keys(y);	
		keys.forEach(function(key){
			result[key] = extend(result[key], y[key]);
		});		
		return result;		
	} else {		
		return y;
	}
	
		
};
