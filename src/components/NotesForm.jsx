import { useState } from "react";
import { useDispatch } from "react-redux";
import EditingContext from "../context/statusProvider";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const selectNoteById = (state, noteId) => {
	return state.notes.find((note) => note.id === noteId);
};

const NotesForm = () => {
	const dispatch = useDispatch();
	const [newNoteTitle, setNewNoteTitle] = useState("");
	const [newNoteDescription, setNewNoteDescription] = useState("");
	const [newNoteCategory, setNewNoteCategory] = useState("private");
	const [showAlert, setShowAlert] = useState(false);

	const { editingId, setEditingId } = useContext(EditingContext);
	const noteToEdit = useSelector((state) => (editingId !== null ? selectNoteById(state, editingId) : null));

	const handleCreateNote = (e) => {
		e.preventDefault();

		if (newNoteTitle !== "" || newNoteDescription !== "") {
			const newNote = {
				title: newNoteTitle,
				description: newNoteDescription,
				category: newNoteCategory,
			};

			dispatch({ type: "notes/noteAdded", payload: newNote });

			setNewNoteTitle("");
			setNewNoteDescription("");
			setNewNoteCategory("private");
		} else {
			setShowAlert(true);
		}
	};

	const handleEditNote = (e) => {
		e.preventDefault();
		if (newNoteTitle !== "" || newNoteDescription !== "") {
			const editedNote = {
				id: noteToEdit.id,
				title: newNoteTitle,
				description: newNoteDescription,
				category: newNoteCategory,
			};

			dispatch({ type: "notes/noteEdited", payload: editedNote });

			setNewNoteTitle("");
			setNewNoteDescription("");
			setNewNoteCategory("private");
			setEditingId(null);
		} else {
			setShowAlert(true);
		}
	};

	useEffect(() => {
		if (showAlert) {
			const handleAlert = () => {
				setTimeout(() => {
					setShowAlert(false);
				}, 2000);
			};
			handleAlert();
		}
	}, [showAlert]);

	useEffect(() => {
		if (noteToEdit) {
			setNewNoteTitle(noteToEdit.title);
			setNewNoteDescription(noteToEdit.description);
			setNewNoteCategory(noteToEdit.category);
		} else {
			setNewNoteTitle("");
			setNewNoteDescription("");
			setNewNoteCategory("private");
		}
	}, [noteToEdit]);

	return (
		<form
			className="flex flex-col items-center justify-center w-64 p-2 gap-2"
			onSubmit={editingId !== null ? handleEditNote : handleCreateNote}>
			<ul className="flex flex-col w-full gap-2">
				<li className="flex flex-row gap-2 justify-between">
					<label htmlFor="title-input">Title</label>
					<input
						className="border w-36 px-1"
						type="text"
						id="title-input"
						value={newNoteTitle}
						onChange={(event) => setNewNoteTitle(event.target.value)}
					/>
				</li>
				<li className="flex flex-row gap-2 justify-between">
					<label htmlFor="description-input">Description</label>
					<input
						className="border w-36 px-1"
						type="text"
						id="description-input"
						value={newNoteDescription}
						onChange={(event) => setNewNoteDescription(event.target.value)}
					/>
				</li>
				<li className="flex flex-row gap-2 justify-between">
					<label htmlFor="category-input">Category</label>
					<select
						id="category-input"
						className="border w-36 outline-0 px-0"
						value={newNoteCategory}
						onChange={(event) => setNewNoteCategory(event.target.value)}>
						<option value="private">Private</option>
						<option value="work">Work</option>
						<option value="shopping">Shopping</option>
					</select>
				</li>
			</ul>

			<button type="submit" className="bg-slate-700 text-white w-60 py-1 rounded">
				{editingId !== null ? "Edit Note" : "Create Note"}
			</button>
			{showAlert ? <small>Please fill in all the fields</small> : ""}
		</form>
	);
};

export default NotesForm;
