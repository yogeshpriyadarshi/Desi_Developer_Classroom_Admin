import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Table as TableIcon,
  Undo,
  Redo,
  Plus,
  Trash,
} from "lucide-react";

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

  // 🔥 Button style
  const getBtnClass = (isActive) =>
    `flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md transition
     ${
       isActive
         ? "bg-blue-500 text-white border-blue-500"
         : "bg-white text-gray-700 hover:bg-gray-100"
     } disabled:opacity-40`;

  return (
    <div className="border rounded-xl shadow-sm bg-white overflow-hidden">
      {/* 🔥 Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        {/* Text */}
        <button
          className={getBtnClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </button>

        <button
          className={getBtnClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </button>

        <button
          className={getBtnClass(editor.isActive("strike"))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} />
        </button>

        {/* Headings */}
        <button
          className={getBtnClass(editor.isActive("heading", { level: 1 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={16} />
        </button>

        <button
          className={getBtnClass(editor.isActive("heading", { level: 2 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={16} />
        </button>

        {/* Lists */}
        <button
          className={getBtnClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </button>

        <button
          className={getBtnClass(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </button>

        {/* Code */}
        <button
          className={getBtnClass(editor.isActive("codeBlock"))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code size={16} />
        </button>

        {/* Table */}
        <button
          className={getBtnClass(false)}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon size={16} />
        </button>

        <button
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          <Plus size={16} /> Col
        </button>

        <button
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          <Plus size={16} /> Row
        </button>

        <button
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <Trash size={16} />
        </button>

        {/* Undo / Redo */}
        <button
          disabled={!editor.can().chain().focus().undo().run()}
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo size={16} />
        </button>

        <button
          disabled={!editor.can().chain().focus().redo().run()}
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo size={16} />
        </button>
      </div>

      {/* ✨ Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] prose max-w-none focus:outline-none"
      />
    </div>
  );
}

export default RichTextEditor;
