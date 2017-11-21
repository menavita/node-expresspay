var should = require('should');
var Expresspay = require('../');

// with signature
// var expresspay = new Expresspay('https://sandbox-api.express-pay.by/v1/', 'a75b74cbcfe446509e8ee874f421bd66', 'sandbox.expresspay.by', 'testtest');
// no siganture
var expresspay = new Expresspay('https://sandbox-api.express-pay.by/v1/', 'a75b74cbcfe446509e8ee874f421bd64', 'testtest', 'testtest');
// production test account with signature
// var expresspay = new Expresspay('https://api.express-pay.by/v1/', '2c57a2e73f26406cb3ac22f465ee3cb0', 'express-pay.by', 'express-pay.by');

describe('Create signature', function() {
  it('should return new signature', function() {
    var signature = expresspay.createSignature('create_invoice_erip', {
      "AccountNo": 26,
      "Amount": '10',
      "Currency": '933',
      "Info": 'testtest',
      "ReturnUrl": 'https://example.com/success',
      "FailUrl": 'https://example.com/fail',
    });
    console.log(signature);
  })
})

describe('Check signature', function () {
  it('should return true or false', function () {
    var check = expresspay.checkSignature('{"CmdType":1,"AccountNo":"123456789","PaymentNo":123,"Amount":"100000","Created":"20171121162605","Service":"Ремонт бытовой техники","Payer":"Иванов Петр Анатольевич","Address":"г. Минск, ул. Автозаводская, д.1, кв. 65"}', '7307D720623523CABB3C291AB1D9A683FFB711BB');
    if (check) {
      console.log('True');
    } else {
      console.log('False');
      throw new Error('False signature');
    }
  })
})