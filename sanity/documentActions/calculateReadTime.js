import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'hcqkmtjj', // replace with your project ID
  dataset: 'production', // replace with your dataset
  apiVersion: '2023-01-01', // use a recent date to ensure compatibility
  useCdn: false, // set to true for faster, cached reads in production
})

export default function CalculateReadTimeOnPublishAction(props) {
  return {
    label: 'Publish with Read Time',
    onHandle: async () => {
      const content = props.draft?.content || []
      const wordCount = content
        .filter(block => block._type === 'block')
        .map(block => block.children.map(child => child.text).join(' '))
        .join(' ')
        .split(/\s+/).length

      const readTime = Math.ceil(wordCount / 200)

      // Patch the `readTime` field directly using the Sanity client
      await client
        .patch(props.id)
        .set({ readTime })
        .commit()

      // Complete the publish action
      props.onComplete()
    }
  }
}
