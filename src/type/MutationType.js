// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmail';
import ChangePassword from '../mutation/ChangePasswordMutation';

import PostAdd from '../mutation/PostAddMutation';
import PostEdit from '../mutation/PostEditMutation';

import CampaignAdd from '../mutation/CampaignAddMutation';
import CampaignEdit from '../mutation/CampaignEditMutation';


export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,
    PostAdd,
    PostEdit,
    CampaignAdd,
    CampaignEdit,
  }),
});
