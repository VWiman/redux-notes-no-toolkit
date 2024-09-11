const initialState = [];

function nextId(notes) {
	const maxId = notes.reduce((maxId, note) => Math.max(note.id, maxId), -1);
	return maxId + 1;
}

export default function notesReducer(state = initialState, action) {
	switch (action.type) {
		case "notes/noteAdded": {
			return [
				...state,
				{
					id: nextId(state),
					title: action.payload.title,
					description: action.payload.description,
					category: action.payload.category,
				},
			];
		}
		case "notes/noteEdited": {
			return state.map((note) => {
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
		}
		case "notes/noteRemoved": {
			const id = action.payload;
			return state.filter((note) => id !== note.id);
		}

		default:
			return state;
	}
}
