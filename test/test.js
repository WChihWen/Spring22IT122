import { expect } from "chai";
import * as dt from "../data.js";

// execute $ npx mocha test.js
describe('Test getItems whether they are equal:', () => {
    let myTest = { id: 1, name : "Jayson", age : 39,  gender: "male", state:"WA"};
    
    it('Jayson\'s info should be equal the object named myTest', () => {
        expect(myTest).to.deep.equal(dt.getItem('Jayson'));       
    });
  
    it('Jessie Lin\'s info should not be equal the object named myTest', () => {
        expect(myTest).to.not.equal(dt.getItem('Jessie Lin'));       
    });
});

describe('Test addItems whether they are equal:', () => {   
    it('Jason object,Jayson Wang, was added successfully', () => {
        let newItem = {"id":99,"name":"Jayson Wang","age":391,"gender":"male1","state":"WA1"};
        let re = dt.addItem(newItem);
        expect('success').to.equal(re.status);   
    });
  
    it('Duplicate item is not added successfully', () => {
        let newItem = {"id":99,"name":"Jayson","age":391,"gender":"male1","state":"WA1"};
        let re = dt.addItem(newItem);
        expect('success').to.not.equal(re.status);       
    });
});

describe('Test deleteItem whether they are equal:', () => {        
    it('Jayson Wang should be deleted successfully', () => {     
      
        let re = dt.deleteItem('Jayson Wang');
        expect('success').to.deep.equal(re.status);       
    });
  
    it('Jayson1 should not be deleted successfully because it does not exist', () => { 
        
        let re = dt.deleteItem('Jayson1');
        expect('success').to.not.equal(re.status);   
    });
 });