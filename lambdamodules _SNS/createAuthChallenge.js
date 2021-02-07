const rand = require('crypto-secure-random-digit')
const aws_sdk = require('aws-sdk')

var sns = new aws_sdk.SNS();

module.exports.handler  = async event => {

    let secretLoginCode="";
    var phoneNumber = event.request.userAttributes.phone_number;
    
    if (!event.request.session || !event.request.session.length) {

        // This is a new auth session
        // Generate a new secret login code and mail it to the user
        secretLoginCode = rand.randomDigits(6).join('');

        await sendSMS(phoneNumber, secretLoginCode)

    } else {

        // There's an existing session. Don't generate new digits but
        // re-use the code from the current session. This allows the user to
        // make a mistake when keying in the code and to then retry, rather
        // then needing to e-mail the user an all new code again.    
        const previousChallenge = event.request.session.slice(-1)[0];
        secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }

    // This is sent back to the client app

    event.response.publicChallengeParameters ={phone: phoneNumber};

    // Add the secret login code to the private challenge parameters
        // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };

    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;

    return event;
};

async function sendSMS(phoneNumber,secretLoginCode){
    const params= {
        "Message": "Your secret log in code is "+secretLoginCode, "PhoneNumber":phoneNumber
    };
    await sns.publish(params).promise();
}




