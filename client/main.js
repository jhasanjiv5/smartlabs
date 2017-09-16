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

Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar=event.target.registerEmail.value;
            var passwordVar=event.target.registerPassword.value;
            Accounts.createUser({
                email:emailVar,
                password:CryptoJS.MD5(passwordVar).toString()
            });
            console.log("Form submitted!");
            
        },
        'click .registerClose':function(event){
            event.preventDefault();
            document.getElementsByClassName("registerClass")[0].style.visibility="collapse"; 
            
            document.getElementsByClassName("loginPageClass")[0].style.visibility="visible"; 
          
        },
});
Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar=event.target.loginEmail.value;
            var passwordVar=event.target.loginPassword.value;
            Meteor.loginWithPassword(emailVar,CryptoJS.MD5(passwordVar).toString(),function(error){
    if(error){
        console.log(error.reason);
        alert(error.reason)
        }        
          });
        
            
        },
});
Template.dashboard.events({
   'click .logout':function(event){
    //event.preventDefault();
    Meteor.logout();
}, 
});
Template.registerlink.events({
   'click .registerLinkClass':function(event){
    event.preventDefault();
    if(document.getElementsByClassName("registerClass")[0].style.visibility=="visible")
        document.getElementsByClassName("registerClass")[0].style.visibility="collapse"; 
       else
           {
             document.getElementsByClassName("registerClass")[0].style.visibility="visible"; 
            document.getElementsByClassName("loginPageClass")[0].style.visibility="hidden"; 
           }
        
}, 
});