const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const id = process.env.twilio.accountId;
const sec = process.env.twilio.authToken;
const client = twilio(id, sec);

export const handler = async (event, context) => {
  const { customerName, appointmentDate, phoneNumber, message } = event.body;

  try {
    // Send SMS message using Twilio
    await client.messages.create({
      body: `Appointment scheduled for ${customerName} with phone number ${phoneNumber} on ${appointmentDate}. Message: ${message} `,
      from: process.env.from,
      to: process.env.to,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending message: ", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
};
