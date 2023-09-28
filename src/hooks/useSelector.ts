import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/slices";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
