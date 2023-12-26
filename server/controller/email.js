// const emailjs = require('@emailjs/nodejs');

// var templateParams = {
//   name: 'James',
//   notes: 'Check this out!',
// };

// emailjs
//   .send('<YOUR_SERVICE_ID>', '<YOUR_TEMPLATE_ID>', templateParams, {
//     publicKey: '<YOUR_PUBLIC_KEY>',
//     privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
//   })
//   .then(
//     function (response) {
//       console.log('SUCCESS!', response.status, response.text);
//     },
//     function (err) {
//       console.log('FAILED...', err);
//     },
//   );


// module.export = emailjs


const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);