const {
  createResponse,
  catchException,
  validateMondayToken,
  createWebhookSink,
  createSinkSubscription,
  createSyncDocument,
  generateId,
} = require(Runtime.getFunctions()["common/utils"].path);

exports.handler = async function (context, event, callback) {
  try {
    validateMondayToken(event, context);
    const twilioClient = context.getTwilioClient();
    const syncClient = Runtime.getSync({
      serviceName: context.IVR_SYNC_SERVICE_SID,
    });

    const webhookUrl = `https://${context.DOMAIN_NAME}/ivr/createItem`;
    const sink = await createWebhookSink(
      twilioClient,
      "MondayRecipeIVR",
      webhookUrl
    );
    const subscription = await createSinkSubscription(
      twilioClient,
      "MondayRecipeIVR",
      ["com.twilio.studio.flow.execution.ended"],
      sink.sid
    );

    const twilioData = {
      twilioSink: sink.sid,
      twilioSinkSub: subscription.sid,
    };

    const mondayData = event.payload;

    const webhookId = await createSyncDocument(syncClient, generateId(), {
      ...twilioData,
      ...mondayData,
    });

    return createResponse({ webhookId: webhookId }, callback);
  } catch (e) {
    return catchException(e, callback);
  }
};
