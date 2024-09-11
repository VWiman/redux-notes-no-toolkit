const initialState = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

function nextId(notes) {
	const maxId = notes.reduce((maxId, note) => Math.max(note.id, maxId), -1);
	return maxId + 1;
}

function saveToLocalStorage(state) {
	localStorage.setItem("notes", JSON.stringify(state));
}

export default function notesReducer(state = initialState, action) {
	switch (action.type) {
		case "notes/noteAdded": {
			const newState = [
				...state,
				{
					id: nextId(state),
					title: action.payload.title,
					description: action.payload.description,
					category: action.payload.category,
				},
			];
			saveToLocalStorage(newState);
			return newState;
		}
		case "notes/noteEdited": {
			const newState = state.map((note) => {
				if (note.id === action.payload.id) {
					return {
						...note,
						title: action.payload.title,
						description: action.payload.description,
						category: action.payload.category,
					};
				}
				return note;
			});
			saveToLocalStorage(newState);
			return newState;
		}
		case "notes/noteRemoved": {
			const id = action.payload;
			const newState = state.filter((note) => id !== note.id);
			saveToLocalStorage(newState);
			return newState;
		}

		default:
			return state;
	}
}
