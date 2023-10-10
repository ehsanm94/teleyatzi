const config = require('./config');

require('ngrok').connect({
    addr: config.express.port,
    authtoken: config.ngrok.authToken,
    onLogEvent: console.log
}).then(console.log);
