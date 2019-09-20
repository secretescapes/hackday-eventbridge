"use strict";
const AWS = require("aws-sdk");

module.exports.push = async event => {
  console.log(JSON.stringify(event));
  try {
    const eventPayload = JSON.parse(event.body).event;
    if (!eventPayload) {
      console.error("Missing event in payload");
      throw new Error("Missing event in payload");
    }
    const eventbridge = new AWS.EventBridge();
    var params = {
      Entries: [
        /* required */
        {
          Detail: JSON.stringify(eventPayload.payload),
          DetailType: eventPayload.type,
          // EventBusName: "STRING_VALUE",
          Resources: [],
          Source: "AWS_LAMBDA"
        }
        /* more items */
      ]
    };
    const result = await eventbridge.putEvents(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 400, body: err };
  }
};
