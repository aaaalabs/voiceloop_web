import { Rule } from 'sanity';

export default {
  name: 'legal',
  title: 'Legal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'version',
      title: 'Version',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    }
  ]
} 