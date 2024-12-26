/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
require('dotenv').config();

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Brug miljøvariabel for Stripe secret key

// Firebase Function til at oprette Payment Intent
exports.createPaymentIntent = onRequest(async (req, res) => {
    try {
      const amount = req.body.amount; // Beløbet skal sendes fra frontend
        
        // Simulér succesfuld betaling
    const paymentResponse = {
        status: 'succeeded',
        message: `Betaling på ${amount} DKK gennemført succesfuldt.`,
      };
      

    res.status(200).send(paymentResponse);
    } catch (error) {
      logger.error('Error creating payment intent:', error);
      res.status(500).send({ error: error.message });
    }
  });


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
