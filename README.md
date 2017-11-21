# node-expresspay
Node module for using Expresspay API.

```javascript
var Expresspay = require('node-expresspay');

var expresspay = new Expresspay('https://api.express-pay.by/v1/', 'API-Key', 'Secret-Key', 'Return-Secret-Key');
```

## ERIP functions
Signature included.

### Create invoice

```javascript
expresspay.createInvoiceERIP({
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
expresspay.getInvoicesListERIP({
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
expresspay.getInvoiceDetailsERIP({ 
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
expresspay.getInvoiceStatusERIP({
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
expresspay.getPaymentsListERIP({
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
expresspay.getPaymentDetailsERIP({
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
expresspay.cancelInvoiceERIP({
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
Signature included.
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

## Signature functions
### Create signature
Return signtaure as string.
```javascript
expresspay.createSignature(type, data)
var signature = expresspay.createSignature('create_invoice_erip',
{
  "AccountNo": 26,
  "Amount": '10',
  "Currency": '933',
  "Info": 'testtest',
  "ReturnUrl": 'https://example.com/success',
  "FailUrl": 'https://example.com/fail',
});
```
Types
|Function               |String                    |
|-----------------------|:------------------------:|
|createInvoiceERIP      |create_invoice_erip       |
|getInvoicesListERIP    |get_invoices_list_erip    |
|getInvoiceDetailsERIP  |get_invoice_details_erip  |
|getInvoiceStatusERIP   |get_invoice_status_erip   |
|getPaymentsListERIP    |get_payments_list_erip    |
|getPaymentDetailsERIP  |get_payment_details       |
|cancelInvoiceERIP      |create_invoice_card       |
|cancelInvoiceERIP      |get_invoice_form_card     |
|cancelInvoiceERIP      |get_invoice_status_card   |
|cancelInvoiceERIP      |reverse_invoice_card      |

### Check signature
Return true or false
```javascript
expresspay.checkSignature(data, signature);
var check = expresspay.checkSignature('{"CmdType":1,"AccountNo":"123456789","PaymentNo":123,"Amount":"100000","Created":"20171121162605","Service":"Ремонт бытовой техники","Payer":"Иванов Петр Анатольевич","Address":"г. Минск, ул. Автозаводская, д.1, кв. 65"}', '7307D720623523CABB3C291AB1D9A683FFB711BB');

```

## Tests
```bash
npm run eriptest
npm run cardtest
npm run checktest
```

## License
MIT