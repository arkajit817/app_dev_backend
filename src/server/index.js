const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
// const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');
app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(
    bodyparser.urlencoded({
      extended: true,
    })
  );


// app.use(fileUpload());
const port = process.env.PORT ||  8000;
require('./middlewares/appMiddlewares')(app);
const api = require('./routes.js');
const db = require('./middlewares/dbConnection');
app.use('/api/',api);


// app.get("/healthcheck",(req,res)=>{
//     console.log("aaaa")
//     res.status(200).send({msg:"user exist",status:200});
// });

// if(process.env.ONESERVER === "true"){
    process.env.PORT = 8000;
    app.use(
        express.static(path.join(__dirname, "dist/"), { maxage: "2h" })
    );
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, './dist/index.html'));
    });
// }

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

