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

ABIarray=[{"constant":true,"inputs":[],"name":"Turbhigh","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Country","type":"bytes32"}],"name":"showflag","outputs":[{"name":"j","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Colow","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"index","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"},{"name":"x41","type":"uint16"}],"name":"compare","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"},{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"},{"name":"x41","type":"uint16"}],"name":"save","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Co2low","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Co2high","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"}],"name":"retrievedata","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"uint16"},{"name":"z","type":"uint16"},{"name":"k","type":"uint16"},{"name":"j","type":"uint16"},{"name":"f","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Turblow","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PHlow","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Cohigh","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"message","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PHhigh","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"retrievestandards","outputs":[{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"cdata","outputs":[{"name":"flag","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"data","outputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"},{"name":"CO","type":"uint16"},{"name":"CO2","type":"uint16"},{"name":"Turbidity","type":"uint16"},{"name":"PH","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"}];

contractAddress="0x4c1fe53fe9547349d3cfab6f752d6e12df3c50db";

bytedata="6060604052341561000f57600080fd5b610ee18061001e6000396000f3006060604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063016dd30c146100f65780631b93097a146101275780631ea88bff14610166578063335932fc146101975780635a388f2c146101ce57806379b02baf146102345780637e295487146102c1578063a3a7f02e146102f2578063b2166dad14610323578063b4eb4ec114610404578063bd2d068314610435578063c0679aa414610466578063d1e8507b14610497578063d8bbd327146104d6578063db86c5ff14610507578063edc399b2146105a1578063f0ba8440146105e0575b600080fd5b341561010157600080fd5b610109610679565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561013257600080fd5b61014c60048080356000191690602001909190505061067e565b604051808215151515815260200191505060405180910390f35b341561017157600080fd5b6101796106b3565b604051808261ffff1661ffff16815260200191505060405180910390f35b34156101a257600080fd5b6101b860048080359060200190919050506106b8565b6040518082815260200191505060405180910390f35b34156101d957600080fd5b61021a600480803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff169060200190919050506106dc565b604051808215151515815260200191505060405180910390f35b341561023f57600080fd5b6102a7600480803560001916906020019091908035600019169060200190919080356000191690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190505061091f565b604051808215151515815260200191505060405180910390f35b34156102cc57600080fd5b6102d4610ae8565b604051808261ffff1661ffff16815260200191505060405180910390f35b34156102fd57600080fd5b610305610aed565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561032e57600080fd5b6103626004808035600019169060200190919080356000191690602001909190803560001916906020019091905050610af3565b6040518087600019166000191681526020018661ffff1661ffff1681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff16815260200180602001828103825283818151815260200191508051906020019060200280838360005b838110156103eb5780820151818401526020810190506103d0565b5050505090500197505050505050505060405180910390f35b341561040f57600080fd5b610417610cbf565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561044057600080fd5b610448610cc4565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561047157600080fd5b610479610cc9565b604051808261ffff1661ffff16815260200191505060405180910390f35b34156104a257600080fd5b6104b86004808035906020019091905050610cce565b60405180826000191660001916815260200191505060405180910390f35b34156104e157600080fd5b6104e9610cf2565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561051257600080fd5b61051a610cf7565b604051808961ffff1661ffff1681526020018861ffff1661ffff1681526020018761ffff1661ffff1681526020018661ffff1661ffff1681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff1681526020019850505050505050505060405180910390f35b34156105ac57600080fd5b6105c6600480803560001916906020019091905050610d2e565b604051808215151515815260200191505060405180910390f35b34156105eb57600080fd5b6106016004808035906020019091905050610d59565b604051808860001916600019168152602001876000191660001916815260200186600019166000191681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff16815260200197505050505050505060405180910390f35b600581565b600060026000836000191660001916815260200190815260200160002060000160009054906101000a900460ff169050919050565b600981565b6001818154811015156106c757fe5b90600052602060002090016000915090505481565b60008060019050600080816106f19190610dd3565b50600961ffff168661ffff1610806107115750602361ffff168661ffff16115b8015610721575060008661ffff16115b1561077a576000805480600101828161073a9190610dff565b916000526020600020900160007f434f00000000000000000000000000000000000000000000000000000000000090919091509060001916905550600090505b60fa61ffff168561ffff16108061079a575061015e61ffff168561ffff16115b80156107aa575060008561ffff16115b1561080357600080548060010182816107c39190610dff565b916000526020600020900160007f434f32000000000000000000000000000000000000000000000000000000000090919091509060001916905550600090505b600061ffff168461ffff1610806108225750600561ffff168461ffff16115b8015610832575060008461ffff16115b1561088b576000805480600101828161084b9190610dff565b916000526020600020900160007f547572626964697479000000000000000000000000000000000000000000000090919091509060001916905550600090505b600661ffff168361ffff1610806108aa5750600961ffff168361ffff16115b80156108ba575060008361ffff16115b1561091357600080548060010182816108d39190610dff565b916000526020600020900160007f504800000000000000000000000000000000000000000000000000000000000090919091509060001916905550600090505b80915050949350505050565b60008061092e868686866106dc565b90508660036000600180549050815260200190815260200160002060020181600019169055508860036000600180549050815260200190815260200160002060000181600019169055508760036000600180549050815260200190815260200160002060010181600019169055508560036000600180549050815260200190815260200160002060030160006101000a81548161ffff021916908361ffff1602179055508460036000600180549050815260200190815260200160002060030160026101000a81548161ffff021916908361ffff1602179055508360036000600180549050815260200190815260200160002060030160046101000a81548161ffff021916908361ffff1602179055508260036000600180549050815260200190815260200160002060030160066101000a81548161ffff021916908361ffff16021790555080600260008b6000191660001916815260200190815260200160002060000160006101000a81548160ff02191690831515021790555060018054806001018281610abe9190610e2b565b91600052602060002090016000600180549050909190915055506001915050979650505050505050565b60fa81565b61015e81565b6000806000806000610b03610e57565b6000879650600090505b600180549050811015610c3c578960001916600360008381526020019081526020016000206000015460001916148015610b6457508860001916600360008381526020019081526020016000206001015460001916145b8015610b8d57508760001916600360008381526020019081526020016000206002015460001916145b15610c2f576003600082815260200190815260200160002060030160009054906101000a900461ffff1695506003600082815260200190815260200160002060030160029054906101000a900461ffff1694506003600082815260200190815260200160002060030160049054906101000a900461ffff1693506003600082815260200190815260200160002060030160069054906101000a900461ffff1692505b8080600101915050610b0d565b610c48868686866106dc565b508686868686600080805480602002602001604051908101604052809291908181526020018280548015610c9f57602002820191906000526020600020905b81546000191681526020019060010190808311610c87575b505050505090509650965096509650965096505093975093979195509350565b600081565b600681565b602381565b600081815481101515610cdd57fe5b90600052602060002090016000915090505481565b600981565b6000806000806000806000806009602360fa61015e6000600560066009975097509750975097509750975097509091929394959697565b60026020528060005260406000206000915090508060000160009054906101000a900460ff16905081565b60036020528060005260406000206000915090508060000154908060010154908060020154908060030160009054906101000a900461ffff16908060030160029054906101000a900461ffff16908060030160049054906101000a900461ffff16908060030160069054906101000a900461ffff16905087565b815481835581811511610dfa57818360005260206000209182019101610df99190610e6b565b5b505050565b815481835581811511610e2657818360005260206000209182019101610e259190610e6b565b5b505050565b815481835581811511610e5257818360005260206000209182019101610e519190610e90565b5b505050565b602060405190810160405280600081525090565b610e8d91905b80821115610e89576000816000905550600101610e71565b5090565b90565b610eb291905b80821115610eae576000816000905550600101610e96565b5090565b905600a165627a7a723058207222b50693796a6c539f605db7d56e772be14934f17080ae7965b3fa0e15c24d0029";

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
        
               
          
        
    },
    
    
  'submit .update':function(event) {
       event.preventDefault();
      try{
          var data41;
            var data51;
          var data11;
              var data21;
            if(event.target.data11.value=="")
                {
                    data11=0;
                }
            else
                {
                  
           data11=event.target.data11.value;
                }
            if(event.target.data21.value=="")
                {
                    data21=0;
                }
            else
                {
                  
           data21=event.target.data21.value;
                }
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
              {Water:[
              {PH: data11}, 
              {Turbidity: data21}
              ]
              },
              {Air:[
              {CO: data41}, 
              {CO2: data51}]
              }, 
          ] ,
          createdAt: new Date()
      });
        
            
        
         myContract.save.sendTransaction(countryname,regionname,deviceid,data41,data51,data21,data11,{from:web3.eth.coinbase, gas:300000},function(err,res){
         document.getElementsByName("result")[0].innerHTML="your transaction is: "+res;
        });
         
            

     
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
    
     
    myContract.retrievedata(countryname,regionname,deviceid,function(err,res){
                 document.getElementsByName("data")[0].innerHTML="recorded: <br/> CO: "+res[1].c[0]+"<br/>CO2: "+res[2].c[0]+"<br/>PH: "+res[4].c[0]+"<br/>Turbidity: "+res[3].c[0]+"<br/>Comments: ";
                 res[5].forEach(function(data){
                     document.getElementsByName("data")[0].innerHTML+="<p style='color:red'>violation found in "+hex_to_ascii(data)+" value</p>";
                 });
        
        
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