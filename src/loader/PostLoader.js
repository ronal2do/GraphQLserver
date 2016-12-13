// @flow

import DataLoader from 'dataloader';
import ConnectionFromMongoCursor from '../connection/ConnectionFromMongoCursor';
import PostModel from '../model/Post';

type PostType = {
  id: string,
  _id: string,
  title: string,
  type: string,
  text: string,
  file: string,
  classe: string,
}

export default class Post {
  id: string;
  _id: string;
  title: string;
  type: string;
  text: string;
  file: string;
  classe: string;

  static PostLoader = new DataLoader(
    ids => Promise.all(
      ids.map(id =>
        PostModel.findOne({ _id: id })
      ),
    ),
  );

  constructor(data: PostType) {
    this.id = data.id;
    this._id = data._id;
    this.title = data.title;
    this.type = data.type;
    this.text = data.text;
    this.file = data.file;
    this.classe = data.classe;
  }

  static viewerCanSee(viewer, data) {
    // TODO: handle security

    return true;
  }

  static async load(viewer, id) {
    const data = await Post.PostLoader.load(id);

    return Post.viewerCanSee(viewer, data) ? new Post(data) : null;
  }

  static clearCache(id) {
    return Post.PostLoader.clear(id.toString());
  }

  static async loadPosts(viewer, args) {
    // TODO: load multiple rows

    const posts = PostModel.find({});

    return ConnectionFromMongoCursor.connectionFromMongoCursor(
      viewer, posts, args, Post.load,
    );
  }

}
