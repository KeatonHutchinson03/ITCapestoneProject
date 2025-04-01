const gamepadAPI = { 
    controller: {}, 
    turbo: false, 
    buttons: [ 
      'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right', 
      'Start', 'Back', 'Axis-Left', 'Axis-Right', 
      'LB', 'RB', 'Power', 'A', 'B', 'X', 'Y'
    ], 
    buttonsCache: [], 
    buttonsStatus: [], 
    axesStatus: [], 
  
    // Connect method for gamepad
    connect(event) {
      this.controller = event.gamepad;
      console.log("Gamepad connected: ", this.controller);
    },
  
    // Disconnect method for gamepad
    disconnect(event) {
      this.controller = {};  // Clear controller when disconnected
      console.log("Gamepad disconnected: ", event.gamepad);
    },
  
    // Update method to handle button presses and axes
    update() {
      // Clear the buttons cache
      this.buttonsCache = []; 
  
      // Move the buttons status from the previous frame to the cache
      for (let k = 0; k < this.buttonsStatus.length; k++) { 
        this.buttonsCache[k] = this.buttonsStatus[k]; 
      }
  
      // Clear the buttons status
      this.buttonsStatus = []; 
  
      // Get the gamepad object
      const c = this.controller || {}; 
  
      // Loop through buttons and push the pressed ones to the array
      const pressed = [];
      if (c.buttons) { 
        for (let b = 0; b < c.buttons.length; b++) { 
          if (c.buttons[b].pressed) { 
            pressed.push(this.buttons[b]); 
          } 
        } 
      }
  
      // Loop through axes and push their values to the array
      const axes = [];
      if (c.axes) { 
        for (let a = 0; a < c.axes.length; a++) { 
          axes.push(c.axes[a].toFixed(2)); 
        } 
      }
  
      // Assign received values
      this.axesStatus = axes; 
      this.buttonsStatus = pressed; 
  
      // Return buttons for debugging purposes
      return pressed;
    }
  };
  
  // Listen for gamepad connection and disconnection
  window.addEventListener("gamepadconnected", (event) => gamepadAPI.connect(event)); 
  window.addEventListener("gamepaddisconnected", (event) => gamepadAPI.disconnect(event)); 
  
  // Optional: Polling the update method regularly (if you want to detect state changes over time)
  setInterval(() => {
    const pressedButtons = gamepadAPI.update();
    console.log('Pressed Buttons:', pressedButtons); 
  }, 100);
  