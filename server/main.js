import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
Sensors= new Mongo.Collection('sensor');
Records= new Mongo.Collection('record');
Standards =new Mongo.Collection('standard');
Meteor.startup(() => {
  // code to run on server at startup
    
});
