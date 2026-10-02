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
          onClick={() => onEdit(note)}
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
          onClick={() => onDelete(note.id)}
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
  );
}