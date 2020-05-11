var AWS = require('aws-sdk');
require('dotenv');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})
var params = {
    Message: "Hello from AWS SNS ",
    PhoneNumber: '+' + "<your phone number>",
    MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
            'DataType': 'String',
            'StringValue': "<Name of Sender>"// if not provided default sender id will be sent
        }
    }
};

var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

publishTextPromise.then(data => { console.log("Message ID is :", data.MessageId); })
    .catch(err => {
        console.log("err is : ", err);
    });