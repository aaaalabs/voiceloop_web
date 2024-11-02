import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { deskTool } from 'sanity/desk'

export default defineConfig({
  name: 'default',
  title: 'voiceloop cms',

  projectId: 'hcqkmtjj',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), deskTool()],

  schema: {
    types: schemaTypes,
  }
})
