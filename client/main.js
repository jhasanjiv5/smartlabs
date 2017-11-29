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

ABIarray=[{"constant":true,"inputs":[{"name":"Country","type":"bytes32"}],"name":"showflag","outputs":[{"name":"j","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"index","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"data11","type":"uint16"},{"name":"data12","type":"uint16"},{"name":"data21","type":"uint16"},{"name":"data22","type":"uint16"},{"name":"data31","type":"uint16"},{"name":"data32","type":"uint16"},{"name":"data41","type":"uint16"},{"name":"data42","type":"uint16"}],"name":"updateStandards","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"},{"name":"x41","type":"uint16"}],"name":"compare","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"},{"name":"x11","type":"uint16"},{"name":"x21","type":"uint16"},{"name":"x31","type":"uint16"},{"name":"x41","type":"uint16"}],"name":"save","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"}],"name":"retrievedata","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"uint16"},{"name":"z","type":"uint16"},{"name":"k","type":"uint16"},{"name":"j","type":"uint16"},{"name":"f","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"message","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"retrievestandards","outputs":[{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"},{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"cdata","outputs":[{"name":"flag","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"data","outputs":[{"name":"Country","type":"bytes32"},{"name":"Location","type":"bytes32"},{"name":"deviceID","type":"bytes32"},{"name":"CO","type":"uint16"},{"name":"CO2","type":"uint16"},{"name":"Turbidity","type":"uint16"},{"name":"PH","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

contractAddress="0x5cc1490ef1361107043397c0e4d0de944c9cad5b";

bytedata="6060604052341561000f57600080fd5b60096000806101000a81548161ffff021916908361ffff1602179055506023600060026101000a81548161ffff021916908361ffff16021790555060fa600060046101000a81548161ffff021916908361ffff16021790555061015e600060066101000a81548161ffff021916908361ffff16021790555060008060086101000a81548161ffff021916908361ffff16021790555060056000600a6101000a81548161ffff021916908361ffff16021790555060066000600c6101000a81548161ffff021916908361ffff16021790555060096000600e6101000a81548161ffff021916908361ffff160217905550610f638061010d6000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631b93097a146100a9578063335932fc146100e85780633a81739a1461011f5780635a388f2c146101b957806379b02baf1461021f578063b2166dad146102ac578063d1e8507b1461038d578063db86c5ff146103cc578063edc399b214610466578063f0ba8440146104a5575b600080fd5b34156100b457600080fd5b6100ce60048080356000191690602001909190505061053e565b604051808215151515815260200191505060405180910390f35b34156100f357600080fd5b6101096004808035906020019091905050610573565b6040518082815260200191505060405180910390f35b341561012a57600080fd5b61019f600480803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff16906020019091905050610597565b604051808215151515815260200191505060405180910390f35b34156101c457600080fd5b610205600480803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff16906020019091905050610690565b604051808215151515815260200191505060405180910390f35b341561022a57600080fd5b610292600480803560001916906020019091908035600019169060200190919080356000191690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190803561ffff1690602001909190505061094a565b604051808215151515815260200191505060405180910390f35b34156102b757600080fd5b6102eb6004808035600019169060200190919080356000191690602001909190803560001916906020019091905050610b13565b6040518087600019166000191681526020018661ffff1661ffff1681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff16815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015610374578082015181840152602081019050610359565b5050505090500197505050505050505060405180910390f35b341561039857600080fd5b6103ae6004808035906020019091905050610cdf565b60405180826000191660001916815260200191505060405180910390f35b34156103d757600080fd5b6103df610d03565b604051808961ffff1661ffff1681526020018861ffff1661ffff1681526020018761ffff1661ffff1681526020018661ffff1661ffff1681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff1681526020019850505050505050505060405180910390f35b341561047157600080fd5b61048b600480803560001916906020019091905050610db0565b604051808215151515815260200191505060405180910390f35b34156104b057600080fd5b6104c66004808035906020019091905050610ddb565b604051808860001916600019168152602001876000191660001916815260200186600019166000191681526020018561ffff1661ffff1681526020018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261ffff1661ffff16815260200197505050505050505060405180910390f35b600060036000836000191660001916815260200190815260200160002060000160009054906101000a900460ff169050919050565b60028181548110151561058257fe5b90600052602060002090016000915090505481565b6000886000806101000a81548161ffff021916908361ffff16021790555087600060026101000a81548161ffff021916908361ffff16021790555086600060046101000a81548161ffff021916908361ffff16021790555085600060066101000a81548161ffff021916908361ffff160217905550846000600c6101000a81548161ffff021916908361ffff160217905550836000600e6101000a81548161ffff021916908361ffff16021790555082600060086101000a81548161ffff021916908361ffff160217905550816000600a6101000a81548161ffff021916908361ffff1602179055506001905098975050505050505050565b6000806001905060006001816106a69190610e55565b506000809054906101000a900461ffff1661ffff168661ffff1610806106e35750600060029054906101000a900461ffff1661ffff168661ffff16115b80156106f3575060008661ffff16115b1561074c576001805480600101828161070c9190610e81565b916000526020600020900160007f434f00000000000000000000000000000000000000000000000000000000000090919091509060001916905550600090505b600060049054906101000a900461ffff1661ffff168561ffff1610806107895750600060069054906101000a900461ffff1661ffff168561ffff16115b8015610799575060008561ffff16115b156107f257600180548060010182816107b29190610e81565b916000526020600020900160007f434f32000000000000000000000000000000000000000000000000000000000090919091509060001916905550600090505b600060089054906101000a900461ffff1661ffff168461ffff16108061082f57506000600a9054906101000a900461ffff1661ffff168461ffff16115b801561083f575060008461ffff16115b1561089857600180548060010182816108589190610e81565b916000526020600020900160007f547572626964697479000000000000000000000000000000000000000000000090919091509060001916905550600090505b6000600c9054906101000a900461ffff1661ffff168361ffff1610806108d557506000600e9054906101000a900461ffff1661ffff168361ffff16115b80156108e5575060008361ffff16115b1561093e57600180548060010182816108fe9190610e81565b916000526020600020900160007f504800000000000000000000000000000000000000000000000000000000000090919091509060001916905550600090505b80915050949350505050565b60008061095986868686610690565b90508660046000600280549050815260200190815260200160002060020181600019169055508860046000600280549050815260200190815260200160002060000181600019169055508760046000600280549050815260200190815260200160002060010181600019169055508560046000600280549050815260200190815260200160002060030160006101000a81548161ffff021916908361ffff1602179055508460046000600280549050815260200190815260200160002060030160026101000a81548161ffff021916908361ffff1602179055508360046000600280549050815260200190815260200160002060030160046101000a81548161ffff021916908361ffff1602179055508260046000600280549050815260200190815260200160002060030160066101000a81548161ffff021916908361ffff16021790555080600360008b6000191660001916815260200190815260200160002060000160006101000a81548160ff02191690831515021790555060028054806001018281610ae99190610ead565b91600052602060002090016000600280549050909190915055506001915050979650505050505050565b6000806000806000610b23610ed9565b6000879650600090505b600280549050811015610c5c578960001916600460008381526020019081526020016000206000015460001916148015610b8457508860001916600460008381526020019081526020016000206001015460001916145b8015610bad57508760001916600460008381526020019081526020016000206002015460001916145b15610c4f576004600082815260200190815260200160002060030160009054906101000a900461ffff1695506004600082815260200190815260200160002060030160029054906101000a900461ffff1694506004600082815260200190815260200160002060030160049054906101000a900461ffff1693506004600082815260200190815260200160002060030160069054906101000a900461ffff1692505b8080600101915050610b2d565b610c6886868686610690565b508686868686600180805480602002602001604051908101604052809291908181526020018280548015610cbf57602002820191906000526020600020905b81546000191681526020019060010190808311610ca7575b505050505090509650965096509650965096505093975093979195509350565b600181815481101515610cee57fe5b90600052602060002090016000915090505481565b6000806000806000806000806000809054906101000a900461ffff16600060029054906101000a900461ffff16600060049054906101000a900461ffff16600060069054906101000a900461ffff16600060089054906101000a900461ffff166000600a9054906101000a900461ffff166000600c9054906101000a900461ffff166000600e9054906101000a900461ffff16975097509750975097509750975097509091929394959697565b60036020528060005260406000206000915090508060000160009054906101000a900460ff16905081565b60046020528060005260406000206000915090508060000154908060010154908060020154908060030160009054906101000a900461ffff16908060030160029054906101000a900461ffff16908060030160049054906101000a900461ffff16908060030160069054906101000a900461ffff16905087565b815481835581811511610e7c57818360005260206000209182019101610e7b9190610eed565b5b505050565b815481835581811511610ea857818360005260206000209182019101610ea79190610eed565b5b505050565b815481835581811511610ed457818360005260206000209182019101610ed39190610f12565b5b505050565b602060405190810160405280600081525090565b610f0f91905b80821115610f0b576000816000905550600101610ef3565b5090565b90565b610f3491905b80821115610f30576000816000905550600101610f18565b5090565b905600a165627a7a723058204edceba3284d32afecbf1a211983dd53bedff69a5456b7dde62ac9a45ba59ab80029";

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
  'submit .ranges':function(event) {
       event.preventDefault();
      var data11=event.target.data11.value;
      var data12=event.target.data12.value;
      var data21=event.target.data21.value;
      var data22=event.target.data22.value;
      var data31=event.target.data31.value;
      var data32=event.target.data32.value;
      var data41=event.target.data41.value;
      var data42=event.target.data42.value;
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
      myContract.updateStandards.sendTransaction(data11,data12,data21,data22,data31,data32,data41,data42,{from: web3.eth.coinbase,gas:300000},function(err,res){
        alert("new standards are set and the transaction number is"+res);
          
    });
  }
//  ,
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
//  
});
Template.dashboardTemp.helpers({
    
    standards()
    {
       
            
            return myContract.retrievestandards(
         function(err,res){
            document.getElementsByName("costd")[0].innerHTML="CO between (PPM): "+res[0].c[0]+" & "+res[1].c[0];
          document.getElementsByName("co2std")[0].innerHTML="CO2 between (PPM): "+res[2].c[0]+" & "+res[3].c[0];
         document.getElementsByName("phstd")[0].innerHTML="PH between: "+res[6].c[0]+" & "+res[7].c[0];
         document.getElementsByName("tubiditystd")[0].innerHTML="Turbidity between (NTU): "+res[4].c[0]+" & "+res[5].c[0];
        
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
    
    'submit .addsensor':function(event) {
       event.preventDefault();
      var devicename=event.target.deviceName.value;
      
      
      try{Sensors.insert({ deviceName: devicename, 
                       countryName: countryname,
                          regionname: regionname,
                       
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
        Records.insert({
          Country: countryname,
          Region: regionname,
          deviceID: deviceid,
          record:[
              {Water:[
              {PH: res[4].c[0]}, 
              {Turbidity: res[3].c[0]}
              ]
              },
              {Air:[
              {CO: res[1].c[0]}, 
              {CO2: res[2].c[0]}]
              }, 
          ] ,
          createdAt: new Date()
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