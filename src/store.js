import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./sliece/userSlice";

export const store = configureStore({
  reducer: {
    userLogin:userSlice,
  },
});
