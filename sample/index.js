/* global it */
/* global describe */

(function(){
	
	var environment = require("../");	
	
	var options = {}, values;
	
	// Get Started
	//options = {};
	values = environment();
	console.log(values);
	
	values = environment();
	console.log(values.propertyString);
	
	values = environment();
	console.log(values.propertyOverride);
		
    values = environment({ "hostName" : "dev-host" });
    console.log(values.isDev);
	
	values = environment({ "hostName" : "dev-host" });
    console.log("dev : " + values.isDev + " / master : " + values.isMaster);
	
})();
