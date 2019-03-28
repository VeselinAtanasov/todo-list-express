const env = process.env.NODE_ENV || 'development';
const settings = require('./app/config/settings')[env];
const app = require('express')();

require('./app/config/database')(settings);
require('./app/config/express')(app);
require('./app/config/router')(app);

app.listen(settings.port);
console.log(`Server listening on port ${settings.port}...`);
