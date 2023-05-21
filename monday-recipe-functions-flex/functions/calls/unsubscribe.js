const {
  createResponse,
  catchException,
  validateMondayToken,
  fetchSyncDocument,
  deleteSinkSubscription,
  deleteSink,
  deleteSyncDocument,
} = require(Runtime.getFunctions()["common/utils"].path);

exports.handler = async function (context, event, callback) {
  try {
    validateMondayToken(event, context);
    const webhookId = event.payload.webhookId;

    if (webhookId) {
      const twilioClient = context.getTwilioClient();
      const syncClient = Runtime.getSync({
        serviceName: context.CALLS_SYNC_SERVICE_SID,
      });

      const syncDocument = await fetchSyncDocument(syncClient, webhookId);
      console.log(syncDocument.data);
      const { twilioSink, twilioSinkSub } = syncDocument.data;

      await deleteSinkSubscription(twilioClient, twilioSinkSub);
      await deleteSink(twilioClient, twilioSink);
      await deleteSyncDocument(syncClient, webhookId);
    }

    return createResponse(null, callback);
  } catch (e) {
    return catchException(e, callback);
  }
};
