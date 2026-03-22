import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const btn = "px-3 py-1 text-sm border rounded hover:bg-gray-200 transition";

  return (
    <div className="border rounded-xl shadow-sm bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </button>

        <button
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>

        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          {"</>"}
        </button>

        {/* Table */}
        <button
          className={btn}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Table
        </button>

        <button
          className={btn}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          +Col
        </button>
        <button
          className={btn}
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          +Row
        </button>
        <button
          className={btn}
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          Del Table
        </button>

        {/* Undo / Redo */}
        <button
          className={btn}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          className={btn}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] prose max-w-none focus:outline-none"
      />
    </div>
  );
}

export default RichTextEditor;
