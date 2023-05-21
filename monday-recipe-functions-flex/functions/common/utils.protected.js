exports.validateMondayToken = (event, context) => {
  const jwt = require("jsonwebtoken");

  jwt.verify(
    event.request.headers.authorization,
    context.MONDAY_SIGNING_SECRET
  );
};

exports.catchException = (e, callback) => {
  console.error("Exception: ", typeof e, e);

  const response = new Twilio.Response();

  response.setStatusCode(503);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");
  response.setBody({ error: typeof e === "string" ? e : e.message });

  callback(null, response);
};

exports.createResponse = (obj, callback) => {
  const response = new Twilio.Response();

  response.setStatusCode(200);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(typeof obj === "string" ? { obj } : obj);

  callback(null, response);
};

exports.createWebhookSink = (client, description, webhookUrl) => {
  return client.events.v1.sinks.create({
    description: description,
    sinkConfiguration: {
      destination: webhookUrl,
      method: "POST",
      batch_events: false,
    },
    sinkType: "webhook",
  });
};

exports.createSinkSubscription = (client, description, typeArray, sink) => {
  const types = typeArray.map((t) => {
    return { type: t };
  });

  return client.events.v1.subscriptions.create({
    description: description,
    types: types,
    sinkSid: sink,
  });
};

exports.createSyncDocument = async (client, name, content) => {
  await client.documents.create({
    uniqueName: name,
    data: content,
  });

  return name;
};

exports.generateId = () => {
  return Math.floor(Date.now() + Math.random());
};

exports.deleteSink = (client, sink) => {
  return client.events.v1.sinks(sink).remove();
};

exports.deleteSinkSubscription = (client, sub) => {
  return client.events.v1.subscriptions(sub).remove();
};

exports.deleteSyncDocument = (client, document) => {
  return client.documents(document).remove();
};

exports.fetchSyncDocument = (client, document) => {
  return client.documents(document).fetch();
};

exports.fetchSyncDocuments = (client) => {
  return client.documents.list();
};

exports.createMondayItem = (context, webhookUrl, itemData) => {
  const axios = require("axios");

  requestPayload = {
    trigger: {
      outputFields: {
        sid: itemData,
      },
    },
  };

  requestHeaders = {
    Authorization: context.MONDAY_SIGNING_SECRET,
  };

  return axios.post(webhookUrl, requestPayload, {
    headers: requestHeaders,
  });
};
