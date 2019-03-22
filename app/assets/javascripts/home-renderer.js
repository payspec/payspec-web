
const $ = require('jquery');
import Vue from 'vue';



import DashboardRenderer from './dashboard-renderer'

var dashboardRenderer = new DashboardRenderer();


export default class HomeRenderer {

    init( ethHelper )
    {




     setInterval( function(){


         ethHelper.connectToContract( web3 , dashboardRenderer, function(contractData){

           dashboardRenderer.update(contractData);

         } );

      },30 * 1000);




        ethHelper.connectToContract( web3 , dashboardRenderer, function(contractData){

          dashboardRenderer.init(contractData);

        } );






 

      console.log('init home')

    }

     update( )
    {

    }

    hide()
    {

    }

    show()
    {

    }

}
