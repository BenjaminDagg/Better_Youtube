var express = require('express');
var app = require('express')();

//for deployment
var http = require('http').Server(app);

var cors = require('cors');
app.use(cors());

app.use( express.static( __dirname + `/build` ) );

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/build/index.html'));
});


//dev
//app.listen(process.env.PORT || 8080 ,() => console.log('server listening'));

//for deployment
http.listen(process.env.PORT || 8080 ,() => console.log('server listening'));
