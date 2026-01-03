const twilio = require("twilio");

// Store credentials in env vars (recommended)

const client = twilio(
  config.get('TwilioCredentials.Account_SID'),
  config.get('TwilioCredentials.authToken')
);

(async function(){
try {
    const accounts = await client.api.accounts.list({ limit: 1 });
    console.log("<--------------------------------------------->");
    console.log("✅ SMS connection successful");
    console.log("Account SID:", accounts[0].sid);
  } catch (err) {
    console.error("❌ SMS connection failed:", err.message);
  }
})()

exports.sendSms = async(req, message) => {
	// this is dummy msg for otp
   return {
        resp: 1,
        msg: 'success MSG'
    }

    // use this when required to send message
    try {
        const sms = await client.messages.create({
        body: message,
        from: +12272380832, // Your Twilio number
        to: `+91${req.body.mobile}` // recipient phone number (+91..., +1..., etc.)
    });   
     return {
        resp: 1,
        msg: sms
    }
    } catch (err) {
        return {
            resp: 0,
            msg: err.message
        }
    }
}
