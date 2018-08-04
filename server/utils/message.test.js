var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () =>{

    it('should generate the correct message object', () => {

        var from = 'mahad';
        var text = 'test';

        var message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});

    });

});

describe('generateLocationMessage', () =>{

    it('should generate the correct location object', () => {

        var from = 'mahad';
        var lat = '11';
        var lng = '12';
        var url = 'https://www.google.com/maps?q=11,12'

        var message = generateLocationMessage(from, lat, lng);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});

    });

});