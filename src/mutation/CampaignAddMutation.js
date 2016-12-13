// @flow

import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import {
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import Campaign from '../model/Campaign';

import CampaignLoader from '../loader/CampaignLoader';
import CampaignConnection from '../connection/CampaignConnection';

export default mutationWithClientMutationId({
  name: 'CampaignAdd',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    slogan: {
      type: new GraphQLNonNull(GraphQLString),
    },
    bg: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args, { user }) => {
    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const {
      title,
      slug,
      slogan,
      bg,
    } = args;

    // TODO: mutation logic

    return {
      // id: id, // ID of the newly created row
      error: null,
    };
  },
  outputFields: {
    campaignEdge: {
      type: CampaignConnection.edgeType,
      resolve: async({ id }, args, { user }) => {
        // TODO: load new edge from loader

        const campaign = await CampaignLoader.load(
          user, id
        );

        // Returns null if no node was loaded
        if (!campaign) {
          return null;
        }

        return {
          cursor: toGlobalId('campaign', campaign),
          node: campaign,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
