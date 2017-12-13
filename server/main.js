import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


Sensors= new Mongo.Collection('sensor');
Records= new Mongo.Collection('record');
Standards =new Mongo.Collection('standard');
Locations =new Mongo.Collection('location');
ttndata= new Mongo.Collection('ttn');

Meteor.startup(() => {
  // code to run on server at startup
    
});

var data;

Meteor.methods({ 

'requestMethod': function() {
var info;

var request = require('request');
  //var url='https://pollutanttracker.data.thethingsnetwork.org/api/v2/devices';
var url ='https://pollutanttracker.data.thethingsnetwork.org/api/v2/query/pollutionchecker001';
var key='key ttn-account-v2.d8l4oxhnFnTIxJ8htdhU85VKPAjlGMI2YWVNF9591os';

var options = {
  url,
  headers: {
    'Authorization': key
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    info = JSON.parse(body);
    //document.getElementsByName("getTTNdata")[0].innerHTML=info[0];
      
    data=info;
    //console.log(data);
    return data;
    
  }
}
    
    request(options,callback);
    console.log(data)
    return data;
  
    
    
    
}
    
});
