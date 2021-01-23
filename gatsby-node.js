/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can deletethis file if you're not using it


//zorgt ervoor dat wij een nieuwe veld kunnen gebruiken in wpqraql
//dats gatsby implenteerd 
//waar door wij een imagefile kunnen
//aan de hand van dit stukje codee worden de images vanuit wpgraphql omgezet tot images waarop gatsby image optimization kan toepassen

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
