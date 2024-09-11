import React, { createContext, useState } from "react";

const EditingContext = createContext(null);

export function EditingProvider({ children }) {
	const [editingId, setEditingId] = useState(null);

	return <EditingContext.Provider value={{ editingId, setEditingId }}>{children}</EditingContext.Provider>;
}

export default EditingContext;
