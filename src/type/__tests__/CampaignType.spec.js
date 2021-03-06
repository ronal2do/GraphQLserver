import { graphql } from 'graphql';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';
import {
  User,
  Campaign,
} from '../../model';

beforeEach(async () => await setupTest());

it('should retrieve a record', async () => {
  const user = await new User({
    name: 'user',
    email: 'user@example.com',
  }).save();

  // TODO: query to return a record
  const query = `
    query Q {
      node(id:"123") {
        id
      }
    }
  `;

  const rootValue = {};
  const context = { user };

  const { errors, data } = await graphql(schema, query, rootValue, context);

  expect(data.node).toBe(null);
  expect(errors).toBe(undefined);
});
