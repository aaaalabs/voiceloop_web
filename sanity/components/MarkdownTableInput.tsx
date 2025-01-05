import React from 'react'
import { Box, TextArea } from 'sanity'

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
    <Box paddingY={3}>
      <TextArea
        ref={ref}
        onChange={handleChange}
        placeholder="Paste your markdown table here..."
        rows={10}
      />
    </Box>
  )
})

MarkdownTableInput.displayName = 'MarkdownTableInput' 