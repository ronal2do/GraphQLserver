// @flow

import { connectionDefinitions } from 'graphql-relay';

import CampaignType from '../type/CampaignType';

export default connectionDefinitions({
  name: 'Campaign',
  nodeType: CampaignType,
});
