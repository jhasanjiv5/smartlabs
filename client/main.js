import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';

PlayersList = new Mongo.Collection('player');

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  
});


Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
    //web3.eth.getBalance('0x0A92007Fcf32301C5A726bcdbEa65839A1Ec1971', function(err, res){
       // alert(res)
        
   
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    PlayersList.insert({ text: "Howii", 
                      createdAt: new Date() 
                      });
   
      
   
  },
});
Template.info.helpers({
   player(){
       return PlayersList.find();
   },
     
});
