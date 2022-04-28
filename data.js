export let users = [
    { id: 1, name : "Jayson", age : 39,  gender: "male", state:"WA"},
    { id: 2, name : "Jessie Lin", age : 33,  gender: "female", state:"NY"},
    { id: 3, name : "Jenny", age : 40,  gender: "female", state:"WA"},
    { id: 4, name : "Jack", age : 29,  gender: "male", state:"NY"},
    { id: 5, name : "Reder", age : 41,  gender: "male", state:"NY"}
    ];


export const getAll = () => {
    return users;
};

export const getItem = (name) => {
    return users.find((element) => {
        return element.name == name;
    });
};


export const addItem = (newItem) => {
    let found = users.find((element) => {
        return element.name == newItem.name;
    }); 

    if(typeof(found) == 'undefined'){
        users.push(newItem);
        return { status: 'success', mymessage: "Name[" + newItem.name + "] was already added!", myobj: users};
    }else{
        return { status: 'failure', mymessage: "Name[" + newItem.name + "] already exists!", myobj: users};
    }      
};

export const deleteItem = (name) => {
    let ln = users.length;
    const result = users.filter(e => e.name != name); 
    
    if(ln == result.length){
        return { status: 'failure', mymessage: "Name[" + name + "] was already deleted failed!", myobj: users};
    }else{
        users = result;
        return { status: 'success', mymessage: "Name[" + name + "] was already deleted!", myobj: users};
    }
};
