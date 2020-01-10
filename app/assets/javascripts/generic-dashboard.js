
const $ = require('jquery');

import EthHelper from './eth-helper'


var ethHelper;

export default class GenericDashboard {


  init(renderer)
  {
    setInterval( function(){
         renderer.update();

    },5*1000);




    ethHelper = new EthHelper(   );
    ethHelper.init();



    renderer.init( ethHelper );

    ethHelper.bindOnConnected( function() {
        renderer.onWeb3Connected();
      })

  }

}
