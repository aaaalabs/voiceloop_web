import React from 'react'

export const MarkdownTableInput = React.forwardRef<HTMLTextAreaElement, any>((props: any, ref) => {
  const { onChange, value } = props

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const markdownTable = event.target.value
    
    // Parse markdown table
    const rows = markdownTable
      .split('\n')
      .filter(row => row.trim() && !row.includes('|-'))
      .map(row => ({
        cells: row
          .split('|')
          .filter(cell => cell.trim())
          .map(cell => cell.trim())
      }))

    onChange({ rows })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <textarea
        ref={ref}
        onChange={handleChange}
        placeholder="Paste your markdown table here..."
        rows={10}
        style={{ width: '100%', padding: '8px' }}
      />
    </div>
  )
})

MarkdownTableInput.displayName = 'MarkdownTableInput' 