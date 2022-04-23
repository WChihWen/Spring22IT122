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

