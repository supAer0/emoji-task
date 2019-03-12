export interface IEmoji {
  name: string;
  url: string;
  isLike?: boolean;
  isDelete?: boolean;
}

export class Emoji implements IEmoji {
  name: string;
  url: string;
  isLike: boolean;
  isDelete: boolean;
  constructor(name: string, url: string, isLike: boolean, isDelete: boolean) {
      this.name = name;
      this.url = url;
      this.isLike = isLike;
      this.isDelete= isDelete;
  }
}