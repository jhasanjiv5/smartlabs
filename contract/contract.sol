pragma solidity ^0.4.10;

contract setStandards{
    
    uint16 Colow;
    uint16 Cohigh;
    uint16 Co2low;
    uint16 Co2high;
    uint16 Turblow;
    uint16 Turbhigh;
    uint16 PHlow;
    uint16 PHhigh;
   
    
    bytes32[] public message;
    
    uint[] public index;
    
  
    struct receiveddata{
    bytes32 Country;
    bytes32 Location;
    bytes32 deviceID;
    uint16 CO;
    uint16 CO2;
    uint16 Turbidity;
    uint16 PH;
    }
    
    struct countryflag{
    bool flag;
    }
    
   function setStandards() public{
        Colow=9;
        Cohigh=35;
        Co2low=250;
        Co2high=350;
        Turblow=0;
        Turbhigh=5;
        PHlow=6;
        PHhigh=9;
   
   }
   function updateStandards(uint16 data11,uint16 data12,uint16 data21,uint16 data22,uint16 data31,uint16 data32,uint16 data41,uint16 data42) public returns(bool success)
   {
       Colow=data11;
        Cohigh=data12;
        Co2low=data21;
        Co2high=data22;
        PHlow=data31;
        PHhigh=data32;
        Turblow=data41;
        Turbhigh=data42;
        return true;
        
   }
    mapping(bytes32=>countryflag) public cdata;
    mapping(uint=>receiveddata) public data;
    
    function retrievestandards() public constant
    returns(uint16 ,uint16 ,uint16 ,uint16, uint16 ,uint16 ,uint16 ,uint16 )
    {
        
        return(Colow,Cohigh,Co2low,Co2high,Turblow,Turbhigh,PHlow,PHhigh);
     
    
    }
    function showflag(bytes32 Country) public constant
    returns(bool j)
    {
        return cdata[Country].flag;
       
    }
    function compare(uint16 x11,uint16 x21,uint16 x31,uint16 x41) public returns(bool success)
    {
        bool i=true;
        message.length=0;
        
        if((x11<Colow||x11>Cohigh)&&x11>0)
        {   
           message.push("CO");
           i=false;
        }
        if((x21<Co2low||x21>Co2high)&&x21>0)
        {
           message.push("CO2");
           i=false;
        }
        if((x31<Turblow||x31>Turbhigh)&&x31>0)
        {
         message.push("Turbidity");
           i=false;
        }
        if((x41<PHlow||x41>PHhigh)&&x41>0)
        {
           message.push("PH");
           i=false;
        }
        return i;
    }
    function save(bytes32 Country,bytes32 Location,bytes32 deviceID,uint16 x11,uint16 x21,uint16 x31,uint16 x41) public returns(bool success)
    {
        bool i=compare(x11,x21,x31,x41);
        
        data[index.length].deviceID=deviceID;
        data[index.length].Country=Country;
        data[index.length].Location=Location;
        data[index.length].CO=x11;
        data[index.length].CO2=x21;
        data[index.length].Turbidity=x31;
        data[index.length].PH=x41;
        cdata[Country].flag=i; 
        index.push(index.length);

        return true;
        
    }
    function retrievedata(bytes32 Country,bytes32 Location,bytes32 deviceID) public constant
    returns(bytes32 x,uint16 y,uint16 z,uint16 k, uint16 j,bytes32[] f)
    {
        x=deviceID;
        
        for(uint i=0;i<index.length;i++){
           if((data[i].Country==Country)&&(data[i].Location==Location)&&(data[i].deviceID==deviceID))
        {
        y=data[i].CO;
        z=data[i].CO2;
        k=data[i].Turbidity;
        j=data[i].PH;
        
        }
        
        }
        compare(y,z,k,j);
        return(x,y,z,k,j,message); 
    }
}