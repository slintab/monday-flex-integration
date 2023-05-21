import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import mondaySdk from "monday-sdk-js";
import config from "./config";

const PLUGIN_NAME = "MondayWidgetFlexPlugin";

export default class MondayWidgetFlexPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    // Check if Flex is running in iframe
    if (window.self !== window.top) {
      //Hide CRM container since Flex is running in iframe
      flex.AgentDesktopView.defaultProps.showPanel2 = false;

      // Initialize monday.com SDK
      const monday = mondaySdk();

      // Add listener for click-to-call button
      monday.listen("events", async (event: any) => {
        // Check if user clicked on click-to-call button
        if (
          event.data.columnId == config.CTC_COLUMN_ID &&
          event.data.type == "change_column_values"
        ) {
          // Find phone number associated with the item clicked
          const itemId = event.data.itemIds[0];
          const phoneNumberQuery = `query {items (ids: ${itemId}) { column_values(ids: [\"phone\"]) {text}}}`;
          const phoneNumberqueryResult = await monday.api(phoneNumberQuery);
          const phoneNumber =
            //@ts-ignore
            phoneNumberqueryResult.data.items?.[0]["column_values"][0].text;

          // Start outbound call if phone number found
          if (phoneNumber) {
            flex.Actions.invokeAction("StartOutboundCall", {
              destination: "+" + phoneNumber,
            });
          }
        }
      });

      // Screen pop functionality
      // Add listener for inbound calls
      flex.Actions.addListener("afterAcceptTask", async (event) => {
        // Retrieve caller and remove initial '+' from phone number as monday.com phone number column type does not use it in front of country codes
        const caller = event.task.attributes.from.substring(1);

        // Find item associated with caller
        const callerItemQuery = `query {items_by_column_values (board_id: ${config.BOARD_ID}, column_id: \"${config.PHONE_NUMBER_COLUMN_ID}\", column_value: \"${caller}\") {id }}`;
        const callerItemQueryResult = await monday.api(callerItemQuery);
        const callerItemId =
          //@ts-ignore
          callerItemQueryResult.data["items_by_column_values"]?.[0].id;

        // Open item if exists
        if (callerItemId) {
          monday.execute("openItemCard", { itemId: callerItemId });
        }
      });
    }
  }
}
