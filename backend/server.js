const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes'); 
const itemRoutes = require('./src/routes/itemRoutes');
const locationsRoutes=require('./src/routes/locationRoutes')
const searchRoutes=require('./src/routes/searchRoutes')
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['https://sanikakgp.online','http://localhost:3000'], credentials: true }));

app.use('/auth', authRoutes);  
app.use('/api/items', itemRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
