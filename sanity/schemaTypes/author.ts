// author.ts
export default {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Full Name',
        type: 'string',
      },
      {
        name: 'shortName',
        title: 'Short Name / Alias',
        type: 'string',
        description: 'A short version of the author\'s name or a username to display in dropdowns.',
      },
      {
        name: 'profilePicture',
        title: 'Profile Picture',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'bio',
        title: 'Biography',
        type: 'text',
      },
    ],
    preview: {
      select: {
        title: 'shortName',
        subtitle: 'name',
        media: 'profilePicture',
      },
    },
  };
  