
const $ = require('jquery');
import Vue from 'vue';



var QRCode = require('qrcode')
var qrcodecanvas = document.getElementById('qr-code-canvas')

const ContractInterface = require('./contract-interface')

var invoiceData;
var payInvoiceInput;


export default class InvoiceRenderer {



    init( ethHelper, params )
    {
      this.ethHelper = ethHelper;
      this.params = params;


      //initEthContainer()


    }

    update()
    {

    }

    async onWeb3Connected() //from eth helper callback
    {
      console.log(' on web3 !!')

        this.generateQRCode()

        this.initInvoiceDataTable()

        Vue.set(payInvoiceInput, 'web3connected', true)




    }

    async initInvoiceDataTable()
    {

      invoiceData = new Vue({
          el: '#invoice-data',
          data: {
             invoiceUUID: this.params.uuid,
             description: '',
             referenceNumber: '',
             recipientAddress: '',
             tokenAddress: '',
             tokenAmount: '',
             alreadyPaid: false,
          },
          methods: {
                keyUp: function (event) {
                   //Vue.set(createInvoiceInput, 'showAvailability', false)
                },
                inputChange: function (event) {
                  console.log('input change',  this.inputName, event)

                //  self.checkNameAvailability( this.inputName );
                },
                onSubmitNewInvoice: function (event){
                  console.log('pay invoice ', this.invoiceUUID)
                  //self.claimName( this.inputName )



                  self.payInvoice( this.invoiceUUID )
                }
            }
        })




                payInvoiceInput = new Vue({
                    el: '#pay-invoice-input',
                    data: {
                       invoiceUUID: this.params.uuid,


                       web3connected: false
                    },
                    methods: {
                          keyUp: function (event) {
                             //Vue.set(createInvoiceInput, 'showAvailability', false)
                          },
                          inputChange: function (event) {
                            console.log('input change',  this.inputName, event)

                          //  self.checkNameAvailability( this.inputName );
                          },
                          onSubmitNewInvoice: function (event){
                            console.log('pay invoice ', this.invoiceUUID)
                            //self.claimName( this.inputName )



                            self.payInvoice( this.invoiceUUID )
                          }
                      }
                  })

    }


    async generateQRCode() //from eth helper callback
    {


      var web3 = this.ethHelper.getWeb3Instance();

      var env = this.ethHelper.getEnvironmentName()


      var paySpecContract = ContractInterface.getPaySpecContract(web3,env)



      var paySpecContractAddress = paySpecContract.address;
      var invoiceUUID = this.params.uuid;



      //https://github.com/soldair/node-qrcode
      var options = {
        scale: 8
      }

      //ethereum:<contract_address>/approve?address=<spender>&uint256=<amount>

     //https://ethereum-magicians.org/t/tools-for-implementing-eip-681-and-eip-831/1320


      //example erc20 transfer ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/transfer?address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=1

      //http://localhost:8080/invoice.html?uuid=0x0
      var invoiceuuid = 0x0;

      //fix me !!
      var encodeddata = 'ethereum:'+paySpecContractAddress+'?function_name=payInvoice?bytes32='+invoiceUUID

      console.log( ' creating QR code with: ', encodeddata)
      //encodeddata = 'ethereum:0xb6ed7644c69416d67b522e20bc294a9a9b405b31/approve?address=0xb6ed7644c69416d67b522e20bc294a9a9b405b31&uint256=100'

      QRCode.toCanvas(qrcodecanvas, encodeddata, options, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })

    }




}
