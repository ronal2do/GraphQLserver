// @flow

import { connectionDefinitions } from 'graphql-relay';

import PostType from '../type/PostType';

export default connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
