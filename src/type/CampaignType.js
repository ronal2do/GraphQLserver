// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Campaign',
  description: 'Represents Campaign',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.title,
    },
    slug: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.slug,
    },
    slogan: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.slogan,
    },
    bg: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.bg,
    },
  }),
});
