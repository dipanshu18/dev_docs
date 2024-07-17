"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Dispatch, SetStateAction } from "react";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";

interface TiptapEditorProps {
  content: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      HorizontalRule,
      HardBreak,
      CodeBlock.configure({
        languageClassPrefix: "language-",
      }),
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
