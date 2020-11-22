const rand = require('crypto-secure-random-digit')
const aws_sdk = require('aws-sdk')
const ses = new aws_sdk.SES();

module.exports.handler  = async event => {

    let secretLoginCode="";
    var phoneNumber = event.request.userAttributes.phone_number;
    
    if (!event.request.session || !event.request.session.length) {

        secretLoginCode = rand.randomDigits(6).join('');
        await sendEmail(event.request.userAttributes.email, secretLoginCode);

    } else {
  
        const previousChallenge = event.request.session.slice(-1)[0];
        secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }

    event.response.publicChallengeParameters = { email: event.request.userAttributes.email };

    event.response.privateChallengeParameters = { secretLoginCode };

    event.response.challengeMetadata = `CODE-${secretLoginCode}`;

    return event;
};

async function sendEmail(emailAddress, secretLoginCode) {
    const params= {
        Destination: { ToAddresses: [emailAddress] },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<html><body><p>This is your secret login code:</p>
                          <h3>${secretLoginCode}</h3></body></html>`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `Your secret login code: ${secretLoginCode}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Your secret login code'
            }
        },
        Source: 'meghanarayana22@gmail.com'
    };
    await ses.sendEmail(params).promise();
}






