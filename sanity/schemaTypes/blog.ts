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
          name: 'table',
          title: 'Table',
          components: {
            input: '../components/MarkdownTableInput'
          },
          fields: [
            {
              name: 'rows',
              type: 'array',
              title: 'Rows',
              of: [
                {
                  type: 'object',
                  name: 'row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      title: 'Cells',
                      of: [{ type: 'string' }]
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              rows: 'rows'
            },
            prepare(value: { rows?: { cells: string[] }[] }) {
              const { rows } = value;
              return {
                title: 'Table',
                subtitle: `${rows?.length || 0} rows`
              };
            }
          }
        },
        {
          type: 'object',
          name: 'horizontalRule',
          title: 'Horizontal Rule',
          fields: [
            {
              name: 'style',
              type: 'string',
              title: 'Style',
              options: {
                list: [
                  { title: 'Solid', value: 'solid' },
                  { title: 'Dashed', value: 'dashed' },
                  { title: 'Dotted', value: 'dotted' }
                ]
              },
              initialValue: 'solid'
            },
            {
              name: 'spacing',
              type: 'string',
              title: 'Spacing',
              options: {
                list: [
                  { title: 'Small', value: 'sm' },
                  { title: 'Medium', value: 'md' },
                  { title: 'Large', value: 'lg' }
                ]
              },
              initialValue: 'md'
            }
          ],
          preview: {
            prepare() {
              return {
                title: 'Horizontal Rule'
              }
            }
          }
        },
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
              validation: (Rule: Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Connect Video', value: 'connect.mp4' },
                  { title: 'Placeholder Video', value: 'placerholder_video.mp4' }
                ]
              }
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the video'
            },
            {
              name: 'autoPlay',
              type: 'boolean',
              title: 'Auto Play',
              initialValue: false
            },
            {
              name: 'loop',
              type: 'boolean',
              title: 'Loop Video',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'videoFile',
              subtitle: 'caption'
            },
            prepare({ title, subtitle }: { title: string, subtitle?: string }) {
              return {
                title: `Video: ${title}`,
                subtitle: subtitle || '',
                media: null
              }
            }
          }
        },
        {
          type: 'object',
          name: 'spotifyEmbed',
          title: 'Spotify',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Spotify URL',
              description: 'Enter the Spotify URL (track, album, playlist, or episode)',
              validation: (Rule: Rule) => Rule.required().custom((url: string) => {
                if (!url) return true;
                const pattern = /^https:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/[a-zA-Z0-9]+(\?.*)?$/;
                if (!pattern.test(url)) {
                  return 'Please enter a valid Spotify URL';
                }
                return true;
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
            },
            {
              name: 'theme',
              type: 'string',
              title: 'Theme',
              options: {
                list: [
                  { title: 'Light', value: 'light' },
                  { title: 'Dark', value: 'dark' }
                ]
              },
              initialValue: 'light'
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
          title: 'YouTube',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              description: 'Enter the YouTube video URL',
              validation: (Rule: Rule) => Rule.required().custom((url: string) => {
                if (!url) return true;
                const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
                if (!pattern.test(url)) {
                  return 'Please enter a valid YouTube URL';
                }
                return true;
              })
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the video'
            },
            {
              name: 'aspectRatio',
              type: 'string',
              title: 'Aspect Ratio',
              options: {
                list: [
                  { title: '16:9', value: '16:9' },
                  { title: '4:3', value: '4:3' },
                  { title: '1:1', value: '1:1' }
                ]
              },
              initialValue: '16:9'
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
        },
        {
          type: 'object',
          name: 'imageEmbed',
          title: 'Img',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'],
                storeOriginalFilename: true,
                accept: '.jpg,.jpeg,.png,.gif,.webp'
              },
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility',
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image'
            },
            {
              name: 'layout',
              type: 'string',
              title: 'Layout',
              options: {
                list: [
                  { title: 'Full Width', value: 'full' },
                  { title: 'Center', value: 'center' },
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' }
                ]
              },
              initialValue: 'full'
            }
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'caption',
              media: 'image'
            },
            prepare({ title, subtitle, media }: { title: string | undefined, subtitle: string | undefined, media: any }) {
              return {
                title: 'Image: ' + (title || 'Untitled'),
                subtitle: subtitle || '',
                media: media
              }
            }
          }
        },
        {
          type: 'object',
          name: 'relatedLinksSection',
          title: 'Related Links Section',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              initialValue: 'Related Links'
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      type: 'string',
                      title: 'Link Title',
                      validation: (Rule: Rule) => Rule.required()
                    },
                    {
                      name: 'url',
                      type: 'url',
                      title: 'URL',
                      validation: (Rule: Rule) => Rule.required()
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title'
            },
            prepare({ title = 'Untitled' }) {
              return {
                title: 'Related Links: ' + title,
                media: null  // Optional: add if you want an icon
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
          preview: { title: 'title', subtitle: 'url' },
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
