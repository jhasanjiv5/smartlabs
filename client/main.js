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
Locations =new Mongo.Collection('location');

ABIarray=[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"data","outputs":[{"name":"countryname","type":"bytes32"},{"name":"regionname","type":"bytes32"},{"name":"CO","type":"uint16"},{"name":"CO2","type":"uint16"},{"name":"Turbidity","type":"uint16"},{"name":"PH","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Country","type":"bytes32"}],"name":"showflag","outputs":[{"name":"j","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"},{"name":"x41","type":"uint16"}],"name":"compare","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"},{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"},{"name":"x41","type":"uint16"}],"name":"save","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"}],"name":"retrievedata","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"uint16"},{"name":"z","type":"uint16"},{"name":"k","type":"uint16"},{"name":"j","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"cdata","outputs":[{"name":"flag","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msg","type":"string"}],"name":"show","type":"event"}];

contractAddress="0xe61262107b507aa385e5dcea1563d4495e5528a6";

bytedata="6060604052341561000f57600080fd5b610b5c8061001e6000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630147fb0c1461007d5780631b93097a1461010b5780635a388f2c1461014a57806379b02baf146101b0578063b2166dad1461023d578063edc399b2146102d6575b600080fd5b341561008857600080fd5b6100a2600480803560001916906020019091905050610315565b60405180876000191660001916815260200186600019166000191681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff168152602001965050505050505060405180910390f35b341561011657600080fd5b610130600480803560001916906020019091905050610389565b604051808215151515815260200191505060405180910390f35b341561015557600080fd5b610196600480803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff169060200190919050506103bd565b604051808215151515815260200191505060405180910390f35b34156101bb57600080fd5b610223600480803560001916906020019091908035600019169060200190919080356000191690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff169060200190919050506106c7565b604051808215151515815260200191505060405180910390f35b341561024857600080fd5b61027c60048080356000191690602001909190803560001916906020019091908035600019169060200190919050506109bf565b6040518086600019166000191681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff1681526020019550505050505060405180910390f35b34156102e157600080fd5b6102fb600480803560001916906020019091905050610b05565b604051808215151515815260200191505060405180910390f35b60016020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900461ffff16908060020160029054906101000a900461ffff16908060020160049054906101000a900461ffff16908060020160069054906101000a900461ffff16905086565b6000806000836000191660001916815260200190815260200160002060000160009054906101000a900460ff169050919050565b60008060019050600961ffff168661ffff1610806103e35750602361ffff168661ffff16115b80156103f3575060008661ffff16115b1561048b577fbe025cd0737d1912c421eb1ace55f3a811fccb8c5a479c1d21f0882dc11c607f6040518080602001828103825260248152602001807f434f20696e207468652061697220686173207265616368656420746865206c6981526020017f6d6974730000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a1600090505b60fa61ffff168561ffff1610806104ab575061015e61ffff168561ffff16115b80156104bb575060008561ffff16115b15610553577fbe025cd0737d1912c421eb1ace55f3a811fccb8c5a479c1d21f0882dc11c607f6040518080602001828103825260258152602001807f434f3220696e207468652061697220686173207265616368656420746865206c81526020017f696d69747300000000000000000000000000000000000000000000000000000081525060400191505060405180910390a1600090505b600061ffff168461ffff1610806105725750600561ffff168461ffff16115b8015610582575060008461ffff16115b1561061a577fbe025cd0737d1912c421eb1ace55f3a811fccb8c5a479c1d21f0882dc11c607f6040518080602001828103825260268152602001807f576174657220547572626964697479206861732072656163686564207468652081526020017f6c696d697473000000000000000000000000000000000000000000000000000081525060400191505060405180910390a1600090505b600661ffff168361ffff1610806106395750600961ffff168361ffff16115b8015610649575060008361ffff16115b156106bb577fbe025cd0737d1912c421eb1ace55f3a811fccb8c5a479c1d21f0882dc11c607f60405180806020018281038252601f8152602001807f576174657220504820686173207265616368656420746865206c696d6974730081525060200191505060405180910390a1600090505b80915050949350505050565b6000806106d6868686866103bd565b90508860016000896000191660001916815260200190815260200160002060000181600019169055508760016000896000191660001916815260200190815260200160002060010181600019169055508560016000896000191660001916815260200190815260200160002060020160006101000a81548161ffff021916908361ffff1602179055508460016000896000191660001916815260200190815260200160002060020160026101000a81548161ffff021916908361ffff1602179055508360016000896000191660001916815260200190815260200160002060020160046101000a81548161ffff021916908361ffff1602179055508260016000896000191660001916815260200190815260200160002060020160066101000a81548161ffff021916908361ffff160217905550806000808b6000191660001916815260200190815260200160002060000160006101000a81548160ff02191690831515021790555080156108d8577fbe025cd0737d1912c421eb1ace55f3a811fccb8c5a479c1d21f0882dc11c607f6040518080602001828103825260378152602001807f4e6f20766f696c6174696f6e20666f756e642c2064617461206e6f742073746f81526020017f726564206f6e746f2074686520626c6f636b636861696e00000000000000000081525060400191505060405180910390a16109b3565b7fbe025cd0737d1912c421eb1ace55f3a811fccb8c5a479c1d21f0882dc11c607f60405180806020018281038252606b8152602001807f536f7272792c2064756520746f207468652061626f7665207374616e6461726481526020017f20766f696c6174696f6e73206461746120686173206265656e2073746f72656481526020017f206f6e746f2074686520626c6f636b636861696e20666f72206675727468657281526020017f2070726f63657373696e6700000000000000000000000000000000000000000081525060800191505060405180910390a15b50979650505050505050565b600080600080600085945087600019166001600088600019166000191681526020019081526020016000206000015460001916148015610a24575086600019166001600088600019166000191681526020019081526020016000206001015460001916145b15610af95760016000876000191660001916815260200190815260200160002060020160009054906101000a900461ffff16935060016000876000191660001916815260200190815260200160002060020160029054906101000a900461ffff16925060016000876000191660001916815260200190815260200160002060020160049054906101000a900461ffff16915060016000876000191660001916815260200190815260200160002060020160069054906101000a900461ffff169050848484848494509450945094509450610afa565b5b939792965093509350565b60006020528060005260406000206000915090508060000160009054906101000a900460ff169050815600a165627a7a72305820fcf59d0111879d93dfb14bc15c386ff7391c3ee220f45243d129ade8a78412a90029";

myContract=web3.eth.contract(ABIarray).at(contractAddress);

Meteor.startup(function () {
  Session.setDefault("templateName", "dashboardTemp");
  
   
});

Template.body.helpers({
     
  template_name: function(){
    return Session.get("templateName");
  
  }
});
Template.showdetails.events({
    'click .chartClose':function(event){
            event.preventDefault();
            document.getElementsByClassName("chart")[0].style.display="none"; 
            document.getElementsByClassName("earth")[0].style.display="block"; 
        },
});
Template.getdetails.helpers({
    country:function(event){
        return _.uniq(Sensors.find({},{sort: {
      countryName: 1}
    }).fetch(), true, doc => {
      return doc.countryName;
    });
        
     },
    
});
var countrydata;
var modedata;
var parameterdata;
Template.getdetails.events({
    "change #countryID": function(evt) {
        countrydata=evt.target.value;
    },
    
    "change #parameterID": function(evt) {
         parameterdata=evt.target.value;
    },
    
    "change #modeID": function(event){
        modedata=event.target.value;
        var x=document.getElementById("parameterID");
        x.innerHTML="<option></option>";
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        if(document.getElementById("modeID").selectedIndex==1)
        {
        option1.text = "CO";
        x.add(option1,x[1]);
        option2.text = "CO2";
        x.add(option2,x[2]);
        }
        else
        if(document.getElementById("modeID").selectedIndex==2)
        {
        option1.text = "Turbidity";
        x.add(option1,x[1]);
        option2.text = "PH";
        x.add(option2,x[2]);
        }
        
    },
    
    "submit form":function(event)  {
    event.preventDefault();
    document.getElementsByClassName("chart")[0].style.display="block"; 
    document.getElementsByClassName("earth")[0].style.display="none";
    var country = document.getElementById("myChart").getContext('2d');
    var data=new Array();
    var s=Records.find({Country:countrydata}).fetch();
    var lables=[];
    var i=0;
    var createdat=Records.find({Country:countrydata},{createdAt:1,_id:0}).fetch();
    createdat.forEach(function(){
        
        lables.push(createdat[i].createdAt);
        i++;
    });
   
    var i=0;
    var ctx = document.getElementById("myChart").getContext('2d');
        s.forEach(function(){
        {   
            if(modedata=="Air")
            {
            if(parameterdata=="CO")
            data[i]=s[i].record[1].Air[0].CO;
            else
            if(parameterdata=="CO2")
            data[i]=s[i].record[1].Air[1].CO2;
            }
        else
            if(modedata=="Water")
            {
            if(parameterdata=="Turbidity")
            data[i]=s[i].record[0].Water[0].PH;
            else
            if(parameterdata=="PH")
            data[i]=s[i].record[0].Water[1].Turbidity;
            }
           
           console.log(data[i]);
            i++;
        }});
              
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:lables ,
        datasets: [{
            label: parameterdata,
            data: data,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
            borderColor: 
                'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});     
     
},
    "reset form":function(event)
    {
        event.target.reset();
    }
});
Template.map.helpers(
{
//        initialize();
    renderMap:function(event){
           $.getScript("jquery-jvectormap-world-mill.js", function()
            {
              $("#world-map").vectorMap({map: 'world_mill'});
               
               
           }); 
     },
    record()
    {
      return Records.find();  
    }
    
     
});
var countryname;

Template.map.events({
    "mouseover #world-map":function(){
            var selectedcountry=document.getElementsByClassName("jvectormap-tip")[0].innerHTML;
            console.log(selectedcountry);
            myContract.showflag(selectedcountry,function(err,res){
                //if()
                console.log(res);
                if(res){
                   document.getElementsByClassName("jvectormap-tip")[0].style.background="green"; 
                }else{
                     document.getElementsByClassName("jvectormap-tip")[0].style.background="red";
                }
           
            
            });
            
    },
    "click #world-map":function(){
        document.getElementById("world-map").style.display="none";
        document.getElementsByClassName("mapdataclass")[0].style.display="block"; 
        var x=document.getElementsByClassName("jvectormap-tip")[0];
        document.getElementById("map-data").innerHTML=""
        countryname=x.innerHTML;
        
        var i=0;
        var xy=document.getElementById("regionchoose");
        xy.innerHTML="<option></option>";
    
    var location=Locations.find({countryName: countryname},{regionname:1,_id:0}).fetch();
    location.forEach(function(){
        var option=document.createElement("option");
        option.text = location[i].regionname;
        xy.add(option,xy[i]);
        i++;
       
    });
                
    },
    'change #regionchoose':function(event){
        
      try{
            var coavg=0;
            var co2avg=0;
            var turbavg=0;
            var phavg=0;
            var phcount=0;
            var turbcount=0;
            var co2count=0;
            var cocount=0;
          
            var tooltip;
            var regionname=event.target.value;
            var s=Sensors.find({countryName : countryname, regionname : regionname},{deviceName:1,_id:0}).fetch();
            s.forEach(function(data)
            {
        
            myContract.retrievedata(countryname, regionname, data.deviceName,function(err,res){
            if(res[1].c[0]>0){
                coavg+=res[1].c[0];
                cocount++;
            }
            if(res[2].c[0]>0){
                co2avg+=res[2].c[0];
                co2count++;
            }
            if(res[3].c[0]>0){
                turbavg+=res[3].c[0];
                turbcount++;
            }
            if(res[4].c[0]>0){
                phavg+=res[4].c[0];
                phcount++;
            }
            
            
            document.getElementById("map-data").innerHTML="";
            
            tooltip="<div id=tooltip>Average Pollution recorded <br/>Air: <br/>C0:"+coavg/cocount+"\t CO2:"+co2avg/co2count+"<br/>Water:<br/>PH:"+phavg/phcount+"\t Turbidity:"+turbavg/turbcount+"</div>";
            document.getElementById("map-data").innerHTML+=tooltip;
        
            });
              
            });
            
            var s=Records.find({Country:countryname,Region:regionname},{Region:1,_id:0});
            if(s.count()>0)
                {
                document.getElementById("sorrymsg").style.display="none";
                document.getElementById("regionchoose").style.display="block";
                }
            else
                {
                   document.getElementById("sorrymsg").style.display="block"; 
                   document.getElementById("regionchoose").style.display="block";
                }
           
                
        
        } 
        catch (e) 
        {
        console.log(e);
        }  
    },
    'click .dataClose':function(event){
            event.preventDefault();
            document.getElementsByClassName("mapdataclass")[0].style.display="none"; 
            document.getElementById("world-map").style.display="block";
        },
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
          CO:{up: data11,low: data12}, 
          CO2:{up: data21,low: data22}, 
          PH:{up: data31,low: data32},
          Turbidity:{up: data41,low: data42}
          
      });
    
      console.log("New standards are set!");
  } catch (e) {
   console.log(e);
      }
//      myContract.store.sendTransaction(data12,data11,data22,data21,data32,data31,{from: web3.eth.coinbase},function(err,res){
//        console.log(res);
//          
//    });
  },
    'submit .show':function(event) {
    event.preventDefault();
    var deviceid=event.target.SensorID.value;
     
//    myContract.retrievedata(deviceid,function(err,res){
//        console.log(hex_to_ascii(res[0]));
//        console.log(res[1].c[0]);
//        console.log(res[2].c[0]);
//        console.log(res[3].c[0]);
//        document.getElementsByName("deviceID")[0].innerHTML="Recent record stored for Device ID = "+hex_to_ascii(res[0])+" are:";
//        document.getElementsByName("turbidity")[0].innerHTML="Turbidity recorded: "+res[1].c[0];
//        document.getElementsByName("oxigen")[0].innerHTML="Oxygen dissolved recorded: "+res[2].c[0];
//        document.getElementsByName("nitrate")[0].innerHTML="Nitrate recorded: "+res[3].c[0];
//        
//       
        
        
//    });
     }  
  
});
Template.dashboardTemp.helpers({
    
    standards()
    {
    return myContract.retrievestandards(function(err,res){
        document.getElementsByName("costd")[0].innerHTML="CO between (PPM): "+res[0].c[0]+" & "+res[1].c[0];
        document.getElementsByName("co2std")[0].innerHTML="CO2 between (PPM): "+res[2].c[0]+" & "+res[3].c[0];
        document.getElementsByName("phstd")[0].innerHTML="PH between: "+res[4].c[0]+" & "+res[5].c[0];
        document.getElementsByName("turbiditystd")[0].innerHTML="Turbidity between (NTU): "+res[4].c[0]+" & "+res[5].c[0];
        
    }); 
    },
});
Template.addSensorsTemp.helpers({
    
    sensor()
    {
      return Sensors.find();  
    },
    country()
    {
        return _.uniq(Locations.find({},{sort: {
      countryName: 1}
    }).fetch(), true, doc => {
      return doc.countryName;
    });
    }
    
});

