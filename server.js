let projectData = {}
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("web-app"))

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/addData", addData)
function addData(req, res){
  projectData["temperature"]= req.body.temperature,
  projectData["date"]= req.body.date,
  projectData["feeling"]= req.body.feeling
  res.send(projectData)
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
