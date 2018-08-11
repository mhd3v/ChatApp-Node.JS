[{
    id: '',
    name: '',
    room: ''
}]

//addUser()
//removeUser
//getUser()
//getUserList()

//ES6 Classes: 

class Users{

    constructor(){    //not compulsory in classes
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
       var user = this.getUser(id);

       if(user){
           this.users = this.users.filter((user) => user.id !== id);
       }

       return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name); //only need the name of the users instead of whole objects

        return namesArray;
    }


}

module.exports = {Users};