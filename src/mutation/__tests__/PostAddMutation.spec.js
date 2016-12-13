import { graphql } from 'graphql';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';

import User from '../model/User';
import Post from '../model/Post';

beforeEach(async () => await setupTest());

it('should not allow anonymous user', async () => {
  const query = `
    mutation M {
      PostAdd(input: {
        title: "Example value"
        type: "Example value"
        text: "Example value"
        file: "Example value"
        classe: "Example value"
      }) {
        postEdge {
          node {
            title
            type
            text
            file
            classe
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
      PostAdd(input: {
        title: "Example value"
        type: "Example value"
        text: "Example value"
        file: "Example value"
        classe: "Example value"
      }) {
        postEdge {
          node {
            title
            type
            text
            file
            classe
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
