const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: "1",
            name: "mahad",
            room: "Node course"
        }, 
        {
            id: "2",
            name: "mahad1",
            room: "React"
        },
        {
            id: "3",
            name: "ali",
            room: "Node course"
        }];
    }); 

    it('should create new users', () => {
        var users = new Users();
        
        var user = {
            id: "123",
            name: "mahad",
            room: "asd"
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);

    });

    it('should return names for Node course', () => {
        var userList = users.getUserList('Node course');
        expect(userList).toEqual(['mahad','ali']);
    });

    it('should return names for React course', () => {
        var userList = users.getUserList('React');
        expect(userList).toEqual(['mahad1']);
    });

    it('should remove a user', () => {
        var user =  users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var user =  users.removeUser('231');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should get a user for a valid id', () => {
        var user = users.getUser('1');
        expect(user.id).toBe('1');
    });

    it('should not get a user for invalid user', () => {
        var user = users.getUser('1123');
        expect(user).toNotExist();
    });
})