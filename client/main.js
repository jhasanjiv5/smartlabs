import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';



Sensors= new Mongo.Collection('sensor');
Records= new Mongo.Collection('record');
Standards =new Mongo.Collection('standard');

Meteor.startup(function () {
  Session.setDefault("templateName", "dashboardTemp")
});

Template.body.helpers({
  template_name: function(){
    return Session.get("templateName")
  }
});

Template.body.events({
  "click .addSensors": function() {
    Session.set("templateName", "addSensorsTemp");
    document.getElementsByClassName("addSensors")[0].style.background="#4CAF50";
    document.getElementsByClassName("dashboard")[0].style.background="";
    document.getElementsByClassName("updateBlockchain")[0].style.background="";
    
    
  },
  "click .dashboard": function() {
    Session.set("templateName", "dashboardTemp");
    document.getElementsByClassName("dashboard")[0].style.background="#4CAF50";
    document.getElementsByClassName("addSensors")[0].style.background="";
    document.getElementsByClassName("updateBlockchain")[0].style.background="";
    
  },
  "click .updateBlockchain": function() {
     Session.set("templateName", "updateBlockChainTemp");
     document.getElementsByClassName("updateBlockchain")[0].style.background="#4CAF50";
     document.getElementsByClassName("dashboard")[0].style.background="";
     document.getElementsByClassName("addSensors")[0].style.background="";
    
  }
  // ..
});

//Template.hello.onCreated(function helloOnCreated() {
//  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//  
//});


//Template.hello.helpers({
//  counter() {
//    return Template.instance().counter.get();
//    //web3.eth.getBalance('0x0A92007Fcf32301C5A726bcdbEa65839A1Ec1971', function(err, res){
//       // alert(res)
//        
//   
//  },
//});

//Template.hello.events({
//  'click button'(event, instance) {
//    // increment the counter when button is clicked
//    instance.counter.set(instance.counter.get() + 1);
//    PlayersList.insert({ text: "Howii", 
//                      createdAt: new Date() 
//                      });
//   
//      
//   
//  },
//});
//Template.info.helpers({
//   player(){
//       return PlayersList.find();
//   },
//     
//});

Template.dashboardTemp.events({
  'submit .ranges':function(event) {
       event.preventDefault();
      var data11=event.target.data11.value;
      var data12=event.target.data12.value;
      var data21=event.target.data21.value;
      var data22=event.target.data22.value;
      var data31=event.target.data31.value;
      var data32=event.target.data32.value;
      try {
      Standards.insert({
          Turbidity:{up: data11,low: data12}, 
          Oxigen:{up: data21,low: data22}, 
          Nitrate:{up: data31,low: data32}
          
      });
      console.log("New standards are set!");
  } catch (e) {
   console.log(e);
}}
});
Template.addSensorsTemp.helpers({
    sensor()
    {
      return Sensors.find();  
    },
    
});
Template.updateBlockChainTemp.helpers({
   sensor: function(){
    return Sensors.find();
    
 }
});
Template.addSensorsTemp.events({
  'submit form':function(event) {
       event.preventDefault();
      var devicename=event.target.deviceName.value;
      var comapanyname=event.target.company.value;
      try{Sensors.insert({ deviceName: devicename, 
                       companyName: comapanyname,
                      createdAt: new Date() 
                      });
      console.log("New device added!");
      } catch (e) {
    console.log(e);
}}
      
  
});

var deviceid;   
Template.updateBlockChainTemp.events({
    
    'change select': function(evt) {
        deviceid=evt.target.value;
    },
  'submit form':function(event) {
       event.preventDefault();
      
      
      
      var data11=event.target.data11.value;
      
      var data21=event.target.data21.value; 
      var data31=event.target.data31.value;
      
      try {
      Records.insert({
          deviceID: deviceid,
          record:[
              {Turbidity: data11}, 
              {Oxigen: data21}, 
              {Nitrate: data31}
          ] 
      });
      console.log("Added new Records from "+deviceid);
  } catch (e) {
    console.log(e);
}}
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
Template.logoutdash.events({
   'click .logout':function(event){
    //event.preventDefault();
    Meteor.logout();
    //Session.clear();
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