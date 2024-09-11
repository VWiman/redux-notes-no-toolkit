import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import NotesListItem from "./notesListItem";

const selectNotesIds = (state) => state.notes.map((note) => note.id);

const NotesList = () => {
	const notesIds = useSelector(selectNotesIds, shallowEqual);

    const renderedListNotes = notesIds.map((noteId) => {
        console.log("Rendering note with ID: ", noteId)
		return <NotesListItem key={noteId} id={noteId} />;
	});

	return <ul className="w-64">{renderedListNotes.length >= 1 ? renderedListNotes : <p className="p-2 text-center text-slate-300 select-none">No notes found</p>}</ul>;
};

export default NotesList;
