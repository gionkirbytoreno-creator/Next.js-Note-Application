
"use client";

type Note = {
  id: number;
  title: string;
  description: string;
};

type NoteItemProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteItem({
  note,
  onEdit,
  onDelete,
}: NoteItemProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "18px",
        marginBottom: "18px",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0 0 10px 0",
              color: "#1e293b",
              fontSize: "22px",
            }}
          >
            {note.title}
          </h3>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: 0,
              fontSize: "16px",
            }}
          >
            {note.description}
          </p>
        </div>

        <span
          style={{
            background: "#eff6ff",
            color: "#2563eb",
            padding: "6px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          NOTE
        </span>
      </div>

      <div
        style={{
          marginTop: "20px",
          paddingTop: "15px",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => onEdit(note)}
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "9px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onDelete(note.id)}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "9px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
