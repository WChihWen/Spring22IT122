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
app.get('/', (req,res,next) => {
    res.type('text/html');
    Members.find({}).lean()
        .then((member) => {
            //res.render('home',{ users: member});
            //res.render('home-react',{ users: JSON.stringify( member)});
            res.render('home-react-UI',{ users: JSON.stringify( member)});
        })        
        .catch(err => next(err));    
});
   

app.get('/detail', (req,res,next) => {
    res.type('text/html');    
    Members.findOne({"name": req.query.name }).lean()
    .then((member) => {
        //res.render('detail', {user: member});  
        res.render('detail-react', {user:  JSON.stringify(member)});  
    })
    .catch(err => next(err));       
});



app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});



app.get('/delete', (req,res) => {
    res.type('text/html');  
    var myquery = { 'id': req.query.id };
    Members.deleteOne(myquery, function(err, obj) {
        
        if (obj.deletedCount == 0) {
            res.render('message', {message: {type:'delete', status: 'Failed!', message: '['+ req.query.name +'] was not found! err:[' + err +']'}});   
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
app.get('/api/members', (req,res,next) => {
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
app.get('/api/member/:name', (req,res,next) => {
    Members.findOne({"name": req.params.name }).lean()
    .then((member) => {
        res.json(member);
    })
    .catch(err => next(err));       
});

//API add or update member
//'/api/add/:id/:name/:age/:gender/:state'
app.get('/api/add/:id/:name/:age/:gender/:state', (req,res) => {    
    const newMember = {'id':req.params.id, 'name': req.params.name, 'age': req.params.age, 'gender': req.params.gender, 'state': req.params.state };
    Members.updateOne({'id':req.params.id}, newMember, {upsert:true}, (err, result) => {          
        if (err) {            
            res.render('message', {message: {type:'add/update', status: 'Failed!', message: err}});   
        }else{
            if (result.matchedCount == 0){
                res.render('message', {message: {type:'add', status: 'Succeeded!', message: '['+ req.params.name + '] have been added!'}});  
            }else{
                res.render('message', {message: {type:'update', status: 'Succeeded!', message: '['+ req.params.name + '] have been updated!'}});  
            }             
        }     
    });
});

//API delete a member
app.get('/api/delete/:id/:name', (req,res) => {    
    //var myquery = { 'id': req.body.id };
    var myquery = {'id': req.params.id };
    Members.deleteOne(myquery, function(err, result) {
        if (result.deletedCount == 0) {
            res.render('message', {message: {type:'delete', status: 'Failed!', message: '['+ req.params.name +'] was not found! err:[' + err +']'}});   
        }else{
            res.render('message', {message: {type:'delete', status: 'Succeeded!', message: '['+ req.params.name +'] has been deleted!'}});  
        }           
    });
});

//*************************for UI*******************************
app.post('/api/add', (req,res,next) => {    
    const newMember = {'id':req.body.id, 'name': req.body.name, 'age': req.body.age, 'gender': req.body.gender, 'state': req.body.state };

    Members.updateOne({'id':req.body.id}, newMember, {upsert:true}, (err, result) => {          
        if (err) { 
            res.json({updated: -1, _id: -1, message: err}); 
        }else{
            if (result.matchedCount == 0){
                //new and find new name's _id
                Members.findOne({"name": req.body.name }).lean()
                    .then((member) => {
                        res.json({updated: 0, _id: member._id, message: '['+ req.body.name  + '] have been added!'});
                    })
                    .catch(err => next(err)); 
            }else{
                //update
                res.json({updated: result.nModified, _id: req.body._id, message: '['+ req.body.name  + '] have been updated!'});
            }             
        }     
    });
});
app.post('/api/delete', (req,res) => {    
    var myquery = { '_id': req.body._id };

    Members.deleteOne(myquery, function(err, result) {
        if (err) { 
            res.json({status: -1, message: '['+ req.body.name +'] delete fault! Err:['+ err +']'});  
        }else{
            if (result.deletedCount == 0) {
                res.json({status: 0, message: '['+ req.body.name +'] was not found!'});  
            }else{
                res.json({status: result.deletedCount, message: '['+ req.body.name +'] has been deleted!'});            
            }       
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