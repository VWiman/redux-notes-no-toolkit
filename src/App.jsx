import { useDispatch } from "react-redux";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/notesList";
import { CategoryFilter } from "./features/filters/filtersSlice";

function App() {

	const availableCategories = Object.values(CategoryFilter);

	const categoryOptions = availableCategories.map((c) => (
    <option key={c} value={c}>
      {c}
		</option>
	));

	const dispatch = useDispatch();

	const handleCategoryChange = (c) => {
		dispatch({ type: "filters/categoryFilterChanged", payload: c });
	};

	return (
		<main className="w-screen h-screen flex flex-col items-center pt-20">
			<section className="flex flex-col border">
				<h3 className="flex items-center justify-center w-64 p-2 bg-slate-200">Category</h3>
				<select
					id="category-input"
					className=" w-64 p-2 outline-0 capitalize"
					onChange={(event) => handleCategoryChange(event.target.value)}>
					{categoryOptions}
				</select>
				<h3 className="flex items-center justify-center w-64  p-2 bg-slate-200">Notes</h3>
				<hr className="w-64" />
				<NotesList />
				<h3 className="flex items-center justify-center w-64  p-2 bg-slate-200">New Note</h3>
				<NotesForm />
			</section>
		</main>
	);
}

export default App;
