const bcrypt = require('bcryptjs');

async function auth () {
         const salt = await bcrypt.genSalt(10);
         const hashed = await bcrypt.hash("idris25", salt)
         console.log(salt);
         console.log(hashed);
}
auth();