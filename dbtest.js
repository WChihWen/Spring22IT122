import {Members} from "./DBModels/Members.js";
import * as dt from "./data.js";
// return all records
Members.find({}).lean()
    .then((member) => {
        console.log('======find======');
        console.log(member);
    })
    .catch(err => next(err));

// return all records that match a condition
Members.find({"state": "WA" }).lean()
    .then((member) => {
        console.log('======find with WA======');
        console.log(member);
    })
    .catch(err => next(err));

// return a single record
Members.findOne({"id": 2 }).lean()
    .then((member) => {
        console.log('======findOne======');
        console.log(member);

    })
    .catch(err => next(err));       

//insert all default users
var myobj = dt.getAll();
Members.insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log('======insertMany======');
    console.log("Number of documents inserted!");

    // insert or update a single record
    const newMember = {'id':6, 'name':'Frank', 'age': 66, 'gender': 'male', 'state': 'OC' }
    Members.updateOne({'id':6}, newMember, {upsert:true}, (err, result) => {
        if (err) return next(err);
        console.log('======updateOne======');
        console.log(result);   
    });
});    



const deleteMember = {'id':7, 'name':'Frank22dd', 'age': 66, 'gender': 'male', 'state': 'OC' }
Members.updateOne({'id':7}, deleteMember, {upsert:true}, (err, result) => {
    if (err) return next(err);
    console.log('======updateOne======');
    console.log(result);
    // other code here

    var myquery = { 'id': 7 };
    Members.deleteOne(myquery, function(err, obj) {
        console.log('======deleteOne======');
        if (err) throw err;
        console.log("1 document deleted");    
    });
});



