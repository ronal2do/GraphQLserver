// @flow

import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import {
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import Post from '../model/Post';

import PostLoader from '../loader/PostLoader';
import PostConnection from '../connection/PostConnection';

export default mutationWithClientMutationId({
  name: 'PostAdd',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    file: {
      type: GraphQLString,
    },
    classe: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (args, { user }) => {
    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const {
      title,
      type,
      text,
      file,
      classe,
    } = args;

    // TODO: mutation logic

    return {
      // id: id, // ID of the newly created row
      error: null,
    };
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async({ id }, args, { user }) => {
        // TODO: load new edge from loader

        const post = await PostLoader.load(
          user, id
        );

        // Returns null if no node was loaded
        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId('post', post),
          node: post,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
