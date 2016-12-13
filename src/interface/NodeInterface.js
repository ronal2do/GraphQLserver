// @flow

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import ViewerLoader from '../loader/ViewerLoader';
import ViewerType from '../type/ViewerType';

import UserLoader from '../loader/UserLoader';
import UserType from '../type/UserType';

import CampaignLoader from '../loader/CampaignLoader';
import CampaignType from '../type/CampaignType';

import PostLoader from '../loader/PostLoader';
import PostType from '../type/PostType';


const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, { user }) => {
    const { id, type } = fromGlobalId(globalId);

    // console.log('id, type: ', type, id, globalId);
    if (type === 'User') {
      return await UserLoader.load(user, id);
    }
    if (type === 'Post') {
      return await PostLoader.load(post, id);
    }
    if (type === 'Campaign') {
      return await CampaignLoader.load(campaign, id);
    }
    if (type === 'Viewer') {
      return await ViewerLoader.load(id);
    }
  },
  // A method that maps from an object to a type
  (obj) => {
    // console.log('obj: ', typeof obj, obj.constructor);
    if (obj instanceof UserLoader) {
      return UserType;
    }
    if (obj instanceof PostLoader) {
      return PostType;
    }
    if (obj instanceof CampaignLoader) {
      return CampaignType;
    }
    if (obj instanceof ViewerLoader) {
      return ViewerType;
    }
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
