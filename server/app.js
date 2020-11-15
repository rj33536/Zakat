const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    let text = req.body.text;
    let phoneNumber = req.body.phoneNumber;
    switch (text) {
        case "":
            res.send("CON Hello from Zakat\n 1. Get Donation\n 2. Set category \n 3. Description \n4. Enter pincode");
            break;
        case "1":

            res.send("END Donation details are sent");
            break;
        case "2":
            res.send("END category updated");
            break;
        case "3":
            res.send("END description updated");
            break;
        case "4":
            res.send("CON enter pincode")
            break;
        default:
            console.log(text);
            res.send(`END ${text}`);
            break;
    }

    console.log(req.body.phoneNumber);
    res.end("END Hello ");

}).listen(1337, '127.0.0.1');
console.log('server running at http://127.0.0.1:1337/');
