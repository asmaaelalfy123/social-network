const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path=require('path')

//connectDB
connectDB();

//Intial MiddleWare
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/profile', require('./routes/profile'));

app.use('/api/posts', require('./routes/posts'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
 

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
