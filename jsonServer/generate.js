const fs = require('fs');
const generateDatabase = require('./db.js');

const completeSchema = generateDatabase();
fs.writeFileSync('db.json', JSON.stringify(completeSchema, null, 2));
console.log('🏁 Success! PICKEAT-PICKIT mock database written cleanly to db.json');