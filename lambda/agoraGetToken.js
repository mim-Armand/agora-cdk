const AWS = require("aws-sdk");
const {RtcTokenBuilder, RtcRole} = require("agora-access-token");
// const { v4: uuidv4 } = require('uuid');

// var credentials = new AWS.SharedIniFileCredentials({profile: 'fff'});
// AWS.config.credentials = credentials;

const {responseTemplate} = require("./util/responseTemplate");

// const client = new AWS.SecretsManager({region: "us-east-1"});





exports.handler = async (event, context) => {

  const APP_ID = process.env.APP_ID;
  const APP_CERT = process.env.APP_CERT;
  if (!APP_ID || !APP_CERT)
    return responseTemplate(500, "<h1>APP_ID and/or APP_CERT is missing in the env vars!</h1>", "text/html")

  if(!event.queryStringParameters || !event.queryStringParameters.channelName) return responseTemplate(400, "<h1>Bad request!<br/>a valid channelName in the query params is required for this endpoint.</h1>", "text/html")

  const qs = event.queryStringParameters;
  const channelName = qs.channelName;
  const role = (qs.role == 'publisher' ) ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const expireTime = ( !qs.expireTime || qs.expireTime == '' ) ? 3600 : parseInt(qs.expireTime, 10);
  const uid = qs.uid || 0;

  const now = Math.floor(Date.now() / 1000 );
  const expireFromNow = now + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERT, channelName, uid, role, expireFromNow);




  return responseTemplate(200, {msg: 'all good!', token, appId: APP_ID, role, channelName, expireTime, uid, expireFromNow})


}


// const test = async () => {
//
//
//
//   const TableName = 'SkjlMePubs';
//
//   const pubKey = '123456';
//
//   var getParams = {
//     TableName,
//     // IndexName: 'Index',
//     KeyConditionExpression: 'pubKey = :pubKey',
//     ExpressionAttributeValues: {
//       ':pubKey': pubKey,
//     }
//   }
//
//   const getResponse = await client.query(getParams).promise();
//
//
//   if(!getResponse.Items.length){
//     const calendarId = uuidv4();
//     const params = {
//       Item: {
//         pubKey,
//         calendarId,
//         bookings: [],
//         defaultCalendar: true,
//       },
//       TableName,
//     }
//     await client.put(params).promise();
//     return responseTemplate(200, [params.Item])
//   }
//   return responseTemplate(200, getResponse.Items)
//
//   console.log('>>>>>', getResponse)
//
// }
//
// test();