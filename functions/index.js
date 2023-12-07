const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const cors = require("cors")({ origin: true });

const Twilio = require("twilio");

// Retrieve Twilio Account SID from environment variables
const accountSid = functions.config().twilio.sid;

// Retrieve Twilio Auth Token from environment variables
const authToken = functions.config().twilio.auth_token;

const client = new Twilio(accountSid, authToken);

exports.sendSMS = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // Your Firebase Function logic here
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST");
    response.header("Access-Control-Allow-Headers", "Content-Type");
  });

  const { to, body } = request.body;
  client.messages
    .create({ to, from: "+18335371966", body })
    .then((message) => {
      console.log(`SMS sent: ${message.sid}`);
      response.json({ success: true, message: `SMS sent: ${message.sid}` });
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      response
        .status(500)
        .json({ success: false, message: "Error sending SMS" });
    });
});
