# Twilio Flex integration for monday.com

![banner](banner.png)

This repository contains a sample integration of Twilio Flex and monday.com.

## Structure

The integration consists of two distinct features that may be deployed and used individually on their own or together:
- **monday-recipe-functions-flex/**: contains a [customer trigger](https://developer.monday.com/apps/docs/custom-trigger) implementation, which may be used to create [monday.com automations](https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations) for  automatically pushing data such as call logs or IVR execution records from Twilio to a monday.com board.

- **monday-widget-plugin-flex/**: contains a [Twilio Flex plugin](https://www.twilio.com/docs/flex/developer/ui-and-plugins), which demonstrates how to implement features such as click-to-call and screen pop when embedding Twilio Flex within monday.com as a Dashboard Widget. 

More information, including deployment instructions, are located under the respective integration subdirectories.