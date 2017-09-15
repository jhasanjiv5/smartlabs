import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
PlayersList = new Mongo.Collection('player');
Meteor.startup(() => {
  // code to run on server at startup
    
});
