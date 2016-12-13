import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';

import User from '../model/User';
import Campaign from '../model/Campaign';

beforeEach(async () => await setupTest());

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Campaign
  const campaign = new Campaign({
    title: 'Example value',
    slug: 'Example value',
    slogan: 'Example value',
    bg: 'Example value',
  });

  await campaign.save();

  const campaignId = toGlobalId('Campaign', campaign._id);

  const query = `
    mutation M {
      CampaignEdit(input: {
        id: "${campaignId}"
        example: "Example Field to Update"
      }) {
        campaign {
          node {
            title
            slug
            slogan
            bg
          }
        }
      }
    }
  `;

  const rootValue = {};
  // No user should be passed to context since we are testing an anonymous session
  const context = {};

  const result = await graphql(schema, query, rootValue, context);

  expect(result).toMatchSnapshot();
});

it('should edit a record on database', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });

  await user.save();

  // TODO: specify fields to create a new Campaign
  const campaign = new Campaign({
    title: 'Example value',
    slug: 'Example value',
    slogan: 'Example value',
    bg: 'Example value',
  });

  await campaign.save();

  const campaignId = toGlobalId('Campaign', campaign._id);

  const query = `
    mutation M {
      CampaignEdit(input: {
        id: "${campaignId}"
        example: "Example Field to Update"
      }) {
        campaign {
          node {
            title
            slug
            slogan
            bg
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = { user };

  const result = await graphql(schema, query, rootValue, context);

  expect(result).toMatchSnapshot();
});
