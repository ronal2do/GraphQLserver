// @flow

import DataLoader from 'dataloader';
import ConnectionFromMongoCursor from '../connection/ConnectionFromMongoCursor';
import CampaignModel from '../model/Campaign';

type CampaignType = {
  id: string,
  _id: string,
  title: string,
  slug: string,
  slogan: string,
  bg: string,
}

export default class Campaign {
  id: string;
  _id: string;
  title: string;
  slug: string;
  slogan: string;
  bg: string;

  static CampaignLoader = new DataLoader(
    ids => Promise.all(
      ids.map(id =>
        CampaignModel.findOne({ _id: id })
      ),
    ),
  );

  constructor(data: CampaignType) {
    this.id = data.id;
    this._id = data._id;
    this.title = data.title;
    this.slug = data.slug;
    this.slogan = data.slogan;
    this.bg = data.bg;
  }

  static viewerCanSee(viewer, data) {
    // TODO: handle security

    return true;
  }

  static async load(viewer, id) {
    const data = await Campaign.CampaignLoader.load(id);

    return Campaign.viewerCanSee(viewer, data) ? new Campaign(data) : null;
  }

  static clearCache(id) {
    return Campaign.CampaignLoader.clear(id.toString());
  }

  static async loadCampaigns(viewer, args) {
    // TODO: load multiple rows

    const campaigns = CampaignModel.find({});

    return ConnectionFromMongoCursor.connectionFromMongoCursor(
      viewer, campaigns, args, Campaign.load,
    );
  }

}
