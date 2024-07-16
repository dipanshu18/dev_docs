"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Dispatch, SetStateAction } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-3xl font-semibold",
          },
          levels: [1],
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "overflow border-none bg-transparent w-full p-5 outline-none focus-visible:outline-none disabled:cursor-not-allowed min-h-screen",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    content: content,
  });

  return (
    <>
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </>
  );
}
