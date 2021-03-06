import { graphql } from 'graphql';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';

import User from '../../model/User';
import Campaign from '../../model/Campaign';

beforeEach(async () => await setupTest());

it('should not allow anonymous user', async () => {
  const query = `
    mutation M {
      CampaignAdd(input: {
        title: "Example value"
        slug: "Example value"
        slogan: "Example value"
        bg: "Example value"
      }) {
        campaignEdge {
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

it('should create a record on database', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });

  await user.save();

  const query = `
    mutation M {
      CampaignAdd(input: {
        title: "Example value"
        slug: "Example value"
        slogan: "Example value"
        bg: "Example value"
      }) {
        campaignEdge {
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
