// @flow

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import Post from '../model/Post';

import PostType from '../type/PostType';
import PostLoader from '../loader/PostLoader';

export default mutationWithClientMutationId({
  name: 'PostEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
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
      id,
      title,
      type,
      text,
      file,
      classe,
    } = args;

    // Check if the provided ID is valid
    const post = await Post.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!post) {
      throw new Error('Invalid postId');
    }

    // TODO: mutation logic

    // Clear dataloader cache
    PostLoader.clearCache(post._id);

    return {
      id: post._id,
      error: null,
    };
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: (obj, args, { user }) => PostLoader.load(user, obj.id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
