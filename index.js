//const http = require("http");
//import * as http from 'http';
import * as dt from "./data.js";
//import { parse } from "querystring";
import express from 'express';
import {Members} from "./DBModels/Members.js";
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/api', cors());

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
            res.render('message', {message: {type:'delete', status: 'Failed!', message: '['+ req.query.name +'] was deleted failed! err:[' + err +']'}});   
        }else{
            res.render('message', {message: {type:'delete', status: 'Succeeded!', message: '['+ req.query.name +'] has been deleted!'}});  
        }           
    });
});

app.get('/import', (req,res) => {
    res.type('text/html');     
    var myobj = dt.getAll();
    Members.insertMany(myobj, function(err) {
        if (err) {            
            res.render('message', {message: {type:'import', status: 'Failed!', message: err}});   
        }else{
            res.render('message', {message: {type:'import', status: 'Succeeded!', message: 'Members have been imported!'}});   
        }                     
    });        
});

//=============================================Start API===================================================
//API get all items
app.get('/api/members', (req,res) => {
    Members.find({}).lean()
        .then((member) => {
            if (member) {
                // res.json sets appropriate status code and response header
                res.json(member);
            } else {
                return res.status(500).send('Database Error occurred');
            }
        })        
        .catch(err => next(err));     
});

// API get a single item
app.get('/api/member/:name', (req,res) => {
    Members.findOne({"name": req.params.name }).lean()
    .then((member) => {
        res.json(member);
    })
    .catch(err => next(err));       
});

//API add or update member
app.get('/api/add/:id/:name/:age/:gender/:state', (req,res) => {    
    const newMember = {'id':req.params.id, 'name': req.params.name, 'age': req.params.age, 'gender': req.params.gender, 'state': req.params.state };
    Members.updateOne({'id':req.params.id}, newMember, {upsert:true}, (err, result) => {
        // if (err) {
        //     res.json({type:'add/update', status: 'Failed!', message: err});
        // }else{
        //     res.json({type:'add/update', status: 'Succeeded!', message: 'Members have been added or updated!'});
        // }      
        if (err) {            
            res.render('message', {message: {type:'add/update', status: 'Failed!', message: err}});   
        }else{
            res.render('message', {message: {type:'add/update', status: 'Succeeded!', message: '['+ req.params.name + '] have been added or updated!'}});   
        }     
    });
});

//API delete a member
app.get('/api/delete/:id/:name', (req,res) => {    
    var myquery = { 'id': req.params.id };
    Members.deleteOne(myquery, function(err, obj) {
        // if (err) {
        //     res.json({type:'delete', status: 'Failed!', message: '['+ req.query.name +'] was deleted failed! err:[' + err +']'});
        // }else{
        //     res.json({type:'delete', status: 'Succeeded!', message: '['+ req.query.name +'] has been deleted!'});
        // }    
        if (err) {
            res.render('message', {message: {type:'delete', status: 'Failed!', message: '['+ req.params.name +'] was deleted failed! err:[' + err +']'}});   
        }else{
            res.render('message', {message: {type:'delete', status: 'Succeeded!', message: '['+ req.params.name +'] has been deleted!'}});  
        }           
    });
});

//=============================================End API===================================================


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