pragma solidity ^0.4.0;
/*contract owned{
   function owned(){
        owner=msg.sender;
        }
    address owner;
    modifier onlyOwner{
        require(msg.sender==owner);
        _;
    }
}*/
contract setStandards{
    uint16 Tlow;
    uint16 Thigh;
    uint16 Olow;
    uint16 Ohigh;
    uint16 Nlow;
    uint16 Nhigh;
    function store(uint16 data11,uint16 data12,uint16 data21,uint16 data22,uint16 data31,uint16 data32) public returns(bool success)
    {
         Tlow=data11;
         Thigh=data12;
         Olow=data21;
         Ohigh=data22;
         Nlow=data31;
         Nhigh=data32;
         return true;
    }
    
    struct receiveddata{
    uint16 T;
    
    uint16 O;
   
    uint16 N;
    
    }
    mapping(bytes32=>receiveddata) public data;
    function save(bytes32 key,uint16 x11,uint16 x21,uint16 x31) public returns(bool flag)
    {
        if(x11<Tlow||x11>Thigh)
        {
            return false;
        }
        if(x21<Olow||x21>Ohigh)
        {
            return false;
        }
        if(x31<Nlow||x31>Nhigh)
        {
            return false;
        }
        data[key].T=x11;
        data[key].O=x21;
        data[key].N=x31;
        return true;
    }
    function retrievedata(bytes32 key) public constant
    returns(bytes32 x,uint16 y,uint16 z,uint16 k)
    {
        x=key;
        y=data[key].T;
        z=data[key].O;
        k=data[key].N;
        return(x,y,z,k);
    }
    function retrievestandards() public constant
    returns(uint16 a,uint16 b,uint16 c,uint16 d,uint16 e,uint16 f)
    {
        a=Tlow;
        b=Thigh;
        c=Olow;
        d=Ohigh;
        e=Nlow;
        f=Nhigh;
        return(a,b,c,d,e,f);
    }
}