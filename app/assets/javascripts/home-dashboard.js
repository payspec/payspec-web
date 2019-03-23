
const $ = require('jquery');

import EthHelper from './eth-helper'


var ethHelper;

export default class HomeDashboard {


  init(renderer)
  {
    setInterval( function(){
         renderer.update();

    },5*1000);




    ethHelper = new EthHelper(   );
    ethHelper.init();

    renderer.init();


  }

}
