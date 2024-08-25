# Twilio Flex integration for monday.com

This repository contains a sample integration of Twilio Flex and monday.com.

## [UPDATE] Native integration available

An out-of-the-box integration for monday.com is now available within Twilio Flex and can be enabled using the Admin dashboard, under [Integrations](https://flex.twilio.com/admin/).

![Integration](integration.png?raw=true)

## Structure

The integration consists of two distinct features that may be deployed and used together or individually on their own:
- **monday-recipe-functions-flex/**: contains a [custom trigger](https://developer.monday.com/apps/docs/custom-trigger) implementation, which may be used to create [monday.com automations](https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations) for  automatically pushing data such as call logs or IVR execution records from Twilio to a monday.com board.

- **monday-widget-plugin-flex/**: contains a [Twilio Flex plugin](https://www.twilio.com/docs/flex/developer/ui-and-plugins), which demonstrates how to implement features such as click-to-call and screen pop when embedding Twilio Flex within monday.com as a Dashboard Widget. 

More information, including deployment instructions, are located under the respective integration subdirectories.