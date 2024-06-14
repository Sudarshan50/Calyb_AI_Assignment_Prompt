# ChatOverlay Component with Shepherd.js Tour

The `ChatOverlay` component is an interactive chat overlay built with React that allows users to send messages and start a guided tour of your website using Shepherd.js. The chat interface supports auto-scrolling to the latest message and submitting messages via the Enter key.

## Features

- **Interactive Chat**: Users can type and send messages.
- **Auto-Scrolling**: The chat container automatically scrolls to display the latest message.
- **Keyboard Submission**: Messages are sent when the Enter key is pressed.
- **Guided Tours**: Users can start an interactive tour of the website with Shepherd.js.

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/<your-username>/<your-repo-name>.git
    cd <your-repo-name>
    ```

2. **Install dependencies in all three folder namely `admin`, `frotend`, `backend` **:

    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

1. **Run all the three files**:
     ***For frontend and admin simply type***
        ``` npm run dev```
     ***For backend simply type***
        ```nodemon server.js```
   
2. **Include the `ChatOverlay` component in your application**:

    ```jsx
    const App = () => {
      return (
        <div className="App">
          <ChatOverlay />
        </div>
      );
    };

    export default App;
    ```

## Customization

### Shepherd.js Tour Steps

Shepherd.js is a JavaScript library for guiding users through your app. It helps create tours with customizable steps. You can customize the tour steps in the `startTour` function of the `ChatOverlay` component.

**Example:**

```jsx
tour.addStep({
  id: 'step-1',
  text: 'Welcome to our website! This is step 1.',
  attachTo: {
    element: '.cart__items', // Example attachment point
    on: 'bottom',
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next,
    },
  ],
});
```
