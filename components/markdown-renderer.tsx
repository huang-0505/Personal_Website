"use client"

import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Pre-process content to fix common markdown issues
  const processedContent = content
    // Fix standalone bullet points by ensuring they're part of list items
    .replace(/^•\s*$/gm, "") // Remove standalone bullet points
    .replace(/^•\s+(.+)/gm, "- $1") // Convert • to proper markdown lists
    // Fix any double line breaks that might cause issues
    .replace(/\n\n\n+/g, "\n\n")

  return (
    <ReactMarkdown
      className="max-w-none"
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-2 ml-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-2 ml-2">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        code: ({ children }) => (
          <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {children}
          </a>
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}
