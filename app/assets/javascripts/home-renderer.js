
const $ = require('jquery');
import Vue from 'vue';



//const relayConfig = require('../../../relay.config').config
//var io = require('socket.io-client');
var web3Utils = require('web3-utils')
var BigNumber = require('bignumber.js')
var ethereumHelper;


const ContractInterface = require('./contract-interface')

var app;
var dashboardData;


var nametagInput;
var namesList;

var jumbotron;
var stats;


export default class HomeRenderer {

    init( ethHelper  )
    {

      var self = this;
      ethereumHelper = ethHelper;



    /*  var current_hostname = window.location.hostname;

      var port =  4000;

      const socketServer = 'http://'+current_hostname+':'+port;

      const options = {transports: ['websocket'], forceNew: true};
      this.socket = io(socketServer, options);


      // Socket events
      this.socket.on('connect', () => {
        console.log('connected to socket.io server');
      });


      this.socket.on('disconnect', () => {
        console.log('disconnected from socket.io server');
      });





      this.socket.on('lavaPackets', function (data) {

          console.log('lava packets ', data )

          Vue.set(packetslist, 'list',  data )

      });

      this.socket.on('queuedTx', function (data) {

          console.log('queued lava packets ', data )

          Vue.set(queuedtxlist, 'list',  data )

      });
*/


      nametagInput = new Vue({
          el: '#nametag-input',
          data: {
             inputName: '',
             showAvailability: false,
             nametagAvailable: true
          },
          methods: {
                keyUp: function (event) {
                   Vue.set(nametagInput, 'showAvailability', false)
                },
                inputChange: function (event) {
                  console.log('input change',  this.inputName, event)

                  self.checkNameAvailability( this.inputName );
                },
                onSubmit: function (event){

                  self.claimName( this.inputName )
                }
            }
        })




            namesList = new Vue({
                 el: '#nameslist',
                 data:{
                   list: []
                  }
               });





              self.updateNamesList()

              setInterval(function(){ self.updateNamesList()   },8000)

    }

    async claimName(name)
    {
      var web3 = ethereumHelper.getWeb3Instance();

      var env = 'mainnet'

      var connectedAddress = ethereumHelper.getConnectedAccountAddress()

      var nametagContract = ContractInterface.getNametagContract(web3,env)

      var response =  await new Promise(function (result,error) {
         nametagContract.claimToken.sendTransaction(connectedAddress,name, function(err,res){
            if(err){ return error(err)}

            result(res);
         })
       });


    }

    async checkNameAvailability(name)
    {



      var web3 = ethereumHelper.getWeb3Instance();

       if(!web3) return;

      var env = 'mainnet'

      var nametagContract = ContractInterface.getNametagContract(web3,env)

      console.log(name)

      var tokenIdRaw =  await new Promise(function (result,error) {
         nametagContract.nameToTokenId.call(name, function(err,res){
            if(err){ return error(err)}

            result(res);
         })
       });

       var tokenIdNumber =  new BigNumber(tokenIdRaw).toFixed();

        console.log(  tokenIdNumber  )

        var tokenOwnerAddress =  await new Promise(function (result,error) {
           nametagContract.ownerOf.call(tokenIdNumber, function(err,res){
              if(err){ return error(err)}

              result(res);
           })
         });

         var hasOwner = tokenOwnerAddress && tokenOwnerAddress != '0x'
           console.log(  hasOwner  )

           Vue.set(nametagInput, 'nametagAvailable', !hasOwner)
           Vue.set(nametagInput, 'showAvailability', true)



    }

    async updateNamesList()
    {


      var web3 = ethereumHelper.getWeb3Instance();

       if(!web3) return;




      var env = 'mainnet'

      var nametagContract = ContractInterface.getNametagContract(web3,env)
      console.log('update names list', nametagContract)

      /*nametagContract.Transfer({from:'0x0000000000000000000000000000000000000000000000000000000000000000'}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
            if (error)
              console.log('Error in myEvent event handler: ' + error);
            else
              console.log('myEvent: ' + JSON.stringify(eventResult.args));
          });*/

          var currentEthBlock = await ethereumHelper.getCurrentEthBlockNumber()

      /*  var events = nametagContract.allEvents({fromBlock: (currentEthBlock-200) }, function(error, log){
             if (error) {
               console.error(error);
               return
             }
               console.log(log);
            });


          web3.eth.filter({fromBlock: (currentEthBlock-200), address: nametagContract.address },function(e,r){

            if (e) {
              console.error(e);
              return
            }
              console.log(r);
          })*/

        /*  const _MINT_TOPIC = "0xcf6fbb9dcea7d07263ab4f5c3a92f53af33dffc421d9d121e1c74b307e68189d";
          web3.eth.filter({
            fromBlock: (currentEthBlock-3000),
                toBlock: currentEthBlock,
                address: '0xb6ed7644c69416d67b522e20bc294a9a9b405b31',
                topics: [_MINT_TOPIC, null],
          }, function(error,result)  {
            console.log(error)
             console.log("got filter results:", result, "transactions");

           });*/

           const _CONTRACT_ADDRESS = "0x3c642be0bb6cb9151652b999b26d80155bcea7de"
           const _TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

           var recentNames = []

           await web3.eth.filter({
             fromBlock: (currentEthBlock-3000),
                 toBlock: currentEthBlock,
                 address: _CONTRACT_ADDRESS,
                 topics: [_TRANSFER_TOPIC, null],
           }, async function(error,result)  {

              var fromAddress = result.topics[1];
              var toAddress = result.topics[2];
              var tokenIdHex = result.topics[3];
              var tokenIdNumber =  new BigNumber(tokenIdHex).toFixed();


          //    var tokenName = await nametagContract.tokenURI.call( )

              var tokenName =  await new Promise(function (result,error) {
                 nametagContract.tokenURI.call(tokenIdNumber, function(err,res){
                    if(err){ return error(err)}

                    result(res);
                 })
               });



              if(fromAddress == '0x0000000000000000000000000000000000000000000000000000000000000000')
              {
                var nameData = {
                  to:  toAddress,
                  tokenIdHex: tokenIdHex,
                  tokenIdNumber: tokenIdNumber,
                  tokenName: tokenName,
                  tokenURL: 'https://etherscan.io/token/'+_CONTRACT_ADDRESS+'?a='+tokenIdNumber
                }



                console.log('learned', nameData)

                recentNames.push(nameData)

              }

            });

          Vue.set(namesList, 'list', recentNames)


    }

     update(renderData)
    {



    }



}
