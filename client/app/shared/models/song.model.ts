export class Song {
  // tslint:disable-next-line: variable-name
  public constructor(
    public _id?: string,
    public title?: string,
    public key?: string,
    public videoSrc?: string | ArrayBuffer
  ) {
    this._id = _id;
    this.title = title;
    this.key = key;
    this.videoSrc = videoSrc;
  }
}
