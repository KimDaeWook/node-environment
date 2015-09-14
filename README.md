#node-environments

The node-environment is Light-weight environment(settings) JSON file parser for node.js. node-environment  can define multiple environments(ex. dev, staging, production) in single environment file. and provides environment values from matched environment conditions.

-------

##Basic useful features

 1. JSON 파일을 이용한 환경설정
 2. 속성 Override
 3. 조건에 따른 환경 선택
 4. Custom condition handler 제공
 4. Command line으로 환경 값 입력 

#Install

> npm install node-environment

#Test

> npm test

### Example Environment Files

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

### BASIC - Load Environment from JSON file

    var environment = require("node-environment");
    var values = environment();
    console.log(values)

#### Output
    {
	    "propertyBoolean" : true,
	    "propertyNumber" : 1111,
	    "propertyString" : "string property"
    }
    
#### environments.json

    {
	    "$default" : {
		    "propertyBoolean" : true,
		    "propertyNumber" : 1111,
		    "propertyString" : "string property"
	    }
    }

