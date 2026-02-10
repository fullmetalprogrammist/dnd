import { configureStore } from "@reduxjs/toolkit";
import { editorReducer} from "./editor";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();