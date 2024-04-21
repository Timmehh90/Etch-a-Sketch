# Etch-a-Sketch

## Overview

In the Etch-a-Sketch project of the Foundations Course, I'll dive into the world of DOM manipulation.
This project challenges me to create a browser-based version that captures the essence of a sketchpad combined with the nostalgia of an Etch-A-Sketch.

## Challenge

I should prepare for a journey of learning and exploration. This project is designed to push my boundaries and encourage resourcefulness.
I'll likely find myself turning to online references and experimenting with JavaScript methods and CSS properties.
I should embrace the challenge, as overcoming obstacles is a fundamental part of the learning process.

## What I've learned

From now on I'll be using the README.md file to keep track of what I've learned in the different project.

- The submit button is a special button which has it's own default event
  happening trying to send the input to the server or behind the link after "?".
  When used for a different purpose, you need to _prevent_ the default event from
  happening by using **event.preventDefault();**
- I used CSS to use transition on hover and on the pixel element to make the
  drawing effect. I refractor that to try to recreate the same thing with javascript
  because that is what the assignment asks of me. Although i do think CSS is
  the better way to go.
- document.querySelector selects the first element of that class, document.querySelectorAll
  selects all elements of that class
- You can add event listeners on each created element by using the node array and
  iterate over it by using forEach
- You can pass on a css variable from javascript to css by using
  **document.documentElement.style.setProperty("--grid-size", input)**
- You can change the checkbox tick color by using **accent-color** parameter
