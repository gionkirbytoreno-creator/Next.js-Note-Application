"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  description: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Welcome Note",
      description: "This is my first note!",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // useEffect checks if the note title already exists
  useEffect(() => {
    if (title.trim() === "") {
      return;
    }

    const existingNote = notes.find(
      (note) =>
        note.title.toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    if (existingNote) {
      console.log("A note with this title already exists.");
    }
  }, [title, notes, editingId]);

  // Add or update a note
  const handleSubmit = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description.");
      return;
    }

    // Update existing note
    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
              }
            : note
        )
      );

      setEditingId(null);
    } else {
      // Check for duplicate title
      const duplicate = notes.some(
        (note) =>
          note.title.toLowerCase() === title.trim().toLowerCase()
      );

      if (duplicate) {
        alert("A note with this title already exists.");
        return;
      }

      // Add new note
      const newNote: Note = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setDescription("");
  };

  // Delete a note
  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setDescription("");
    }
  };

  // Edit a note
  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "10px",
              color: "#1f2937",
            }}
          >
            📝 My Notes
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
            }}
          >
            Keep your thoughts organized.
          </p>
        </div>

        {/* Note Form */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#1f2937",
            }}
          >
            {editingId !== null ? "Edit Note" : "Add New Note"}
          </h2>

          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "13px",
              marginBottom: "15px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <textarea
            placeholder="Write your note here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            style={{
              width: "100%",
              padding: "13px",
              marginBottom: "15px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSubmit}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {editingId !== null ? "Update Note" : "Add Note"}
            </button>

            {editingId !== null && (
              <button
                onClick={handleCancel}
                style={{
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Notes List */}
        <div>
          <h2
            style={{
              color: "#1f2937",
              marginBottom: "15px",
            }}
          >
            My Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: "35px",
                textAlign: "center",
                borderRadius: "15px",
                color: "#6b7280",
              }}
            >
              <p>No notes yet.</p>
              <p>Add your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.06)",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "8px",
                    color: "#111827",
                  }}
                >
                  {note.title}
                </h3>

                <p
                  style={{
                    color: "#4b5563",
                    lineHeight: "1.6",
                    marginBottom: "18px",
                  }}
                >
                  {note.description}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(note)}
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "9px 16px",
                      borderRadius: "7px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "9px 16px",
                      borderRadius: "7px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}