/* global it */
/* global describe */

(function(){
	
	var assert = require("assert");
	
	var env = require("../");	
	
	describe('basic', function () {
		
		it('module initialized', function () {
			assert(env);
		});
		
		
		it('load default environment', function () {			
			var values = env({});
			console.log(values);
			assert.strictEqual(values.port, 8080);
		});
		
		it('load default environment with $base file', function () {			
			var values = env({});			
			assert.strictEqual(values.propertyBoolean, true);
			assert.strictEqual(values.propertyNumber, 1111);
			assert.strictEqual(values.propertyString, "string property");
		});
				
		it('load default environment with $base property override', function () {			
			var values = env({});			
			assert.strictEqual(values.propertyOverride, "value override");
		});										
		
	});	
	
	describe('complex environment', function () {
		
		it('load Development environment', function () {			
			var values = env({ "hostName" : "dev-host" });
			assert(values.is("Development"));			
			assert.strictEqual(values.isDev, true);
		});	
		
		it('load multiple environment', function () {			
			var values = env({ "hostName" : "dev-host" });
			assert(values.is("Development"));
			assert(values.is("Master"));			
			assert.strictEqual(values.isMaster, true);			
		});	
		it('load multiple environment with $base file', function () {			
			var values = env({ "hostName" : "dev-host" });		
			assert.strictEqual(values.port, 80);			
		});					
		
	});
	
})();
