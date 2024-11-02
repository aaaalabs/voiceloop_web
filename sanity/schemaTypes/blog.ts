export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Published at',
    },   
    {
      name: 'readTime',
      type: 'number',
      title: 'Approximate Read Time (minutes)',
      description: 'Estimated reading time in minutes',
      validation: Rule => Rule.min(1).integer(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
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
      of: [{type: 'block'}],
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
  ],
}
