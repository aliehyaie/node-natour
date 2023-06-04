const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB = process.env.DATABASE_LOCAL;
const app = require('./app');

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connections successful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('app running on port 3000');
});
