// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import {
  globalIdField,
  connectionArgs,
  fromGlobalId,
} from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';


import MeType from './MeType';

import UserType from './UserType';
import UserLoader from '../loader/UserLoader';
import UserConnection from '../connection/UserConnection';

import PostType from './PostType';
import PostLoader from '../loader/PostLoader';
import PostConnection from '../connection/PostConnection';

import CampaignType from './CampaignType';
import CampaignLoader from '../loader/CampaignLoader';
import CampaignConnection from '../connection/CampaignConnection';

export default new GraphQLObjectType({
  name: 'Viewer',
  description: '...',
  fields: () => ({
    id: globalIdField('Viewer'),
    me: {
      type: MeType,
      resolve: (root, args, { user }) => user,
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, { user }) => {
        const { id } = fromGlobalId(args.id);
        return UserLoader.load(user, id);
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, { user }) => UserLoader.loadUsers(user, args),
    },

    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, { post }) => {
        const { id } = fromGlobalId(args.id);
        return PostLoader.load(post, id);
      },
    },
    posts: {
      type: PostConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, { post }) => PostLoader.loadPosts(post, args),
    },

    campaign: {
      type: CampaignType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, { campaign }) => {
        const { id } = fromGlobalId(args.id);
        return CampaignLoader.load(campaign, id);
      },
    },
    campaigns: {
      type: CampaignConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, { campaign }) => CampaignLoader.loadCampaigns(campaign, args),
    },

  }),
  interfaces: () => [NodeInterface],
});
