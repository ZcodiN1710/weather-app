let projectData = [];
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:3000/addData",
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/addData", (req, res) => {
  const allData = req.body;
  const newData = {
    temperature:allData.temp,
    date:allData.currentDate,
    feeling:allData.userResponse
  }
  projectData.push(newData)
  res.send("Data recieved successfully")
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
