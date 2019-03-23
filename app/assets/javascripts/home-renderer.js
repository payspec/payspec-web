
const $ = require('jquery');
import Vue from 'vue';



//const relayConfig = require('../../../relay.config').config
var io = require('socket.io-client');


var app;
var dashboardData;


var nametagInput;

var jumbotron;
var stats;
var packetslist;
var queuedtxlist;

export default class HomeRenderer {

    init(   )
    {

      var self = this;




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




     update(renderData)
    {



    }



}
