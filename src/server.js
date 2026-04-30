import app from './app.js';
import './database/index.js';

console.log("MONGO =", process.env.MONGO_URI);

app.listen(3001, () => console.log('Application is running at port 3001'));
