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

import Campaign from '../model/Campaign';

import CampaignType from '../type/CampaignType';
import CampaignLoader from '../loader/CampaignLoader';

export default mutationWithClientMutationId({
  name: 'CampaignEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
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
      id,
      title,
      slug,
      slogan,
      bg,
    } = args;

    // Check if the provided ID is valid
    const campaign = await Campaign.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!campaign) {
      throw new Error('Invalid campaignId');
    }

    // TODO: mutation logic

    // Clear dataloader cache
    CampaignLoader.clearCache(campaign._id);

    return {
      id: campaign._id,
      error: null,
    };
  },
  outputFields: {
    campaign: {
      type: CampaignType,
      resolve: (obj, args, { user }) => CampaignLoader.load(user, obj.id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