var countryname;
var modename;
var countrynamechoose;

Template.addSensorsTemp.events({
    
    
    'change #countryselect': function(evt) {
        
        var i=0;
    var x=document.getElementById("regionselect");
        x.innerHTML="<option></option>";
    
        
    countryname=evt.target.value;
    
    var location=Locations.find({countryName: countryname},{regionname:1,_id:0}).fetch();
    location.forEach(function(){
        var option=document.createElement("option");
        option.text = location[i].regionname;
        x.add(option,x[i]);
        i++;
       
    });
    },
    
    'change #regionselect': function(evt) {
         regionname=evt.target.value;
    },
    'change #modeselect': function(evt) {
         modename=evt.target.value;
    },
    
    'submit .addsensor':function(event) {
       event.preventDefault();
      var devicename=event.target.deviceName.value;
      
      
      try{Sensors.insert({ deviceName: devicename, 
                       countryName: countryname,
                          regionname: regionname,
                       modeName: modename,
                      createdAt: new Date() 
                      });
      alert("New device added!");
        event.target.reset();
      } catch (e) {
    console.log(e);
      }},
    
    'change #countryselectchoose': function(evt) {
        countrynamechoose=evt.target.value;
        if(countrynamechoose=="add new")
            {
                document.getElementById("countrynameadd").style.display="block";
                
                
            }
        console.log(countrynamechoose);
    },
    
    'submit .addcountry':function(event) {
       event.preventDefault(); 
        if(countrynamechoose=="add new")
            {
        countrynamechoose=document.getElementById("countrynameadd").value;
            }
       var regionname=event.target.regionnameadd.value;
      try{Locations.insert({ 
                       countryName: countrynamechoose,
                       regionname: regionname,
                      createdAt: new Date() 
                      });
      alert("New location added!");
      document.getElementById("countrynameadd").style.display="none";
      event.target.reset();
          
      } catch (e) {
    console.log(e);
}}
      
  
});



