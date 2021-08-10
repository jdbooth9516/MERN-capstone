const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  Address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  cards: [
    {
      name: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
      expirationdate: {
        type: String,
        required: true,
      },
      ccv: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Payment = mongoose.model('payment', PaymentSchema);
