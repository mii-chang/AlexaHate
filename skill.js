/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
  'どうしたの？',
  '落ち着いて',
  '大丈夫？'
];

const hateAnswer = [
  'なにがじゃー',
  'お前の方が腹たつんじゃー',
  'どうしたの？',
  '何があったの？',
  'まぁまぁ落ち着いて',
  '大丈夫？',
  'そんなことないよ',
  'アホだね',
  '落ち着け落ち着け',
  'そんな言葉使っちゃダメだよ',
  '何があったの？'
];


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
  'LaunchRequest': function() {
    const speechOutput = 'んも〜どうしたの？';
    this.emit(':ask', speechOutput, 'HateIntent');
  },
  'HateIntent': function() {
    const intent = this.event.request.intent;
    const factArr = hateAnswer;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = randomFact;

    this.response.cardRenderer(SKILL_NAME, randomFact);
    this.response.speak(speechOutput);
    this.emit(':responseReady');
  },
  // 'outputSpeech': {
  //   "type": "SSML",
  //   "ssml": "<speak> <say-as interpret-as="んも〜">、どうしたの？</say-as></speak>"
  // },
  'AMAZON.HelpIntent': function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
