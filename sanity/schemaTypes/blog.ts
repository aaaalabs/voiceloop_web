export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().min(5).max(100),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Published at',
      validation: Rule => Rule.required(),
    },
    {
      name: 'readTime',
      type: 'number',
      title: 'Approximate Read Time (minutes)',
      description: 'Estimated reading time in minutes',
      validation: Rule => Rule.min(1).integer(),
      readOnly: true, // Makes the field view-only
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topic' }],
        },
      ],
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
      validation: Rule => Rule.required().min(20).max(200),
    },
    {
      name: 'titleImage',
      title: 'Title Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'relatedLinks',
      title: 'Related Links',
      type: 'array',
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
            select: {
              title: 'title',
              subtitle: 'url',
            },
          },
        },
      ],
    },
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title (for SEO)',
      description: 'Optional SEO title for search engines',
      validation: Rule => Rule.max(60),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description (for SEO)',
      description: 'Optional meta description for search engines',
      validation: Rule => Rule.max(160),
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords (for SEO)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
};
