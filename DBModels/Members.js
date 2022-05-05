import mongoose from 'mongoose';
const { Schema } = mongoose;
import {MyconnectionString} from "../credentials.js";

// For security, connectionString should be in a separate file and excluded from git
const connectionString = MyconnectionString;

mongoose.connect(connectionString, {
    dbName: 'mydb',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});


const membersSchema = new Schema({
    id: { type: Number, required: true},
    age: Number,
    gender: String,
    name: String,   
    state: String
   });
   
export const Members = mongoose.model('members', membersSchema,'members');

