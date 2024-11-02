export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fieldsets: [
    { name: 'main', title: 'Main Information', options: { columns: 2 } },
    { name: 'media', title: 'Media', options: { columns: 2 } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
    { name: 'related', title: 'Related Links', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Main Information
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().min(5).max(100),
      fieldset: 'main',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
      fieldset: 'main',
    },
    {
      name: 'author',
      title: '', // Hides the label
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required(),
      fieldset: 'main',
      options: {
        layout: 'dropdown',
        width: 50,
      },
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Published at',
      validation: Rule => Rule.required(),
      fieldset: 'main',
    },

    // Media Information
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
      validation: Rule => Rule.required().min(20).max(200),
      fieldset: 'media',
      rows: 4, // Sets height to approximately two rows
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
      fieldset: 'media',
      options: {
        layout: 'tags', // Layout for a compact, multi-line tag editor
      },
    },
    {
      name: 'titleImage',
      title: 'Title Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'media',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    },

    // Related Links
    {
      name: 'relatedLinks',
      title: 'Related Links',
      type: 'array',
      fieldset: 'related',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Link Title',
              validation: Rule => Rule.required().min(1).max(100),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: Rule => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }),
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        },
      ],
    },

    // SEO Information
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title (for SEO)',
      description: 'Optional SEO title for search engines',
      validation: Rule => Rule.max(60),
      fieldset: 'seo',
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description (for SEO)',
      description: 'Optional meta description for search engines',
      validation: Rule => Rule.max(160),
      fieldset: 'seo',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords (for SEO)',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      fieldset: 'seo',
    },

    // Read Time at the End
    {
      name: 'readTime',
      type: 'number',
      title: 'Approximate Read Time (minutes)',
      description: 'Estimated reading time in minutes',
      validation: Rule => Rule.min(1).integer(),
      readOnly: true,
    },
  ],
};
