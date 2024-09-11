export const CategoryFilter = {
	All: "all",
	Private: "private",
	Work: "work",
	Shopping: "shopping",
};

const initialState = {
	category: CategoryFilter.All,
};

export default function filtersReducer(state = initialState, action) {
	switch (action.type) {
		case "filters/categoryFilterChanged": {
			console.log(action.payload);
			return {
				...state,
				category: action.payload,
			};
		}
		default:
			return state;
	}
}