var deviceid; 
var countryname;
Template.updateBlockChainTemp.helpers({
   sensor: function(){
    
    return Sensors.find();
    
 },
    country()
    {
      return _.uniq(Sensors.find({},{sort: {
      countryName: 1}
    }).fetch(), true, doc => {
      return doc.countryName;
    });
    }
    
//    getdevices:function()
//{
//       var index=document.getElementsByClassName("countryselect").selectedIndex;
//       return document.getElementsByClassName("countryselect").options[index].value;
//    
//}
    
});
var lookup={};

var mode;
Template.updateBlockChainTemp.events({
    'change .countryselect': function(evt) {
        var i=0;
    var x=document.getElementsByClassName("regionselect")[0];
        x.innerHTML="<option></option>";
    
        
    countryname=evt.target.value;
    
    var location=Sensors.find({countryName: countryname},{regionname:1,_id:0}).fetch();
    location.forEach(function(){
        var item=location[i].regionname;
        var option=document.createElement("option");
        if(!(item in lookup)) {
        lookup[item] = 1;
        option.text = item;
        x.add(option,x[i]);
        }
        i++;
    });
    
    
    },
    'change .regionselect': function(evt) {
        var i=0;
    var x=document.getElementById("deviceID");
        x.innerHTML="<option></option>";
        
    regionname=evt.target.value;
    
    var location=Sensors.find({countryName: countryname, regionname:regionname},{deviceName:1,_id:0}).fetch();
    location.forEach(function(){
        var item=location[i].deviceName;
        var option=document.createElement("option");
        if(!(item in lookup)) {
        lookup[item] = 1;
        option.text = item;
        x.add(option,x[i]);
        }
        i++;
    });
    },
    'change #deviceID': function(evt) {
        deviceid=evt.target.value;
        mode=Sensors.find({"deviceName" : deviceid},{modeName:1,_id:0}).fetch()[0].modeName;
      
        if(mode=="Air")
            {
               
                document.getElementById("air").style.display="Block";
                document.getElementById("water").style.display="none";
                
            }
        else if(mode=="Water")
            {
                document.getElementById("water").style.display="Block";
                document.getElementById("air").style.display="none";
            }
        
    },
    
  'submit form':function(event) {
       event.preventDefault();
      try{
    if(mode=="Air")
        {
      
           var data41=event.target.data41.value;
              var data51=event.target.data51.value;
      Records.insert({
          Country: countryname,
          Region:regionname,
          deviceID: deviceid,
          record:[
              {Water:"NA"
              },
              {Air:[
              {CO: data41}, 
              {CO2: data51}]
              }, 
          ] ,
          createdAt: new Date()
      });
         
//         myContract.save.sendTransaction(deviceid,data11,data21,data31,{from: web3.eth.coinbase},function(err,res){
//         document.getElementsByName("result")[0].innerHTML="your transaction is: "+res;
//         console.log(res);
//        
//    });
      
      alert("Added new Records from "+deviceid);
       
      
            
        }
      else if(mode=="water")
          {
              var data11=event.target.data11.value;
      
      var data21=event.target.data21.value; 
              
      Records.insert({
          Country: countryname,
          Region:regionname,
          deviceID: deviceid,
          record:[
              {Water:[
              {PH: data11}, 
              {Turbidity: data21}
              ]
              },
              {Air:"NA"
              }, 
          ] ,
          createdAt: new Date()
      });
         
//         myContract.save.sendTransaction(deviceid,data11,data21,data31,{from: web3.eth.coinbase},function(err,res){
//         document.getElementsByName("result")[0].innerHTML="your transaction is: "+res;
//         console.log(res);
//        
//    });
      
      alert("Added new Records from "+deviceid);
        
    
          }
     
     }catch (e) {
    console.log(e);
    }
     event.target.reset();   
      
      }
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
        
            event.target.reset();
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
     event.target.reset();   
}, 
});