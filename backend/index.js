// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./db.connection');
const quizRoutes = require('./routes/quiz');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const _diname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true,
}));

app.use(express.json());
dbConnection();
app.use(quizRoutes);
app.use(express.static(path.join(_diname,"/client/dist")));
app.get('*', (_,res)=>{
res.sendFile(path.join(_diname,"client","dist","index.html"));
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
