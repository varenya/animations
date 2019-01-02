import { Machine } from "xstate";

const eleApp = document.querySelector("#app");
const elNextButtons = Array.from(
  document.querySelectorAll("button:not(#submit)")
);

const elSubmitButton = document.querySelector("#submit");

const insuranceMachine = Machine({
  initial: eleApp.dataset.state || "step-1",
  states: {
    "step-1": {
      on: {
        NEXT: "step-2"
      }
    },
    "step-2": {
      on: {
        NEXT: "step-3"
      }
    },
    "step-3": {
      on: {
        NEXT: "step-4"
      }
    },
    "step-4": {
      on: {
        NEXT: "step-5"
      }
    },
    "step-5": {
      on: {
        SUBMIT: "step-1"
      }
    },
    finished: {}
  }
});

let currentState = insuranceMachine.initialState;

function setAttributes(state) {
  eleApp.dataset.state = state;
  document.querySelectorAll(`[data-active]`).forEach(el => {
    delete el.dataset.active;
  });
  document.querySelectorAll(`[data-show~="${state}"]`).forEach(el => {
    el.dataset.active = true;
  });
}

function send(event) {
  currentState = insuranceMachine.transition(currentState, event);
  setAttributes(currentState.value);
}

setAttributes(currentState.value);

elNextButtons.forEach(elButton => {
  elButton.addEventListener("click", () => {
    send("NEXT");
  });
});

elSubmitButton.addEventListener("click", () => {
  send("SUBMIT");
});
