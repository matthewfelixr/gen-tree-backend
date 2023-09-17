const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./models/");
const dotenv = require("dotenv")
dotenv.config()

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.get("/", (req,res) => {
    res.json({ message: "Backend Test" });
});

const router = require ("./routes/index")
app.use("/", router)

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
       err.status = 404;
       next(err);
   });
   // handle errors
   app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Not found"});
     else 
       res.status(500).json({message: "Something looks wrong :( !!!"});
   });
   
const PORT = process.env.PORT || 3030;
app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`)
})