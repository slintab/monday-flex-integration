const {
  createResponse,
  catchException,
  createMondayItem,
  fetchSyncDocuments,
} = require(Runtime.getFunctions()["common/utils"].path);

exports.handler = async function (context, event, callback) {
  try {
    const eventPayload = event[0];

    const executionEvent = {
      sid: eventPayload.data.execution_sid,
      startTime: eventPayload.data.date_created,
      address: eventPayload.data.contact_channel_address,
      ended_reason: eventPayload.data.ended_reason,
      flow: eventPayload.data.flow_sid,
    };

    const syncClient = Runtime.getSync({
      serviceName: context.IVR_SYNC_SERVICE_SID,
    });

    const documents = await fetchSyncDocuments(syncClient);

    for (const doc of documents) {
      await createMondayItem(context, doc.data.webhookUrl, executionEvent);
    }

    return createResponse(executionEvent, callback);
  } catch (e) {
    return catchException(e, callback);
  }
};
