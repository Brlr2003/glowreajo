import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextStyle from "@tiptap/extension-text-style"
import { Extension } from "@tiptap/react"
import { useEffect } from "react"

const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el: HTMLElement) => el.style.fontSize || null,
            renderHTML: (attrs: Record<string, any>) => {
              if (!attrs.fontSize) return {}
              return { style: `font-size: ${attrs.fontSize}` }
            },
          },
        },
      },
    ]
  },
})

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
        active
          ? "bg-ui-bg-base-pressed text-ui-fg-base"
          : "text-ui-fg-subtle hover:bg-ui-bg-base-hover"
      }`}
    >
      {children}
    </button>
  )
}

const TEXT_SIZES = [
  { label: "Small", value: "0.875rem" },
  { label: "Normal", value: "" },
  { label: "Large", value: "1.25rem" },
  { label: "XL", value: "1.5rem" },
]

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      TextStyle,
      FontSize,
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content && !editor.getHTML().includes(content.slice(0, 20))) {
      editor.commands.setContent(content)
    }
  }, [])

  if (!editor) return null

  function addLink() {
    const url = prompt("Enter URL:")
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  function addImage() {
    const url = prompt("Enter image URL:")
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  function setFontSize(size: string) {
    if (!size) {
      editor?.chain().focus().unsetMark("textStyle").run()
    } else {
      editor?.chain().focus().setMark("textStyle", { fontSize: size }).run()
    }
  }

  const currentSize = editor.getAttributes("textStyle").fontSize || ""

  return (
    <div className="rounded-lg border border-ui-border-base overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ui-border-base bg-ui-bg-subtle px-2 py-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <s>S</s>
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-ui-border-base" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-ui-border-base" />
        <select
          value={currentSize}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFontSize(e.target.value)}
          className="px-1.5 py-0.5 text-xs rounded border border-ui-border-base bg-ui-bg-base text-ui-fg-subtle cursor-pointer"
          title="Text Size"
        >
          {TEXT_SIZES.map((s) => (
            <option key={s.label} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="mx-1 h-4 w-px bg-ui-border-base" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          &bull; List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          1. List
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-ui-border-base" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          &ldquo; Quote
        </ToolbarButton>
        <ToolbarButton onClick={addLink} active={editor.isActive("link")} title="Add Link">
          Link
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Add Image">
          Image
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-ui-border-base" />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          &mdash;
        </ToolbarButton>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px]"
      />
    </div>
  )
}
