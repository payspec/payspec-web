
const $ = require('jquery');

import logo from '../img/nametaglogo.png'
import githubLogo from '../img/GitHub-Mark-64px.png'

import Vue from 'vue'

import AlertRenderer from './alert-renderer'

import HomeRenderer from './home-renderer'

import HomeDashboard from './home-dashboard'



var alertRenderer = new AlertRenderer();
var homeRenderer;
var homeDashboard = new HomeDashboard();


var navbar = new Vue({
  el: '#navbar',
  data: {
    brandImageUrl: logo,
    githubLogo: githubLogo
  }
})


$(document).ready(function(){

      if($("#home").length > 0){
      //  var web3 = ethHelper.init( alertRenderer);

        homeRenderer = new HomeRenderer();

        homeDashboard.init(homeRenderer);


      }



});


//dashboardRenderer.hide();
