var should = require('should');
var Expresspay = require('../');

// with signature
// var expresspay = new Expresspay('https://sandbox-api.express-pay.by/v1/', 'a75b74cbcfe446509e8ee874f421bd66', 'sandbox.expresspay.by', 'testtest');
// no siganture
var expresspay = new Expresspay('https://sandbox-api.express-pay.by/v1/', 'a75b74cbcfe446509e8ee874f421bd64', 'testtest', 'testtest');
// production test account with signature
// var expresspay = new Expresspay('https://api.express-pay.by/v1/', '2c57a2e73f26406cb3ac22f465ee3cb0', 'express-pay.by', 'express-pay.by');

describe('Create card payment', function() {
  it('should return invoice number', function() {
    return expresspay.createInvoiceCard({
      "AccountNo": "12345",
      "Expiration": "20161224",
      "Amount": '10',
      "Currency": '933',
      "Info": 'info',
      "ReturnUrl": 'https://example.com/success',
      "FailUrl": 'https://example.com/fail',
      "Language": 'ru',
      "PageView": "DESKTOP",
      "SessionTimeoutSecs": '2000',
      "ExpirationDate": '20161224235001'
    })
    .then(function(res) {
      console.log(res);
      res.should.have.property('CardInvoiceNo');
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e);
    })
  })
})

describe('Get invoice', function() {
  it('should return invoice form by InvoiceId', function() {
    return expresspay.getInvoiceFormCard({
      "InvoiceId": 100
    })
    .then(function(res) {
      console.log(res);
      res.should.have.property('FormUrl');
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e)
    })
  })

  it('should return invoice status by InvoiceId', function() {
    return expresspay.getInvoiceStatusCard({
      "InvoiceId": 100
    })
    .then(function(res) {
      console.log(res);
      res.should.have.property('Amount');
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e);
    })
  })
})

describe('Reverse', function() {
  it('should reverse invoice by InvoiceId', function() {
    return expresspay.reverseInvoiceCard({
      "InvoiceId": 100
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e);
    })
  })
})
