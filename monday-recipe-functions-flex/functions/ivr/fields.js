const {
  createResponse,
  catchException,
  validateMondayToken,
} = require(Runtime.getFunctions()["common/utils"].path);

exports.handler = function (context, event, callback) {
  try {
    validateMondayToken(event, context);
    const ivrExecutionFields = [
      {
        id: "sid",
        title: "Execution Sid",
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
        id: "address",
        title: "Contact Channel Address",
        outboundType: "text",
        inboundTypes: ["text"],
      },
      {
        id: "ended_reason",
        title: "Ended Reason",
        outboundType: "text",
        inboundTypes: ["text"],
      },
      {
        id: "flow",
        title: "Flow Sid",
        outboundType: "text",
        inboundTypes: ["text"],
      },
    ];

    return createResponse(ivrExecutionFields, callback);
  } catch (e) {
    return catchException(e, callback);
  }
};
