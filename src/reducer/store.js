import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // We will create this in Step 3

const store = configureStore({
  reducer: rootReducer,
});

export default store;
