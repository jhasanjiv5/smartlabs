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

ABIarray=[{"constant":true,"inputs":[],"name":"Turbhigh","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Country","type":"bytes32"}],"name":"showflag","outputs":[{"name":"j","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Colow","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"details","type":"bytes32[]"},{"name":"recdata","type":"uint256"}],"name":"saveCO2","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"index","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceID","type":"bytes32"}],"name":"retrievedata","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"uint256"},{"name":"z","type":"uint256"},{"name":"k","type":"uint256"},{"name":"j","type":"uint256"},{"name":"f","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Co2low","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Co2high","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Turblow","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PHlow","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Cohigh","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PHhigh","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"cdata","outputs":[{"name":"flag","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"data","outputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"},{"name":"CO","type":"uint256"},{"name":"CO2","type":"uint256"},{"name":"Turbidity","type":"uint256"},{"name":"PH","type":"uint256"},{"name":"message","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"show","type":"event"}];

contractAddress="0x347ebde05207ac9f6756745b27af26b6a476a5ee";

bytedata="6060604052341561000f57600080fd5b6107e28061001e6000396000f3006060604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063016dd30c146100d55780631b93097a146101065780631ea88bff146101455780633059338414610176578063335932fc146101f15780636b29ea64146102285780637e29548714610296578063a3a7f02e146102c7578063b4eb4ec1146102f8578063bd2d068314610329578063c0679aa41461035a578063d8bbd3271461038b578063edc399b2146103bc578063f0ba8440146103fb575b600080fd5b34156100e057600080fd5b6100e8610483565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561011157600080fd5b61012b600480803560001916906020019091905050610488565b604051808215151515815260200191505060405180910390f35b341561015057600080fd5b6101586104bd565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561018157600080fd5b6101d76004808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190919050506104c2565b604051808215151515815260200191505060405180910390f35b34156101fc57600080fd5b61021260048080359060200190919050506105c2565b6040518082815260200191505060405180910390f35b341561023357600080fd5b61024d6004808035600019169060200190919050506105e6565b6040518087600019166000191681526020018681526020018581526020018481526020018381526020018260001916600019168152602001965050505050505060405180910390f35b34156102a157600080fd5b6102a96106d3565b604051808261ffff1661ffff16815260200191505060405180910390f35b34156102d257600080fd5b6102da6106d8565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561030357600080fd5b61030b6106de565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561033457600080fd5b61033c6106e3565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561036557600080fd5b61036d6106e8565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561039657600080fd5b61039e6106ed565b604051808261ffff1661ffff16815260200191505060405180910390f35b34156103c757600080fd5b6103e16004808035600019169060200190919050506106f2565b604051808215151515815260200191505060405180910390f35b341561040657600080fd5b61041c600480803590602001909190505061071d565b6040518089600019166000191681526020018860001916600019168152602001876000191660001916815260200186815260200185815260200184815260200183815260200182600019166000191681526020019850505050505050505060405180910390f35b600581565b600060016000836000191660001916815260200190815260200160002060000160009054906101000a900460ff169050919050565b600981565b600060fa61ffff168210806104dc575061015e61ffff1682115b80156104e85750600082115b15610531577f434f322076696f6c6174696f6e20666f756e6400000000000000000000000000600260008080549050815260200190815260200160002060070181600019169055505b82600281518110151561054057fe5b9060200190602002015160026000808054905081526020019081526020016000206002018160001916905550816002600080805490508152602001908152602001600020600401819055506000805480600101828161059f9190610765565b916000526020600020900160008080549050909190915055506001905092915050565b6000818154811015156105d157fe5b90600052602060002090016000915090505481565b6000806000806000806000879650600090505b6000805490508110156106b757876000191660026000838152602001908152602001600020600201546000191614156106aa5760026000828152602001908152602001600020600301549550600260008281526020019081526020016000206004015494506002600082815260200190815260200160002060050154935060026000828152602001908152602001600020600601549250600260008281526020019081526020016000206007015491505b80806001019150506105f9565b8686868686869650965096509650965096505091939550919395565b60fa81565b61015e81565b600081565b600681565b602381565b600981565b60016020528060005260406000206000915090508060000160009054906101000a900460ff16905081565b60026020528060005260406000206000915090508060000154908060010154908060020154908060030154908060040154908060050154908060060154908060070154905088565b81548183558181151161078c5781836000526020600020918201910161078b9190610791565b5b505050565b6107b391905b808211156107af576000816000905550600101610797565b5090565b905600a165627a7a72305820a06fad5492f57acc790f2d82500dea3a802326435de7760a9766a87155e5a5360029";

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
            //event.preventDefault();
            document.getElementsByClassName("mapdataclass")[0].style.display="none"; 
            document.getElementById("world-map").style.display="block";
            Meteor._reload.reload();
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
//  'submit .ranges':function(event) {
//       event.preventDefault();
//      var data11=event.target.data11.value;
//      var data12=event.target.data12.value;
//      var data21=event.target.data21.value;
//      var data22=event.target.data22.value;
//      var data31=event.target.data31.value;
//      var data32=event.target.data32.value;
//      try {
//      Standards.insert({
//          CO:{up: data11,low: data12}, 
//          CO2:{up: data21,low: data22}, 
//          PH:{up: data31,low: data32},
//          Turbidity:{up: data41,low: data42}
//          
//      });
//    
//      console.log("New standards are set!");
//  } catch (e) {
//   console.log(e);
//      }
//      myContract.store.sendTransaction(data12,data11,data22,data21,data32,data31,{from: web3.eth.coinbase},function(err,res){
//        console.log(res);
//          
//    });
//  },
//    'submit .show':function(event) {
//    event.preventDefault();
//    var deviceid=event.target.SensorID.value;
//     
//    myContract.retrievedata(deviceid,function(err,res){
//        
//         document.getElementsByName("DATA")[0].innerHTML="recorded: <br/> CO: "+res[1].c[0]+"<br/>CO2: "+res[2].c[0]+"<br/>PH: "+res[4].c[0]+"<br/>Turbidity: "+res[3].c[0];
//        
//       
//        
//        
//    });
//     }  
  
});
Template.dashboardTemp.helpers({
    
    standards()
    {
       
            
            return myContract.Co2low(
         function(err,res){
            document.getElementsByName("costd")[0].innerHTML="CO between (PPM): "+myContract.Colow()+" & "+myContract.Cohigh();
          document.getElementsByName("co2std")[0].innerHTML="CO2 between (PPM): "+myContract.Co2low()+" & "+myContract.Co2high();
         document.getElementsByName("phstd")[0].innerHTML="PH between: "+myContract.PHlow()+" & "+myContract.PHhigh();
         document.getElementsByName("tubiditystd")[0].innerHTML="Turbidity between (NTU): "+myContract.Turblow()+" & "+myContract.Turbhigh();
        
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
var regionname;
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
    
    
  'submit .update':function(event) {
       event.preventDefault();
      try{
          var data41;
            var data51;
            var data11=0;
            var data21=0;
            if(event.target.data41.value=="")
                {
                    data41=0;
                }
            else
                {
                  
           data41=event.target.data41.value;
                }
            if(event.target.data51.value=="")
                {
                    data51=0;
                }
            else
                {
                  
           data51=event.target.data51.value;
                }
           
        
            
      Records.insert({
          Country: countryname,
          Region: regionname,
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
         var details=[countryname,regionname,deviceid];
            
         console.log(details);
         
         myContract.saveCO2(details,data41,{from:web3.eth.coinbase},function(err,res){
         document.getElementsByName("result")[0].innerHTML="your transaction hex is: "+res;
        });
         
            
      //alert("Added new Records from "+deviceid);
//          document.getElementsByName("result")[0].innerHTML+=web3.eth.getTransactionReceipt(tx);
          
          
 //        myContract.retrievedata(countryname, regionname, deviceid,     
//         function(err,res){
//                 
//                document.getElementsByName("result")[0].innerHTML+=" <br/> The data saved on Blockchain is: <br/>CO: "+res[1].c[0]+"<br/>CO2: "+res[2].c[0];
//             var msg;
//                
////                if(res[5].length>0)
////                    {
////                        res[5].forEach(function(data)
////                        {
////                        document.getElementsByName("result")[0].innerHTML+="Standard violation detected for "+hex_to_ascii(data)+"<br />";
////                        });
////                    }
//             
//         });    
            
//    if(mode=="Air")
//        {
//            var data41;
//            var data51;
//            var data11=0;
//            var data21=0;
//            if(event.target.data41.value=="")
//                {
//                    data41=0;
//                }
//            else
//                {
//                  
//           data41=event.target.data41.value;
//                }
//            if(event.target.data51.value=="")
//                {
//                    data51=0;
//                }
//            else
//                {
//                  
//           data51=event.target.data51.value;
//                }
//           
//        
//            
//      Records.insert({
//          Country: countryname,
//          Region: regionname,
//          deviceID: deviceid,
//          record:[
//              {Water:"NA"
//              },
//              {Air:[
//              {CO: data41}, 
//              {CO2: data51}]
//              }, 
//          ] ,
//          createdAt: new Date()
//      });
//         console.log(countryname, regionname, deviceid,data41,data51);
//         
//         myContract.save.sendTransaction(countryname,regionname,deviceid,data41,data51,data21,data11,{from: web3.eth.coinbase},function(err,res){
//         document.getElementsByName("result")[0].innerHTML="your transaction hex is: "+res;
//         console.log(err);
//             
//        });
//            
//      alert("Added new Records from "+deviceid);
//       
//    
//        myContract.retrievedata(countryname, regionname, deviceid,
//         function(err,res){
//                 
//                document.getElementsByName("result")[0].innerHTML+=" <br/> The data saved on Blockchain is: <br/>CO: "+res[1].c[0]+"<br/>CO2: "+res[2].c[0];
//             var msg;
//                
//                if(res[5].length>0)
//                    {
//                        res[5].forEach(function(data)
//                        {
//                        document.getElementsByName("result")[0].innerHTML+="Standard violation detected for "+hex_to_ascii(data)+"<br />";
//                        });
//                    }
//             
//         });    
//            
//        }
//      else if(mode=="water")
//          {
//              var data11;
//            var data21;
//               var data41=0;
//            var data51=0;
//            if(event.target.data11.value=="")
//                {
//                    data11=0;
//                }
//            else
//                {
//                  
//           data41=event.target.data11.value;
//                }
//            if(event.target.data21.value=="")
//                {
//                    data21=0;
//                }
//            else
//                {
//                  
//           data51=event.target.data21.value;
//                }
//           
//              
//      Records.insert({
//          Country: countryname,
//          Region:regionname,
//          deviceID: deviceid,
//          record:[
//              {Water:[
//              {PH: data11}, 
//              {Turbidity: data21}
//              ]
//              },
//              {Air:"NA"
//              }, 
//          ] ,
//          createdAt: new Date()
//      });
//         
//         myContract.save.sendTransaction(countryname, regionname, deviceid,data41,data51,data21,data11,{from: web3.eth.coinbase},function(err,res){
//         //document.getElementsByName("result")[0].innerHTML="your transaction number is: "+res;
//         console.log(res);     
//        
//    });
//          myContract.retrievedata(countryname, regionname, deviceid,
//         function(err,res){
//             
//                document.getElementsByName("result")[0].innerHTML+=" <br/> The data saved on Blockchain is: <br/>PH: "+res[3].c[0]+"<br/>Turbidity: "+res[4].c[0]+"<br/>";
//             var msg;
//                
//                if(res[5].length>0)
//                    {
//                        res[5].forEach(function(data)
//                        {
//                        document.getElementsByName("result")[0].innerHTML+="Standard violation detected for "+hex_to_ascii(data)+"<br />";
//                        });
//                    }
//             
//         });      
//        
//      
//      alert("Added new Records from "+deviceid);
//        
//    
//          }
     
     }catch (e) {
    console.log(e);
    }
     
     
      
      },
    'change .countryselect2': function(evt) {
        var i=0;
    var x=document.getElementsByClassName("regionselect2")[0];
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
    'change .regionselect2': function(evt) {
        var i=0;
    var x=document.getElementById("deviceID2");
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
    'change #deviceID2': function(evt) {
        deviceid=evt.target.value;
         
    },
    'submit .show':function(event) {
    event.preventDefault();
    
     
    myContract.retrievedata(deviceid,function(err,res){
        
         document.getElementsByName("data")[0].innerHTML="recorded: <br/> CO: "+res[1].c[0]+"<br/>CO2: "+res[2].c[0]+"<br/>PH: "+res[4].c[0]+"<br/>Turbidity: "+res[3].c[0]+"<br/>Comment: "+hex_to_ascii(res[5]);
        
       
        
        
    });
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
       Meteor._reload.reload();
       
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