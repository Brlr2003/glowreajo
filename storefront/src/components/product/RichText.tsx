import { cn } from "@/lib/cn"

interface RichTextProps {
  text?: string | null
  className?: string
}

const HTML_TAG_REGEX = /<\/?(p|br|ul|ol|li|h[1-6]|strong|em|b|i|u|a|blockquote|hr|span|div|img)\b/i

function looksLikeHtml(value: string): boolean {
  return HTML_TAG_REGEX.test(value)
}

export function RichText({ text, className }: RichTextProps) {
  if (!text) return null
  if (looksLikeHtml(text)) {
    return (
      <div
        className={cn("product-prose", className)}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  }
  return <p className={cn("whitespace-pre-line", className)}>{text}</p>
}
