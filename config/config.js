var env = process.env.NODE_ENV || 'dev';

var config = require('./config.json');
var envConfig = config[env];

if(env === 'test'){
    
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
       // console.log(process.env[key]);      //Array [], Object {}

    });
} else if(env === 'dev'){
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}

// || env === 'dev'