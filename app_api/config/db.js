const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Si existe MONGODB_URI en .env (producción), úsalo. Si no, usa localhost
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jacsDB';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Connected to MongoDB`);
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1); // Salir del proceso si no puede conectar
  }
};

module.exports = connectDB;
