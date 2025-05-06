import { useEffect, useState } from "react";
import axios from "../utils/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("/notes");
      setNotes(res.data);
    } catch (err) {
      alert("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create or update note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNoteId) {
        await axios.put(`/notes/${editingNoteId}`, { title, content });
        setEditingNoteId(null);
      } else {
        await axios.post("/notes", { title, content });
      }
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      alert("Error saving note");
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`/notes/${id}`);
        fetchNotes();
      } catch (err) {
        alert("Error deleting note");
      }
    }
  };

  // Edit note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in-down">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {editingNoteId ? "✏️ Edit Note" : "📝 Add Note"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter content..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className={`w-full py-2 px-4 rounded text-white font-semibold transition-all duration-300 ${
              editingNoteId ? "bg-yellow-500 hover:bg-yellow-400" : "bg-blue-600 hover:bg-blue-500"
            }`}
            type="submit"
          >
            {editingNoteId ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div className="animate-fade-in-up">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 Your Notes</h3>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-4 rounded-lg shadow-md border hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              >
                <h4 className="font-bold text-lg text-gray-800">{note.title}</h4>
                <p className="text-gray-700 mt-2 whitespace-pre-line">{note.content}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-300 text-black text-sm px-3 py-1 rounded transition-transform transform hover:scale-105"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white text-sm px-3 py-1 rounded transition-transform transform hover:scale-105"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
