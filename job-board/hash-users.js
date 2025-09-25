const fs = require('fs');
const bcrypt = require('bcryptjs');

// Load users from users.json
const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'));

// Hash passwords
users.forEach(user => {
    user.password = bcrypt.hashSync(user.password, 8);
});

// Save back to users.json
fs.writeFileSync('src/data/users.json', JSON.stringify(users, null, 2));