import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { useEffect } from "react"

interface AnnouncementEditorProps {
  content: string
  onChange: (html: string) => void
}

function Btn({
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

export function AnnouncementEditor({ content, onChange }: AnnouncementEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content && editor.isEmpty) {
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

  return (
    <div className="rounded-lg border border-ui-border-base overflow-hidden">
      <div className="flex items-center gap-0.5 border-b border-ui-border-base bg-ui-bg-subtle px-2 py-1">
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </Btn>
        <span className="mx-1 h-4 w-px bg-ui-border-base" />
        <Btn onClick={addLink} active={editor.isActive("link")} title="Add Link">
          Link
        </Btn>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-3 py-2 min-h-[60px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[40px]"
      />
    </div>
  )
}
