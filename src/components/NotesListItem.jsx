import { useSelector } from "react-redux";
import { Trash2, ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import EditingContext from "../context/statusProvider";
import { useEffect } from "react";

const selectNoteById = (state, noteId) => {
	return state.notes.find((note) => note.id === noteId);
};

const NotesListItem = ({ id }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState();
	const { editingId, setEditingId } = useContext(EditingContext);

	const note = useSelector((state) => selectNoteById(state, id));
	const filteredCategory = useSelector((state) => state.filters.category);

	useEffect(() => {
		console.log("editing id", editingId);
	}, [editingId]);

	const handleRemove = (e) => {
		if (editingId === null) {
			e.preventDefault();
			e.stopPropagation();
			dispatch({ type: "notes/noteRemoved", payload: id });
		}
	};

	const handleEdit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setEditingId(editingId !== null ? null : id);
	};

	if (!note) {
		return <li>Note missing!</li>;
	}

	const { title, description, category } = note;

	if (filteredCategory !== "all" && category !== filteredCategory) {
		return null;
	}

	return (
		<>
			<li className="w-64 whitespace-pre-line capitalize">
				<details>
					<summary
						className="w-full flex flex-row items-center justify-center cursor-pointer select-none p-2"
						onClick={() => {
							setOpen(!open);
						}}>
						{open ? (
							<ChevronDown size={20} strokeWidth={1} absoluteStrokeWidth />
						) : (
							<ChevronRight size={20} strokeWidth={1} absoluteStrokeWidth />
						)}

						{title}
						<Pencil
							size={20}
							strokeWidth={1}
							absoluteStrokeWidth
							className="ml-auto"
							onClick={(event) => handleEdit(event)}
						/>
						<Trash2
							size={20}
							strokeWidth={1}
							absoluteStrokeWidth
							className="ml-2"
							onClick={(event) => handleRemove(event)}
						/>
					</summary>
					<dl className="flex flex-col gap-1 px-2 pb-2">
						<hr className="w-full" />
						<dt className="text-xs">Description</dt>
						<dd className=" text-sm normal-case">{description}</dd>
						<dt className="text-xs">Category</dt>
						<dd className=" text-sm">{category}</dd>
					</dl>
				</details>
			</li>
			<hr className="w-full" />
		</>
	);
};

export default NotesListItem;
