# Smart Labs
# Pollution monitoring System using Smart Contracts
# The system is created to help secure the data received from the pollution detection sensor to keep them trustworthy.
#Installation can be done by following the steps on Mac environment mentioned below:
1.  Install Geth (https://geth.ethereum.org/install/) and Meteor (https://www.meteor.com).
2.  Clone the git hub repository (https://github.com/jhasanjiv5/smartlabs.git)
3.  Change  the  directories  according  to  the  downloaded  repository  location  and  runmeteor (meteor)
4.  After installation of Geth create an account by using phrase ”pollution monitoringsystem” in terminal 1,  run (geth –port 30303 –networkid 6666 –datadir=”data” –rpc  –rpcport  8545  –rpcaddr  your  local  ip  address  –rpccorsdomain  ”*” –unlock  0–password=”password.sec” –rpcapi  ”admin,eth,net,web3,personal,miner” –lightserv70)5.  Open a new terminal 2 with same directory location run (geth attach ”http://yourIP address:8545”)
6.  Run (miner.start()) in the terminal 2, One can see the synchronization started onceminer is started
7.  Create the contract (copy the code from the repository) via connected Remix portalover the IPC
8.  Once  the  web  application  is  up  and  running  tun  on  the  sensor  node  and  LoRaGateway
9.  Open the LoRa Gateway using VNC listener (password:  raspberry)10.  Run Geth (geth –light –port 30303 –networkid 6666 –datadir=”data” –rpc –rpcport8545 –rpcaddr your gateway IP address –rpccorsdomain ”*” –unlock 0 –password=”password.sec”–rpcapi ”admin,eth,net,web3,personal”)11.  Run TTN-BC interface (node main.js)
12.  Check for added peers (admin.peers) if not found then connect the peers on Fullnode and Light node (admin.addPeer())
13.  Once the peers are connected data synchronization started can be seen on the lightclient
14.  Console in TTN gives detailed information about incoming traffic (https://console.thethingsnetwork.org)
15.  Login to the Web application to update the data and standards using simple formsadded on the web pages.  The incoming data updates can be seen without authen-tication
# Use the comapnion repository to install Ethereum Light Client on the Lora Gateway or Raspberry Pi 3 (https://github.com/jhasanjiv5/smartlabslightclient.git) 
