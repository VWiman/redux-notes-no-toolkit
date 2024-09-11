import { combineReducers } from "redux";
import filtersReducer from "./features/filters/filtersSlice";
import notesReducer from "./features/notes/notesSlice";

const rootReducer = combineReducers({
	notes: notesReducer,
	filters: filtersReducer,
});

export default rootReducer;