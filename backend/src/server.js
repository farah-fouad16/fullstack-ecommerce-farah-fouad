const app = require('./app');
const connectMongo = require('./config/db');

const PORT = process.env.PORT || 5000;

connectMongo();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));