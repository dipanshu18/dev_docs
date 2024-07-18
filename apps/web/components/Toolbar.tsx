import type { Editor } from "@tiptap/react";
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/fa6";
import { GoHorizontalRule } from "react-icons/go";
import { HiListBullet } from "react-icons/hi2";
import { LuHeading1 } from "react-icons/lu";
import { RiCodeBlock, RiListOrdered } from "react-icons/ri";
import { VscNewline } from "react-icons/vsc";

interface ToolbarProps {
  editor: Editor | null;
  content: string;
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="p-3">
      <div className="flex items-center flex-wrap gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`
            btn 
            ${editor.isActive("heading") ? "btn-primary" : "btn-outline"}
            `}
        >
          <LuHeading1 />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleBold().run();
          }}
          className={`
            btn 
            ${editor.isActive("bold") ? "btn-primary" : "btn-outline"}
            `}
        >
          <FaBold />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleItalic().run();
          }}
          className={`
            btn 
            ${editor.isActive("italic") ? "btn-primary" : "btn-outline"}
            `}
        >
          <FaItalic />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleList("bulletList", "listItem").run();
          }}
          className={`
            btn 
            ${editor.isActive("bulletList") ? "btn-primary" : "btn-outline"}
            `}
        >
          <HiListBullet />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleList("orderedList", "listItem").run();
          }}
          className={`
            btn 
            ${editor.isActive("orderedList") ? "btn-primary" : "btn-outline"}
            `}
        >
          <RiListOrdered />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleStrike().run();
          }}
          className={`
            btn 
            ${editor.isActive("strike") ? "btn-primary" : "btn-outline"}
            `}
        >
          <FaStrikethrough />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={`
            btn 
            ${editor.isActive("codeBlock") ? "btn-primary" : "btn-outline"}
            `}
        >
          <RiCodeBlock />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().setHorizontalRule().run();
          }}
          className={`
            btn 
            ${editor.isActive("hr") ? "btn-primary" : "btn-outline"}
            `}
        >
          <GoHorizontalRule />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().setHardBreak().run();
          }}
          className={`
            btn 
            ${editor.isActive("br") ? "btn-primary" : "btn-outline"}
            `}
        >
          <VscNewline />
        </button>
      </div>
    </div>
  );
}
