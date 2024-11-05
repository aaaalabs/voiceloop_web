export default {
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
        storeOriginalFilename: true,
      },
      validation: (Rule: any) => 
        Rule.required().custom((file: any) => {
          if (!file?.asset?._ref) {
            return 'Audio file is required';
          }
          if (!file.asset._ref.startsWith('file-')) {
            return 'Please upload an audio file';
          }
          return true;
        })
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      type: 'string',
      title: 'Duration',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'episodeNumber',
      type: 'number',
      title: 'Episode Number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    },
  ],
  orderings: [
    {
      title: 'Episode Number, New',
      name: 'episodeNumberDesc',
      by: [{ field: 'episodeNumber', direction: 'desc' }],
    },
  ],
}; 