import type {AppDispatch} from "./config/store.ts";
import {useDispatch} from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
