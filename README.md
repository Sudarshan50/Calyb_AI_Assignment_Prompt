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
   ```bash
    npm run dev
   ```
     ***For backend simply type***
   ```bash
    nodemon server.js
   ```
   
3. **Include the `ChatOverlay` component in your application**:

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

   ## Chat-Window
   1. ***For getting the tour of main page you can type the commands which contains this string `tour of main page`, `buy a meal`.***
      ****Example Usage****
      
      1. Hii,can you guide me how to buy me a meal.
      2. Can you give the tour of main page.
         
   2. ***For getting the tour of add page  via main page you can type the commands which contains this string `tour of add page`, `how to add meal`, `add a meal`, `add food`, `add food item`.***
      
      ****Example Usage****
      1. Suppose I want to become owner tell me `how to add a meal` in this platform.
      2. Can you give the tour of add page.
         
    ****Note:-If you are acessing the tour of add page it will redirect to a new page there you have to again give the prompt to guide in both case either you are trying to get tour from add page or from main page.****


## File-Info
### Admin
The ChatOverlay file is located at `admin/src/components/ChatBox/ChatOverlay.js`.
### Backend
The main controller is located at `backend/controllers/foodControllers.js`. The two functions responsible for chat are `giveTourAdmin` and `giveTour`.
### Frontend
The ChatOverlay file is located at `frontend/src/components/ChatBox/ChatOverlay.js`.


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
