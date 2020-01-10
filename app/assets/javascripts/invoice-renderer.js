var QRCode = require('qrcode')
var qrcodecanvas = document.getElementById('qr-code-canvas')


export default class InvoiceRenderer {



    init()
    {

      //https://github.com/soldair/node-qrcode
      var options = {
        scale: 10
      }

      //ethereum:<contract_address>/approve?address=<spender>&uint256=<amount>

     //https://ethereum-magicians.org/t/tools-for-implementing-eip-681-and-eip-831/1320


      //example erc20 transfer ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/transfer?address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=1

      //http://localhost:8080/invoice.html?uuid=0x0
      var invoiceuuid = 0x0;

      //fix me !!
      var encodeddata = 'ethereum:0xb0afcf66859a145656bdbd14562390087bb44769?function_name=payInvoice?bytes32='+invoiceuuid

      //encodeddata = 'ethereum:0xb6ed7644c69416d67b522e20bc294a9a9b405b31/approve?address=0xb6ed7644c69416d67b522e20bc294a9a9b405b31&uint256=100'

      QRCode.toCanvas(qrcodecanvas, encodeddata, options, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })


    }

    update()
    {}

    async onWeb3Connected() //from eth helper callback
    {
    }




}
