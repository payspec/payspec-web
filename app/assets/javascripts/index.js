
const $ = require('jquery');

import logo from '../img/senderclogo.png'
import githubLogo from '../img/GitHub-Mark-64px.png'

import Vue from 'vue'

import AlertRenderer from './alert-renderer'

import HomeRenderer from './home-renderer'
import GenericDashboard from './generic-dashboard'

import InvoiceRenderer from './invoice-renderer'


var genericDashboard = new GenericDashboard();


var alertRenderer = new AlertRenderer();
var homeRenderer;
var invoiceRenderer;
//var invoiceDashboard = new InvoiceDashboard();


var navbar = new Vue({
  el: '#navbar',
  data: {
    brandImageUrl: logo,
    githubLogo: githubLogo
  }
})


$(document).ready(function(){

      if($("#home").length > 0){

        homeRenderer = new HomeRenderer();

        genericDashboard.init(homeRenderer);


      }

      if($("#invoice").length > 0){

        invoiceRenderer = new InvoiceRenderer();

        genericDashboard.init(invoiceRenderer);


      }



});


//dashboardRenderer.hide();
