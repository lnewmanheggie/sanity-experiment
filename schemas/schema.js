// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// import schemaTypes from 'all:part:@sanity/base/schemaTypes'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: "author",
      title: "Author",
      type: "document",

      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "avatar",
          title: "Avatar",
          type: "image",
        },
      ],
    },
    {
      name: "blog",
      title: "Blog",
      type: "document",

      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => {
            return Rule.required().min(5).max(50);
          },
        },
        {
          name: "subtitle",
          title: "Subtitle",
          type: "string",
        },
        {
          name: "coverImage",
          title: "Cover Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Description",
            },
          ],
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  name: 'position',
                  title: 'Image Position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Center', value: 'center'},
                      {title: 'Left', value: 'left'},
                      {title: 'Right', value: 'right'},
                      
                    ],
                    layout: 'radio',
                    isHilighted: true
                  }
                },
                {
                  type: "text",
                  name: "alt",
                  title: "Description",
                  options: {
                    isHilighted: true,
                  },
                },
              ],
              options: {
                hotspot: true,
              },
            },
            {
              type: "code",
              options: {
                withFilename: true,
              },
            },
          ],
        },
        {
          name: "date",
          title: "Date",
          type: "datetime",
          validation: (Rule) => {
            return Rule.required();
          },
        },
        {
          name: "author",
          title: "Author",
          type: "reference",
          to: [{ type: "author" }], // reference to type author created above
          validation: (Rule) => {
            return Rule.required();
          },
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          validation: (Rule) => {
            return Rule.required().error("This is a custom message");
          },
        },
      ],
    },
  ]),
});
