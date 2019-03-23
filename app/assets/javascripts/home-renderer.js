
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

var jumbotron;
var stats;
var packetslist;
var queuedtxlist;

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







         stats = new Vue({
              el: '#stats',
              data:{
                relayData: {}
               }
            });

            packetslist = new Vue({
                 el: '#packetslist',
                 data:{
                   list: []
                  }
               });

           queuedtxlist = new Vue({
                el: '#queuedtx',
                data:{
                  list: []
                 }
              });



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


     update(renderData)
    {



    }



}
