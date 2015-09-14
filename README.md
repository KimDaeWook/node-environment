#node-environments

The node-environment is Light-weight environment(settings) JSON file parser for node.js. 
node-environment can define multiple environments(ex. dev, staging, production) in single environment file. and provides environment values from matched environment conditions.

#Install

> npm install node-environment

#Test

> npm test

### Get Started
    var environment = require("node-environment");
    var options = {};
    var values = environment(options);
    console.log(values)
#####Output
    {
        "propertyBoolean": true,
        "propertyNumber": 1111,
        "propertyString": "string property",
        "propertyOverride": "value override",
        "port": 8080
	}

### Load Environment with $base file
    var environment = require("node-environment");
    var values = environment();
    console.log(values.propertyString);
#####Output
    string property

### Property override
    var environment = require("node-environment");
    var values = environment();
    console.log(values.propertyOverride);
#####Output
    value override

### Load Specific environment
    // HOST NAME : dev-host (hostname is automatically detect)
    var environment = require("node-environment");
    var values = environment();
    console.log(values.isDev);
#####Output
    true

### Load Specific environment with environment parameter
    var environment = require("node-environment");
    var values = environment({ "hostName" : "dev-host" });
    console.log(values.isDev);
#####Output
    true

### Load multiple environment 
    var environment = require("node-environment");
    var values = environment({ "hostName" : "dev-host" });
    console.log("dev : " + values.isDev + " / master : " + values.isMaster);
#####Output
    dev : true / master : true

### Example Environment Files
*example environment files in same directory with index.js.*

#### environments.json
    {
	    "Development" : {
	        "$conditions" : {
	            "hostName" : "dev-host"
	        },
	        "isMaster" : false,
	        "isDev" : true,
	        "port" : 10080
	    },
	    
	    "Master" : {
	        "$conditions" : {
	            "hostName" : ["dev-host", "master-host"]
	        },
	        "$base" : "environments.master.json",
	        "isMaster" : true      
	    },
	        
	    "$default" : {
	        "$base" : "environments.default.json",
	        "port" : 8080,
	        "propertyOverride" : "value override"        
	    }    
	}

#### environments.default.json

    {
	    "propertyBoolean" : true,
	    "propertyNumber" : 1111,
	    "propertyString" : "string property",
	    "propertyOverride" : "value"
	}

#### environments.master.json

    {
	    "port" : 80
	}


#Options

*documentation is not yet :(*
