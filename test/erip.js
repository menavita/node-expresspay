var should = require('should');
var Expresspay = require('../');

// with signature
// var expresspay = new Expresspay('https://sandbox-api.express-pay.by/v1/', 'a75b74cbcfe446509e8ee874f421bd66', 'sandbox.expresspay.by');
// no siganture
var expresspay = new Expresspay('https://sandbox-api.express-pay.by/v1/', 'a75b74cbcfe446509e8ee874f421bd64');
// production test account with signature
// var expresspay = new Expresspay('https://api.express-pay.by/v1/', '2c57a2e73f26406cb3ac22f465ee3cb0', 'express-pay.by');

describe('Create ERIP payment', function() {
  it('should return invoice number', function() {
    return expresspay.createInvoiceErip({
      "AccountNo": 10,
      "Amount": 20,
      "Currency": 933,
    })
    .then(function(res) {
      console.log('Invoice number: ', res.InvoiceNo);
      res.should.have.property('InvoiceNo');
      InvoiceNo = res.InvoiceNo;
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e.Error.Msg);
    })
  })
})


describe('Get invoice', function() {

  it('should return list of invoices by params', function() {
    return expresspay.getInvoiceListErip({ "AccountNo": 100, "Status": 1 })
    .then(function(res) {
      console.log(res);
      res.should.have.property('Items')
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e);
    })
  })

  it('should return invoice details by InvoiceNo', function() {
    return expresspay.getInvoiceDetailsErip({ "InvoiceNo": 10 })
      .then(function(res) {
        console.log('Invoice details: ', res);
        res.should.have.property('AccountNo')
      })
      .catch(function(e) {
        console.log(e);
        throw new Error(e.Error.Msg);
      })
  })

  it('should return invoice status by InvoiceNo', function() {
    return expresspay.getInvoiceStatusErip({ "InvoiceNo": 10 })
      .then(function(res) {
        console.log(res)
        res.should.have.property('Status');
      })
      .catch(function(e) {
        console.log(e);
        throw new Error(e);
      })
  })
})

describe('Get payments', function() {
  it('should return payments list by params', function() {
    return expresspay.getPaymentListErip({})
      .then(function(res) {
        console.log(res);
        res.should.have.property('Items');
      })
      .catch(function(e) {
        console.log(e);
        throw new Error(e);
      })
  })

  it('should return payment details by PaymentNo', function() {
    return expresspay.getPaymentDetailsErip({ "PaymentNo": 2 })
      .then(function(res) {
        console.log('Payment details: ', res);
        res.should.have.property('AccountNo')
      })
      .catch(function(e) {
        console.log(e);
        throw new Error(e.Error.Msg);
      })
  })
})

describe('Delete invoice', function() {
  it('should delete invoice by InvoiceNo', function() {
    return expresspay.deleteInvoiceErip({"InvoiceNo": 10})
      .then(function(res) {
        console.log(res);
      })
      .catch(function(e) {
        console.log(e);
        throw new Error(e.Error.Msg)
      })
  })
})
