'use strict';

var request = require('request');
var Q = require('q');
var crypto = require('crypto');

function Expresspay(url, token, secret_word) {

  this.url = url;
  this.token = token;
  this.secret_word = secret_word;

}

Expresspay.prototype.createInvoiceErip = function(params) {

  var d = Q.defer();
  
  request.post({
    uri: !this.secret_word 
      ? this.url + 'invoices/?token=' + this.token
      : this.url + 'invoices/?token=' + this.token + '&signature=' + сreateSignature('create_invoice_erip', this.token, this.secret_word, params),
    form: params,
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.InvoiceNo) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getInvoicesListErip = function(params) {

  var default_params = {
    "From": '',
    "To": '',
    "AccountNo": '',
    "Status": '',
  };

  Object.keys(default_params).forEach(function(item) {
    if (!params.hasOwnProperty(item)) {
      params[item] = default_params[item];
    }
  })

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
    ? this.url + 'invoices/?token=' + this.token
      + '&From=' + params.From + '&To=' + params.To + '&AccountNo=' + params.AccountNo + '&Status=' + params.Status
    : this.url + 'invoices/?token=' + this.token + '&signature=' + сreateSignature('get_invoices_list_erip', this.token, this.secret_word, params)
      + '&From=' + params.From + '&To=' + params.To + '&AccountNo=' + params.AccountNo + '&Status=' + params.Status,
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.Items) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getInvoiceDetailsErip = function(params) {

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
      ? this.url + 'invoices/' + params.InvoiceNo + '?token=' + this.token
      : this.url + 'invoices/' + params.InvoiceNo + '?token=' + this.token + '&signature=' + сreateSignature('get_invoice_details_erip', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.AccountNo) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getInvoiceStatusErip = function(params) {

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
      ? this.url + 'invoices/' + params.InvoiceNo + '/status?token=' + this.token
      : this.url + 'invoices/' + params.InvoiceNo + '/status?token=' + this.token + '&signature=' + сreateSignature('get_invoice_status_erip', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.Status) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getPaymentsListErip = function(params) {

  var default_params = {
    "From": '',
    "To": '',
    "AccountNo": '',
  };

  Object.keys(default_params).forEach(function(item) {
    if (!params.hasOwnProperty(item)) {
      params[item] = default_params[item];
    }
  })

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
    ? this.url + 'payments/?token=' + this.token
      + '&From=' + params.From + '&To=' + params.To + '&AccountNo=' + params.AccountNo
    : this.url + 'payments/?token=' + this.token + '&signature=' + сreateSignature('get_payments_list_erip', this.token, this.secret_word, params)
      + '&From=' + params.From + '&To=' + params.To + '&AccountNo=' + params.AccountNo,
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.Items) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getPaymentDetailsErip = function(params) {

  var d = Q.defer();
  
  request.get({
    uri: !this.secret_word 
      ? this.url + 'payments/' + params.PaymentNo + '?token=' + this.token
      : this.url + 'payments/' + params.PaymentNo + '?token=' + this.token + '&signature=' + сreateSignature('get_payment_details_erip', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.AccountNo) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.cancelInvoiceErip = function(params) {

  var d = Q.defer();
  
  request.delete({
    uri: !this.secret_word 
      ? this.url + 'invoices/' + params.InvoiceNo + '/?token=' + this.token
      : this.url + 'invoices/' + params.InvoiceNo + '/?token=' + this.token + '&signature=' + сreateSignature('cancel_invoice_erip', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (!body.Error) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.createInvoiceCard = function(params) {

  var d = Q.defer();

  request.post({
    uri: !this.secret_word 
      ? this.url + 'cardinvoices/?token=' + this.token
      : this.url + 'cardinvoices/?token=' + this.token + '&signature=' + сreateSignature('create_invoice_card', this.token, this.secret_word, params),
    encoding: 'UTF-8',
    form: params,
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.CardInvoiceNo) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getInvoiceFormCard = function(params) {

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
      ? this.url + 'cardinvoices/' + params.InvoiceId + '/payment/?token=' + this.token
      : this.url + 'cardinvoices/' + params.InvoiceId + '/payment/?token=' + this.token + '&signature=' + сreateSignature('get_invoice_form_card', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.FormUrl) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.getInvoiceStatusCard = function(params) {

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
      ? this.url + 'cardinvoices/' + params.InvoiceId + '/status/?token=' + this.token
      : this.url + 'cardinvoices/' + params.InvoiceId + '/status/?token=' + this.token + '&signature=' + сreateSignature('get_invoice_status_card', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (body.Amount) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

Expresspay.prototype.reverseInvoiceCard = function(params) {

  var d = Q.defer();

  request.post({
    uri: !this.secret_word 
      ? this.url + 'cardinvoices/' + params.InvoiceId + '/reverse/?token=' + this.token
      : this.url + 'cardinvoices/' + params.InvoiceId + '/reverse/?token=' + this.token + '&signature=' + сreateSignature('reverse_invoice_card', this.token, this.secret_word, params),
    encoding: 'UTF-8',
  }, function(err, res, body) {
    body = JSON.parse(body);
    if (!body.Error) {
      d.resolve(body);
    } else {
      d.reject(body);
    }
  })

  return d.promise;

}

function сreateSignature(type, token, secret_word, data) {
  
  var values = {
    "create_invoice_erip": [
      "AccountNo",
      "Amount",
      "Currency",
      "Expiration",
      "Info",
      "Surname",
      "FirstName",
      "Patronymic",
      "City",
      "Street",
      "House",
      "Building",
      "Apartment",
      "IsNameEditable",
      "IsAddressEditable",
      "IsAmountEditable",
      "EmailNotifacation",
      "SmsPhone"
    ],
    "get_invoices_list_erip": [
      "From",
      "To",
      "AccountNo",
      "Status"
    ],
    "get_invoice_details_erip": [
      "InvoiceNo"
    ],
    "get_invoice_status_erip": [
      "InvoiceNo"
    ],
    "get_payments_list_erip": [
      "From",
      "To",
      "AccountNo"
    ],
    "get_payment_details_erip": [
      "AccountNo"
    ],
    "cancel_invoice_erip": [
      "InvoiceNo"
    ],
    "create_invoice_card": [
      "AccountNo",
      "Expiration",
      "Amount",
      "Currency",
      "Info",
      "ReturnUrl",
      "FailUrl",
      "Language",
      "SessionTimeoutSecs",
      "ExpirationDate",
    ],
    "get_invoice_form_card": [
      "InvoiceId"
    ],
    "get_invoice_status_card": [
      "InvoiceId"
    ],
    "reverse_invoice_card": [
      "InvoiceId"
    ]
  }

  var result = token;

  if(Object.keys(data).length) {
    values[type].forEach(function(item) {
      if (data.hasOwnProperty(item)) result += data[item];
    });
  }
  
  return crypto.createHmac('sha1', secret_word).update(result).digest('hex').toUpperCase();
}

module.exports = Expresspay;
