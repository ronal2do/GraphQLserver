// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Campaign',
  description: 'Represents Campaign',
  fields: () => ({
    id: globalIdField('Campaign'),
    _id: {
      type: GraphQLString,
      resolve: obj => obj._id,
    },
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
