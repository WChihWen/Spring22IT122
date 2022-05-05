//const http = require("http");
//import * as http from 'http';
import * as dt from "./data.js";
//import { parse } from "querystring";
import express from 'express';
import {Members} from "./DBModels/Members.js";

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.set('view engine', 'ejs');


//Express syntax
app.get('/', (req,res) => {
    res.type('text/html');
    //res.render('home',{ users: [ { name : "Jayson", age : 39,  gender: "male" },  {name : "Jessie Lin", age : 33,  gender: "female" }]  });
    //res.render('home',{ users: dt.getAll()});
    Members.find({}).lean()
        .then((member) => {
            res.render('home',{ users: member});
        })        
        .catch(err => next(err));    
});
   
app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req,res) => {
    res.type('text/html');    
    Members.findOne({"name": req.query.name }).lean()
    .then((member) => {
        res.render('detail', {user: member});  
    })
    .catch(err => next(err));       
});

app.get('/delete', (req,res) => {
    res.type('text/html');  
    var myquery = { 'id': req.query.id };
    Members.deleteOne(myquery, function(err, obj) {
        if (err) {
            res.render('message', {message: {type:'delete', status: 'failed', message: '['+ req.query.name +'] was deleted failed! err:[' + err +']'}});   
        }else{
            res.render('message', {message: {type:'delete', status: 'succeeded', message: '['+ req.query.name +'] has been deleted!'}});  
        }           
    });
});

app.get('/import', (req,res) => {
    res.type('text/html');     
    var myobj = dt.getAll();
    Members.insertMany(myobj, function(err) {
        if (err) {            
            res.render('message', {message: {type:'import', status: 'failed', message: err}});   
        }else{
            res.render('message', {message: {type:'import', status: 'succeeded', message: 'Members have been imported!'}});   
        }                     
    });        
});



// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
   });

app.listen(3000);


// Node js syntax
// http.createServer((req,res) => {
//     //var path = req.url.toLowerCase();
//     let url = req.url.split("?"); // separate route from query string
//     var path = url[0].toLowerCase();
//     let query = parse(url[1]); // convert query string to a JS object
 
//     switch(path) {
//         case '/':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end(JSON.stringify(dt.getAll()));
//             break;
//         case '/about':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             var str = 'My name is Chih Wen Wang, and I come from Taiwan. When I was a university student in Taiwan, I studied information technology and management. ';
//             str +='However, I focused on learning how to build software and let it work on a computer or the Internet. While graduating, I became a programmer at a technology company in my country and worked for almost ten years. ';
//             str += 'However, my life was changed because I came to the United States with my wife. I have two goals now. One is that I have to improve my English ability. So, I go to study the ESL Program here. Another goal is that I yearn to earn an IT Program degree or certificate in the United States because I do not have any degree in the United States.';
//             res.end(str);
//             break;

//         case '/detail':
//             res.writeHead(200, {'Content-Type': 'text/plain'});   

//             if (dt.getItem(query.name) != null){
//                 res.end(JSON.stringify(dt.getItem(query.name)));
//             }else{
//                 res.end("Name:["+ query.name + "] was not found!");
//             }
            
//             break;
//         default:
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('The page('+ path +') was not found!');
//             break;
//     }
// }).listen(process.env.PORT || 3000);