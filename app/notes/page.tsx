
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function NotesPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check the login session and load saved notes
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.replace("/");
      setAuthChecked(true);
      return;
    }

    setIsAuthorized(true);
    setAuthChecked(true);

    try {
      const savedNotes = localStorage.getItem("my-notes");

      if (savedNotes) {
        const parsed: unknown = JSON.parse(savedNotes);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (note) =>
              note !== null &&
              typeof note === "object" &&
              typeof note.id === "number" &&
              typeof note.title === "string" &&
              typeof note.content === "string"
          )
        ) {
          setNotes(parsed as Note[]);
        }
      }
    } catch {
      console.error("Could not load saved notes.");
    } finally {
      setIsLoaded(true);
    }
  }, [router]);

  // Save notes whenever they change
  useEffect(() => {
    if (isLoaded && isAuthorized) {
      try {
        localStorage.setItem("my-notes", JSON.stringify(notes));
      } catch {
        setError("Could not save notes. Check your browser storage.");
      }
    }
  }, [notes, isLoaded, isAuthorized]);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a title and note content.");
      return;
    }

    if (editingId !== null) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
              }
            : note
        )
      );

      setEditingId(null);
    } else {
      setNotes((current) => [
        ...current,
        {
          id: Date.now(),
          title: title.trim(),
          content: content.trim(),
        },
      ]);
    }

    setTitle("");
    setContent("");
  }

  function handleEdit(note: Note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: number) {
    setNotes((current) => current.filter((note) => note.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setContent("");
    }
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    router.replace("/");
  }

  if (!authChecked || (isAuthorized && !isLoaded)) {
    return <main className="notes-page">Loading your notes...</main>;
  }

  if (!isAuthorized) {
    return <main className="notes-page">Redirecting to login...</main>;
  }

  return (
    <main className="notes-page">
      <div className="notes-container">
        <header className="notes-header">
          <div>
            <h1>Your Notes ✦</h1>
            <p>Capture your ideas, one note at a time.</p>
          </div>

          <button type="button" onClick={handleLogout}>
            ← Logout
          </button>
        </header>

        <form className="note-form" onSubmit={handleSave}>
          <h2>{editingId !== null ? "Edit Note" : "Create a New Note"}</h2>

          <label htmlFor="note-title">Note title</label>
          <input
            id="note-title"
            type="text"
            placeholder="Give your note a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor="note-content">Note content</label>
          <textarea
            id="note-content"
            placeholder="Write something worth remembering..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit">
            {editingId !== null ? "Save Changes" : "+ Add Note"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
                setError("");
              }}
              style={{ marginLeft: "10px", background: "#343b59" }}
            >
              Cancel
            </button>
          )}
        </form>

        <section>
          <h2>My Notes ({notes.length})</h2>

          {notes.length === 0 ? (
            <div className="note-card">
              <p>You have no notes yet. Create your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <article className="note-card" key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>

                <div className="note-actions">
                  <button type="button" onClick={() => handleEdit(note)}>
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
