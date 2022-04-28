import { expect } from "chai";
import * as dt from "../data.js";

// execute $ npx mocha test.js
describe('Test getItems whether they are equal:', () => {
    let myTest = { id: 1, name : "Jayson", age : 39,  gender: "male", state:"WA"};
    
    it('JSON objects should be equal', () => {
        expect(myTest).to.deep.equal(dt.getItem('Jayson'));       
    });
  
    it('JSON objects should not be equal', () => {
        expect(myTest).to.not.equal(dt.getItem('Jessie Lin'));       
    });
});

describe('Test addItems whether they are equal:', () => {    
    let myTest = [
        { id: 1, name : "Jayson", age : 39,  gender: "male", state: "WA"},
        { id: 2, name : "Jessie Lin", age : 33,  gender: "female", state: "NY"},
        { id: 3, name : "Jenny", age : 40,  gender: "female", state: "WA"},
        { id: 4, name : "Jack", age : 29,  gender: "male", state: "NY"},
        { id: 5, name : "Reder", age : 41,  gender: "male", state: "NY"},
        { id: 99, name: "Jayson Wang", age: 391, gender: "male1",state: "WA1"}
        ];
    it('JSON objects should be equal', () => {
        let newItem = {"id":99,"name":"Jayson Wang","age":391,"gender":"male1","state":"WA1"};
        dt.addItem(newItem);
        expect(myTest).to.deep.equal(dt.getAll());   
    });
  
    it('JSON objects should not be equal', () => {
        let newItem = {"id":99,"name":"Jayson","age":391,"gender":"male1","state":"WA1"};
        dt.addItem(newItem);
        expect(myTest).to.not.equal(dt.getAll());       
    });
});

describe('Test deleteItem whether they are equal:', () => {        
    it('JSON objects should be equal', () => {     
        let myTest = [
            { id: 1, name : "Jayson", age : 39,  gender: "male", state: "WA"},
            { id: 2, name : "Jessie Lin", age : 33,  gender: "female", state: "NY"},
            { id: 3, name : "Jenny", age : 40,  gender: "female", state: "WA"},
            { id: 4, name : "Jack", age : 29,  gender: "male", state: "NY"},
            { id: 5, name : "Reder", age : 41,  gender: "male", state: "NY"}
            ];  
        let re = dt.deleteItem('Jayson Wang');
        expect(myTest).to.deep.equal(re.myobj);       
    });
  
    it('JSON objects should not be equal', () => {                
        // let re = dt.deleteItem('Jayson1'); // Jayson1 was not in dt, so it is not in dt.
        // expect(re.status).to.equal('failure'); 
        
        let myTest = [            
            { id: 2, name : "Jessie Lin", age : 33,  gender: "female", state: "NY"},
            { id: 3, name : "Jenny", age : 40,  gender: "female", state: "WA"},
            { id: 4, name : "Jack", age : 29,  gender: "male", state: "NY"},
            { id: 5, name : "Reder", age : 41,  gender: "male", state: "NY"}
            ];  
        let re = dt.deleteItem('Jayson1');
        expect(myTest).to.not.equal(re.myobj);   
    });
 });