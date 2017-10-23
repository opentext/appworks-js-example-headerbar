document.addEventListener("deviceready", onDeviceReady, false);
var self = this;

/**
 * Called when AppWorks is ready
 */
function onDeviceReady() {
  initializeHeaderButtons();
}

/**
 * Create an instance of the AWHeaderBar class and store it in the global scope
 * Create some dummy objects for each button, or create them as required.
 */
function initializeHeaderButtons() {
    self.header = new Appworks.AWHeaderBar();
    self.buttons = {
      "RightButtonOne" : {"appearance": null, "func": null},
      "RightButtonTwo" : {"appearance": null, "func": null},
      "LeftButtonOne" : {"appearance": null, "func": null},
      "LeftButtonTwo" : {"appearance": null, "func": null}
    };
    setHeaderButtons();
}

/**
 * Pass in the button (required, image (optional) and func (optional))
 * If image is null, then the client will revert the button to it's default appearance and function
 * If you set the image, you will be expected to handle the tap function
 */
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

/**
 * Pass in the button, text and func
 */
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

/**
 * Update the buttons with our local self.buttons object
 * also pass in the function which will be called when a button is tapped
 * which will work out the appropriate function to call
 */
function updateButtons() {
  var buttons = [
    self.buttons.LeftButtonOne.appearance,
    self.buttons.LeftButtonTwo.appearance,
    self.buttons.RightButtonOne.appearance,
    self.buttons.RightButtonTwo.appearance
  ];
  self.header.setHeaderButtons(headerButtonCallback, buttons);
}

/**
 * When setting text buttons, we just want left one and right one sent
 */
function updateTextButtons() {
  var buttons = [
    self.buttons.LeftButtonOne.appearance,
    self.buttons.RightButtonOne.appearance
  ];
  self.header.setHeaderButtons(headerButtonCallback, buttons);
}

/**
 * Tell the client to set the header buttons according to the apps needs
 * To keep track of this, we're using a global property, self.buttons.
 * self.buttons.xxx.appearance will be sent in batch to the client to update the appearance
 * self.buttons.xxx.func will be called when the button is tapped
 */
function setHeaderButtons() {
  // Button definitions
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

  updateButtons();
}

/**
 * Tell the client to set each button to their default icons and functions
 */
function resetHeaderButtons() {
  self.buttons.RightButtonOne = makeButton(self.header.ButtonName.RightOne, null, null);
  self.buttons.RightButtonTwo = makeButton(self.header.ButtonName.RightTwo, null, null);
  self.buttons.LeftButtonOne = makeButton(self.header.ButtonName.LeftOne, null, null);
  self.buttons.LeftButtonTwo = makeButton(self.header.ButtonName.LeftTwo, null, null);

  updateButtons();
}

/**
 * Setting second left button to the hamburger icon, this will open the menu when tapped
 * Simply update the self.buttons object and call updateButtons()
 */
function setHamburgerMenu() {
  self.buttons.LeftButtonTwo = makeButton(
    self.header.ButtonName.LeftTwo,
    self.header.ButtonImage.Hamburger,
    function () {
      var menu = new Appworks.Menu();
      menu.showMenu(true);
  });

  updateButtons();
}

/**
 * Callback function called when a button is tapped
 * We are simply calling the self.buttons func property
 */
function headerButtonCallback(button){
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

/**
 * Use text instead of images
 * Remember, space is limited!
 */
function setTextButtons() {
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

  updateTextButtons();
}

/**
 * Set a half opacity overlay on the header bar
 * Pass in a boolean (true to mask, false to unmask)
 */
function maskHeader(shouldMaskHeader) {
  self.header.maskHeader(shouldMaskHeader);
}
