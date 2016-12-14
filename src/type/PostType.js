// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Post',
  description: 'Represents Post',
  fields: () => ({
    id: globalIdField('Post'),
    _id: {
      type: GraphQLString,
      resolve: obj => obj._id,
    },
    title: {
      type: GraphQLString,
      resolve: obj => obj.title,
    },
    type: {
      type: GraphQLString,
      resolve: obj => obj.type,
    },
    text: {
      type: GraphQLString,
      resolve: obj => obj.text,
    },
    file: {
      type: GraphQLString,
      resolve: obj => obj.file,
    },
    classe: {
      type: GraphQLString,
      resolve: obj => obj.classe,
    },
  }),
});
