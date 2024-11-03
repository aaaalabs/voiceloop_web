import { Rule } from 'sanity';

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
      description: 'The main title of the blog post.',
      validation: (Rule: Rule) => Rule.min(5).max(100),
      fieldset: 'main',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
      fieldset: 'main',
    },
    {
      name: 'author',
      title: '', // Hide the label
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: Rule) => Rule.required(),
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
      validation: (Rule: Rule) => Rule.required(),
      fieldset: 'main',
      initialValue: () => new Date().toISOString(), // Pre-fill with the current date
    },

    // Media Information
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
      description: 'A short excerpt for preview.',
      validation: (Rule: Rule) => Rule.required().min(20).max(200),
      fieldset: 'media',
      rows: 4, // Sets height to two rows
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
      validation: (Rule: Rule) => Rule.required().min(1), // Ensures at least one topic is selected
      fieldset: 'media',
      options: {
        layout: 'tags',
      },
      initialValue: [] // Default to an empty array
    },
    {
      name: 'titleImage',
      title: 'Title Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'media',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            {
              name: 'videoFile',
              type: 'string',
              title: 'Video File Name',
              description: 'Enter the name of the video file from your videos folder (e.g., "connect.mp4")',
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the video'
            }
          ],
          preview: {
            select: {
              title: 'videoFile',
              subtitle: 'caption'
            },
            prepare({ title, subtitle }: { title: string, subtitle: string }) {
              return {
                title: 'Video: ' + title,
                subtitle: subtitle || ''
              }
            }
          }
        },
        {
          type: 'object',
          name: 'spotifyEmbed',
          title: 'Spotify Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Spotify URL',
              description: 'Enter the Spotify URL (track, album, or playlist)',
              validation: (Rule: Rule) => Rule.required().uri({
                scheme: ['https']
              })
            },
            {
              name: 'type',
              type: 'string',
              title: 'Embed Type',
              options: {
                list: [
                  { title: 'Track', value: 'track' },
                  { title: 'Album', value: 'album' },
                  { title: 'Playlist', value: 'playlist' }
                ]
              },
              validation: (Rule: Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'url'
            },
            prepare({ title }: { title: string }) {
              return {
                title: 'Spotify Embed',
                subtitle: title
              }
            }
          }
        },
        {
          type: 'object',
          name: 'youtubeEmbed',
          title: 'YouTube Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              description: 'Enter the YouTube video URL',
              validation: (Rule: Rule) => Rule.required().uri({
                scheme: ['https']
              })
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the video'
            }
          ],
          preview: {
            select: {
              title: 'url',
              subtitle: 'caption'
            },
            prepare({ title, subtitle }: { title: string, subtitle: string }) {
              return {
                title: 'YouTube Video',
                subtitle: subtitle || title
              }
            }
          }
        }
      ],
      validation: (Rule: Rule) => Rule.required()
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
              validation: (Rule: Rule) => Rule.required().min(1).max(100),
              initialValue: 'Related Link'
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule: Rule) => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }),
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        },
      ],
      initialValue: [], // Default to an empty array
    },

    // SEO Information
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title (for SEO)',
      description: 'Optional SEO title for search engines',
      validation: (Rule: Rule) => Rule.max(60),
      fieldset: 'seo',
      initialValue: 'Untitled Blog Post' // Default placeholder title for SEO
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description (for SEO)',
      description: 'Optional meta description for search engines',
      validation: (Rule: Rule) => Rule.max(160),
      fieldset: 'seo',
      initialValue: 'This post explores the latest updates and insights on AI and human connection.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords (for SEO)',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      fieldset: 'seo',
      initialValue: ['AI', 'human connection'], // Example default keywords
    },

    // Read Time at the End
    {
      name: 'readTime',
      type: 'number',
      title: 'Approximate Read Time (minutes)',
      description: 'Estimated reading time in minutes',
      validation: (Rule: Rule) => Rule.min(1).integer(),
      readOnly: false,
      initialValue: 5, // Default to a minimum read time of 5 minutes
    },
  ],
};
