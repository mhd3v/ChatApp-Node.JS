var moment = require('moment');

//  https://momentjs.com/docs/#/displaying/
//  https://momentjs.com/docs/#/manipulating/

var date = moment();
date.add(100, 'years');
console.log(date.format());
console.log(date.format('MMM'));
console.log(date.format('MMM YYYY'));
console.log(date.format('Do MMM YYYY'));
console.log(date.format('hh:mm a'));

var currentTime = moment().valueOf();   //equivalent to new Date().getTime();