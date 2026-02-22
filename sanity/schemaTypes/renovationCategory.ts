import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'renovationCategory',
    title: 'Renovation Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'e.g. "Trending Bedroom Renovations"',
            type: 'string',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            description: 'Lower numbers appear first (1, 2, 3…)',
            type: 'number',
        }),
        defineField({
            name: 'images',
            title: 'Carousel Images',
            description: 'Add the renovation photos for this category. These will appear in the homepage carousel.',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Describe the image for accessibility',
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'images.0',
        },
    },
})
