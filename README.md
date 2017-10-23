# AppWorks Example - AWHeaderBar

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWHeaderBar plugin allows the app to change the buttons in the top left and right corners of the client to different icons or to text, call custom callbacks when tapped and mask the header.

## Usage

#### Enumerators

These enums are used to determine the button name and the button image.

__ButtonName enumerator__

+ __ButtonName.LeftOne__: The left most button, normally the hamburger menu icon
+ __ButtonName.LeftTwo__: The second left button, no default use.
+ __ButtonName.RightOne__: The right most button, normally the app switcher icon in the multi app client
+ __ButtonName.RightTwo__: The second right button, no default use for apps, but the settings icon on the app library page in the multi app client

__ButtonImage enumerator__
+ __ButtonImage.Back__: Same image as the back icon. Can be used here as an alternative.
+ __ButtonImage.Settings__: A settings cog-wheel icon
+ __ButtonImage.None__: Hides the button
+ __ButtonImage.Dots__: Three dots stacked vertically icon
+ __ButtonImage.Search__: Magnifying glass icon

#### setHeaderButtons (image buttons)

```javascript
setHeaderButtons(callback: Function, config: any)
```
Set the header buttons to specified images and indicate if their event handler is custom

+ __callback__: This function will be called when a custom button is tapped. The tapped button name will be returned, where you must call you appropriate function.
+ __config__: an array of objects. The properties of each object must contains:
 + __button__: The identifier of the button. You can use the AWHeaderBar.ButtonName enumerator for this.
 + __image__: The identifier of the image. You can use the AWHeaderBar.ButtonImage enumerator for this.
 + __function__: custom|default|text - Indicate to AppWorks whether AppWorks will handle the tap event (default) or your app will with an image (custom) or text (text)

Examples
```javascript
var self = this;
self.header = new Appworks.AWHeaderBar();

// Initialize our button object
self.buttons = {
  "RightButtonOne" : {"appearance": null, "func": null},
  "RightButtonTwo" : {"appearance": null, "func": null},
  "LeftButtonOne" : {"appearance": null, "func": null},
  "LeftButtonTwo" : {"appearance": null, "func": null}
};

// Create each button
self.buttons.RightButtonOne = makeButton(
  self.header.ButtonName.RightOne,
  self.header.ButtonImage.Dots,
  function () {
    alert("dots function!");
});

self.buttons.RightButtonTwo = makeButton(
  self.header.ButtonName.RightTwo,
  self.header.ButtonImage.Search,
  function () {
    alert("search function!");
});

self.buttons.LeftButtonOne = makeButton(
  self.header.ButtonName.LeftOne,
  self.header.ButtonImage.Back,
  function () {
    alert("back function!");
  });

self.buttons.LeftButtonTwo = makeButton(self.header.ButtonName.LeftTwo, null, null);

var buttons = [
  self.buttons.LeftButtonOne.appearance,
  self.buttons.LeftButtonTwo.appearance,
  self.buttons.RightButtonOne.appearance,
  self.buttons.RightButtonTwo.appearance
];

// Send the object to the appworks appworks client
header.setHeaderButtons(headerButtonCallback, buttons);

/**
 * Callback function called when a button is tapped
 * We are simply calling the self.buttons func property
 */
function headerButtonCallback(button) {
  if(button == header.ButtonName.RightOne) {
    self.buttons.RightButtonOne.func();
  }

  if(button == header.ButtonName.RightTwo) {
    self.buttons.RightButtonTwo.func();
  }

  if(button == header.ButtonName.LeftOne) {
    self.buttons.LeftButtonOne.func();
  }

  if(button == header.ButtonName.LeftTwo) {
    self.buttons.LeftButtonTwo.func();
  }
}

// Helper function to create a button
function makeButton(button, image, func) {
  var obj = {};
  var appearance = {};
  appearance["button"] = button;
  if(image == null) {
    appearance["function"] = "default";
  } else {
    appearance["image"] = image;
    appearance["function"] = "custom";
  }

  obj["appearance"] = appearance;
  obj["func"] = func;
  return obj;
}
```
#### setHeaderButtons (text buttons)

```javascript
setHeaderButtons(callback: Function, config: any)
```
Set the header buttons to specified images and indicate if their event handler is custom

+ __callback__: This function will be called when a custom button is tapped. The tapped button name will be returned, where you must call you appropriate function.
+ __config__: an array of objects. The properties of each object must contains:
 + __button__: The identifier of the button. You can use the AWHeaderBar.ButtonName enumerator for this.
 + __text__: The text to be displayed.
 + __function__: custom|default|text - Indicate to AppWorks whether AppWorks will handle the tap event (default) or your app will with an image (custom) or text (text)

Examples
```javascript
var self = this;
self.header = new Appworks.AWHeaderBar();

// Initialize our button object
self.buttons = {
  "RightButtonOne" : {"appearance": null, "func": null},
  "RightButtonTwo" : {"appearance": null, "func": null},
  "LeftButtonOne" : {"appearance": null, "func": null},
  "LeftButtonTwo" : {"appearance": null, "func": null}
};

// Only left one and right one accept text

self.buttons.RightButtonOne = makeTextButton(
  self.header.ButtonName.RightOne,
  "Cancel",
  function () {
    alert("Cancel!");
});

self.buttons.LeftButtonOne = makeTextButton(
  self.header.ButtonName.LeftOne,
  "Accept",
  function () {
    alert("Accept!");
});

var buttons = [
  self.buttons.LeftButtonOne.appearance,
  self.buttons.RightButtonOne.appearance
];
self.header.setHeaderButtons(headerButtonCallback, buttons);

/**
 * Callback function called when a button is tapped
 * We are simply calling the self.buttons func property
 */
function headerButtonCallback(button) {
  if(button == header.ButtonName.RightOne) {
    self.buttons.RightButtonOne.func();
  }

  if(button == header.ButtonName.RightTwo) {
    self.buttons.RightButtonTwo.func();
  }

  if(button == header.ButtonName.LeftOne) {
    self.buttons.LeftButtonOne.func();
  }

  if(button == header.ButtonName.LeftTwo) {
    self.buttons.LeftButtonTwo.func();
  }
}

// Helper function to create a text button
function makeTextButton(button, text, func) {
  var obj = {};
  var appearance = {};
  appearance["button"] = button;
  appearance["text"] = text;
  appearance["function"] = "text";

  obj["appearance"] = appearance;
  obj["func"] = func;
  return obj;
}
```

#### setHeader

```javascript
setHeader(config: any)
```
Update the header bar with options

+ __config__: a configuration object with the following parameters
 + __title__: the title of the header
 + __backButtonVisible__: (legacy) boolean flag to hide/show the back button. Recommend using setHeaderButtons with the back image and a custom handler as this back button will perform a history-1 approach.

Examples
```javascript
var self = this;
self.header = new Appworks.AWHeaderBar();
header.setHeader({
        title: 'My New Title',
        backButtonVisible: false
    });
```


#### maskHeader

```javascript
maskHeader(shouldMaskHeader: any)
```
Adds an overlay to the native header, the buttons underneath are not usable when when the overlay is visible.

+ __shouldMaskHeader__: A boolean value, true to mask false to unmask

Examples
```javascript
var header = new Appworks.AWHeaderBar();
// Mask the header
header.maskHeader(true);
...
// Unmask the header
header.maskHeader(false);
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
