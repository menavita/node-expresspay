'use strict';

var request = require('request');
var Q = require('q');
var crypto = require('crypto');

function Expresspay(url, token, secret_word, return_secret_word) {

  this.url = url;
  this.token = token;
  this.secret_word = secret_word;
  this.return_secret_word = return_secret_word;

}

Expresspay.prototype.createInvoiceERIP = function(params) {

  var d = Q.defer();
  
  request.post({
    uri: !this.secret_word 
      ? this.url + 'invoices/?token=' + this.token
      : this.url + 'invoices/?token=' + this.token + '&signature=' + this.createSignature('create_invoice_erip', params),
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

Expresspay.prototype.getInvoicesListERIP = function(params) {

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
    : this.url + 'invoices/?token=' + this.token + '&signature=' + this.createSignature('get_invoices_list_erip', params)
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

Expresspay.prototype.getInvoiceDetailsERIP = function(params) {

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
      ? this.url + 'invoices/' + params.InvoiceNo + '?token=' + this.token
      : this.url + 'invoices/' + params.InvoiceNo + '?token=' + this.token + '&signature=' + this.createSignature('get_invoice_details_erip', params),
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

Expresspay.prototype.getInvoiceStatusERIP = function(params) {

  var d = Q.defer();

  request.get({
    uri: !this.secret_word 
      ? this.url + 'invoices/' + params.InvoiceNo + '/status?token=' + this.token
      : this.url + 'invoices/' + params.InvoiceNo + '/status?token=' + this.token + '&signature=' + this.createSignature('get_invoice_status_erip', params),
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

Expresspay.prototype.getPaymentsListERIP = function(params) {

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
    : this.url + 'payments/?token=' + this.token + '&signature=' + this.createSignature('get_payments_list_erip', params)
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

Expresspay.prototype.getPaymentDetailsERIP = function(params) {

  var d = Q.defer();
  
  request.get({
    uri: !this.secret_word 
      ? this.url + 'payments/' + params.PaymentNo + '?token=' + this.token
      : this.url + 'payments/' + params.PaymentNo + '?token=' + this.token + '&signature=' + this.createSignature('get_payment_details_erip', params),
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

Expresspay.prototype.cancelInvoiceERIP = function(params) {

  var d = Q.defer();
  
  request.delete({
    uri: !this.secret_word 
      ? this.url + 'invoices/' + params.InvoiceNo + '/?token=' + this.token
      : this.url + 'invoices/' + params.InvoiceNo + '/?token=' + this.token + '&signature=' + this.createSignature('cancel_invoice_erip', params),
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
      : this.url + 'cardinvoices/?token=' + this.token + '&signature=' + this.createSignature('create_invoice_card', params),
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
      : this.url + 'cardinvoices/' + params.InvoiceId + '/payment/?token=' + this.token + '&signature=' + this.createSignature('get_invoice_form_card', params),
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
      : this.url + 'cardinvoices/' + params.InvoiceId + '/status/?token=' + this.token + '&signature=' + this.createSignature('get_invoice_status_card', params),
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
      : this.url + 'cardinvoices/' + params.InvoiceId + '/reverse/?token=' + this.token + '&signature=' + this.createSignature('reverse_invoice_card', params),
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

Expresspay.prototype.checkSignature = function(params, signature) {

  if (signature == crypto.createHmac('sha1', this.return_secret_word).update(params, 'utf8').digest('hex').toUpperCase()) {
    return true;
  } else {
    return false
  }

}

Expresspay.prototype.createSignature = function(type, data) {
  
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
      "PaymentNo"
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
      "PageView",
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

  var result = this.token;

  if(Object.keys(data).length) {
    values[type].forEach(function(item) {
      if (data.hasOwnProperty(item)) result += data[item];
    });
  }
  console.log(result);
  console.log(crypto.createHmac('sha1', this.secret_word).update(result, 'utf8').digest('hex').toUpperCase());
  return crypto.createHmac('sha1', this.secret_word).update(result, 'utf8').digest('hex').toUpperCase();
}

module.exports = Expresspay;
