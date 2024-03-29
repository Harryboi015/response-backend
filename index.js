const express =  require('express');
const mongoose =  require('mongoose');
const debug = require('debug')("app: startapp")
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const logger = require('./middlewares/logger');
const upload = require('./middlewares/upload');
const feedback = require('./routes/feedback');
const register = require('./routes/register');
const signin = require('./routes/signin');
const cors = require('cors')
const app = express();

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB")
     .then(() => console.log("Connected to FeedbackDB"))
     .catch((err) => console.error("Error connecting too FeedbackDB")) 

//  middlewares
app.use (express.json());
app.use(express.static("public"));
app.use(logger)
app.use(helmet());
if (app.get("env") ==="development") {
         app.use(morgan("tiny"));
         debug("Debugging");
};
app.use(
     cors({
          origin: "response-app-mauve.vercel.app",
          // origin: "http://localhost:5173",
          allowedHeaders: ["Authorization", "Content-Type", "x-auth-token"],
          methods: ["GET","POST","PUT","PATCH","DELETE"]
     })
)
// configurations
console.log(`Application name: ${config.get("name")}`);
console.log(`Application server: ${config.get("mail.host")}`);

// if(!config.get("jwtPrivateKey")) {
//      console.log("FATAL token is not defined");
//      process.exit(1);
// }

// Routes
app.use("/api/feedbacks", feedback);
app.use("/api/register", register);
app.use("/api/signin", signin);



app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
     res.render("upload")
});
app.post("/upload", upload, (req, res) => {
     res.send("Images upload")
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));