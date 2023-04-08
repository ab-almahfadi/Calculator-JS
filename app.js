const express = require('express');
const bodyPraser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyPraser.urlencoded({extended: true}));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/');
 })


app.listen(process.env.PORT || 3000 , function(){
    console.log("Server listening on port 3000.");
});