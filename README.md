# node-expresspay
Node module for using Expresspay api.

```javascript
var Expresspay = require('node-expresspay');

var expresspay = new Expresspay('https://api.express-pay.by/v1/', 'API-Key', 'Secret-Key');
```

## Erip functions

### Create invoice

```javascript
expresspay.createInvoiceErip({
  "AccountNo": 10, // required
  "Amount": 10, // required
  "Currency": 933, // required
  "Expiration": '20171210',
  "Info": 'info',
  "Surname": 'Ivanov',
  "FirstName": 'Ivan',
  "Patronymic": 'Ivanovich',
  "City": 'Minsk',
  "Street": 'Karl Marks',
  "House": '2a',
  "Building": '2',
  "Apartment": '34',
  "IsNameEditable": 1,
  "IsAddressEditable": 1,
  "IsAmountEditable": 1,
  "EmailNotifacation": 'ivanovivan@gmail.com',
  "SmsPhone": '+375291111111'
})
.then(function(res) {
  console.log(res.InvoiceNo);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```
### Get invoices list by params
```javascript
expresspay.getInvoicesListErip({
  "From": '20170110',
  "To": '20171210',
  "AccountNo": 100,
  "Status": 1 
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Get invoice details
```javascript
expresspay.getInvoiceDetailsErip({ 
  "InvoiceNo": 10 // required
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Get invoice status
```javascript
expresspay.getInvoiceStatusErip({
  "InvoiceNo": 10 // required
})
.then(function(res) {
  console.log(res)
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Get payments list
```javascript
expresspay.getPaymentsListErip({
  "From": '20170110',
  "To": '20171210',
  "AccountNo": 100
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Get payment details
```javascript
expresspay.getPaymentDetailsErip({
  "PaymentNo": 2 // required
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Cancel invoice
```javascript
expresspay.cancelInvoiceErip({
  "InvoiceNo": 10 // required
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg)
})
```
## Card functions

### Create invoice
```javascript
expresspay.createInvoiceCard({
  "AccountNo": "123456", // required
  "Expiration": "20161224", // required
  "Amount": 10, // required
  "Currency": 933, // required
  "Info": 'info', // required
  "ReturnUrl": 'https://example.com/success', // required 
  "FailUrl": 'https://example.com/fail', // required
  "Language": 'ru',
  "SessionTimeoutSecs": 2000,
  "ExpirationDate": '20161224235001'
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Get invoice form
```javascript
expresspay.getInvoiceFormCard({
  "InvoiceId": 100 // required
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg)
})
```

### Get invoice status
```javascript
expresspay.getInvoiceStatusCard({
  "InvoiceId": 100, // required 
  "Language": 'ru'
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

### Reverse invoice
```javascript
expresspay.reverseInvoiceCard({
  "InvoiceId": 100 // required
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e.Error.Msg);
})
```

## Tests
```bash
npm run eriptest
npm run cardtest
```

## License
MIT