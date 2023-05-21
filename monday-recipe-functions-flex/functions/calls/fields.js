const {
  createResponse,
  catchException,
  validateMondayToken,
} = require(Runtime.getFunctions()["common/utils"].path);

exports.handler = function (context, event, callback) {
  try {
    validateMondayToken(event, context);
    const callFields = [
      {
        id: "sid",
        title: "Call Sid",
        outboundType: "text",
        inboundTypes: ["text"],
      },
      {
        id: "startTime",
        title: "Start Time",
        outboundType: "text",
        inboundTypes: ["text"],
      },
      {
        id: "duration",
        title: "Duration",
        outboundType: "numeric",
        inboundTypes: ["numeric"],
      },
      {
        id: "direction",
        title: "Direction",
        outboundType: "text",
        inboundTypes: ["text"],
      },
      {
        id: "from",
        title: "From",
        outboundType: "text",
        inboundTypes: ["text"],
      },
      { id: "to", title: "To", outboundType: "text", inboundTypes: ["text"] },
      {
        id: "last_sip_response_num",
        title: "Last SIP Response",
        outboundType: "numeric",
        inboundTypes: ["numeric", "empty_value"],
      },
    ];

    return createResponse(callFields, callback);
  } catch (e) {
    return catchException(e, callback);
  }
};
