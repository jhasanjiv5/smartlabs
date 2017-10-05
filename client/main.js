import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { jQuery } from 'jquery';
import './main.html';

require('jquery-mousewheel')($);

hex_to_ascii=function(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
 function initialize() {
        var earth = new WE.map('earth_div');
        WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
}
Sensors= new Mongo.Collection('sensor');
Records= new Mongo.Collection('record');
Standards =new Mongo.Collection('standard');

ABIarray=[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"data","outputs":[{"name":"T","type":"uint16"},{"name":"O","type":"uint16"},{"name":"N","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"},{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"}],"name":"save","outputs":[{"name":"flag","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"bytes32"}],"name":"retrievedata","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"uint16"},{"name":"z","type":"uint16"},{"name":"k","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"retrievestandards","outputs":[{"name":"a","type":"uint16"},{"name":"b","type":"uint16"},{"name":"c","type":"uint16"},{"name":"d","type":"uint16"},{"name":"e","type":"uint16"},{"name":"f","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"data11","type":"uint16"},{"name":"data12","type":"uint16"},{"name":"data21","type":"uint16"},{"name":"data22","type":"uint16"},{"name":"data31","type":"uint16"},{"name":"data32","type":"uint16"}],"name":"store","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

contractAddress="0x2f6f38e45b88910a90cfc3b4166b6c6debf28574";

bytedata="6060604052341561000f57600080fd5b6106b08061001e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630147fb0c146100695780632466d88c146100ca5780636b29ea6414610130578063db86c5ff146101a0578063f06ee7ae1461021c57600080fd5b341561007457600080fd5b61008e60048080356000191690602001909190505061029c565b604051808461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff168152602001935050505060405180910390f35b34156100d557600080fd5b61011660048080356000191690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff169060200190919050506102f0565b604051808215151515815260200191505060405180910390f35b341561013b57600080fd5b61015560048080356000191690602001909190505061048a565b6040518085600019166000191681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff16815260200194505050505060405180910390f35b34156101ab57600080fd5b6101b3610533565b604051808761ffff1661ffff1681526020018661ffff1661ffff1681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff168152602001965050505050505060405180910390f35b341561022757600080fd5b610282600480803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff169060200190919050506105c7565b604051808215151515815260200191505060405180910390f35b60016020528060005260406000206000915090508060000160009054906101000a900461ffff16908060000160029054906101000a900461ffff16908060000160049054906101000a900461ffff16905083565b60008060009054906101000a900461ffff1661ffff168461ffff16108061032e5750600060029054906101000a900461ffff1661ffff168461ffff16115b1561033c5760009050610482565b600060049054906101000a900461ffff1661ffff168361ffff1610806103795750600060069054906101000a900461ffff1661ffff168361ffff16115b156103875760009050610482565b600060089054906101000a900461ffff1661ffff168261ffff1610806103c457506000600a9054906101000a900461ffff1661ffff168261ffff16115b156103d25760009050610482565b8360016000876000191660001916815260200190815260200160002060000160006101000a81548161ffff021916908361ffff1602179055508260016000876000191660001916815260200190815260200160002060000160026101000a81548161ffff021916908361ffff1602179055508160016000876000191660001916815260200190815260200160002060000160046101000a81548161ffff021916908361ffff160217905550600190505b949350505050565b60008060008084935060016000866000191660001916815260200190815260200160002060000160009054906101000a900461ffff16925060016000866000191660001916815260200190815260200160002060000160029054906101000a900461ffff16915060016000866000191660001916815260200190815260200160002060000160049054906101000a900461ffff1690508383838393509350935093509193509193565b6000806000806000806000809054906101000a900461ffff169550600060029054906101000a900461ffff169450600060049054906101000a900461ffff169350600060069054906101000a900461ffff169250600060089054906101000a900461ffff1691506000600a9054906101000a900461ffff169050858585858585955095509550955095509550909192939495565b6000866000806101000a81548161ffff021916908361ffff16021790555085600060026101000a81548161ffff021916908361ffff16021790555084600060046101000a81548161ffff021916908361ffff16021790555083600060066101000a81548161ffff021916908361ffff16021790555082600060086101000a81548161ffff021916908361ffff160217905550816000600a6101000a81548161ffff021916908361ffff1602179055506001905096955050505050505600a165627a7a723058206534c5cb87f48d49827889509158f538dc3f06ad9c7f7d7a1987284ea048b6890029";

myContract=web3.eth.contract(ABIarray).at(contractAddress);

Meteor.startup(function () {
  Session.setDefault("templateName", "dashboardTemp");
  
   
});

Template.body.helpers({
     
  template_name: function(){
    return Session.get("templateName");
    
  }
});
Template.map.helpers(
{
    
      
//        initialize();
        renderMap:function(){
            
        $.getScript('http://jvectormap.com/js/jquery-jvectormap-world-mill.js',function(){
            $("#world-map").vectorMap({map: 'world_mill'});
        });
      
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
      }
      myContract.store.sendTransaction(data12,data11,data22,data21,data32,data31,{from: web3.eth.coinbase},function(err,res){
        console.log(res);
          
    });
  },
    'submit .show':function(event) {
    event.preventDefault();
    var deviceid=event.target.SensorID.value;
     
    myContract.retrievedata(deviceid,function(err,res){
        console.log(hex_to_ascii(res[0]));
        console.log(res[1].c[0]);
        console.log(res[2].c[0]);
        console.log(res[3].c[0]);
        document.getElementsByName("deviceID")[0].innerHTML="Recent record stored for Device ID = "+hex_to_ascii(res[0])+" are:";
        document.getElementsByName("turbidity")[0].innerHTML="Turbidity recorded: "+res[1].c[0];
        document.getElementsByName("oxigen")[0].innerHTML="Oxygen dissolved recorded: "+res[2].c[0];
        document.getElementsByName("nitrate")[0].innerHTML="Nitrate recorded: "+res[3].c[0];
        
       
        
        
    });
     }  
  
});
Template.dashboardTemp.helpers({
    
    standards()
    {
    return myContract.retrievestandards(function(err,res){
        document.getElementsByName("turbiditystd")[0].innerHTML="Turbidity between (FNU): "+res[0].c[0]+" & "+res[1].c[0];
        document.getElementsByName("oxigenstd")[0].innerHTML="Oxygen dissolved between (mg/l): "+res[2].c[0]+" & "+res[3].c[0];
        document.getElementsByName("nitratestd")[0].innerHTML="Nitrate between (mg/l): "+res[4].c[0]+" & "+res[5].c[0];
        
    }); 
    },
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
    
    console.log(balance);
    
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
         
         myContract.save.sendTransaction(deviceid,data11,data21,data31,{from: web3.eth.coinbase},function(err,res){
         document.getElementsByName("result")[0].innerHTML="your transaction is: "+res;
        
         console.log(res);
        
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