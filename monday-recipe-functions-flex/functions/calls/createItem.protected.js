const {
  createResponse,
  catchException,
  validateMondayToken,
  createMondayItem,
  fetchSyncDocuments,
} = require(Runtime.getFunctions()["common/utils"].path);

exports.handler = async function (context, event, callback) {
  try {
    const eventPayload = event[0];

    const callSummaryEvent = {
      sid: eventPayload.data.call_sid,
      startTime: eventPayload.data.start_time,
      duration: eventPayload.data.duration,
      direction: eventPayload.data.properties.direction,
      from: eventPayload.data.from.caller,
      to: eventPayload.data.to.callee,
      last_sip_response_num: eventPayload.data.properties.last_sip_response_num,
    };

    const syncClient = Runtime.getSync({
      serviceName: context.CALLS_SYNC_SERVICE_SID,
    });

    const documents = await fetchSyncDocuments(syncClient);

    for (const doc of documents) {
      await createMondayItem(context, doc.data.webhookUrl, callSummaryEvent);
    }

    return createResponse(callSummaryEvent, callback);
  } catch (e) {
    return catchException(e, callback);
  }
};
