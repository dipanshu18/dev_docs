"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";

interface TiptapEditorProps {
  content: any;
  onChange: any;
  blog: any;
}

export default function TiptapEditor({
  content,
  blog,
  onChange,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      HorizontalRule,
      HardBreak,
      CodeBlock.configure({
        languageClassPrefix: "language-",
      }),
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "min-h-[1rem]",
          },
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
      onChange({ ...blog, content: editor.getHTML() });
    },
    content: content,
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </>
  );
}
