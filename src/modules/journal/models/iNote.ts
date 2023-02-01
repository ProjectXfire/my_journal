export interface INote {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageURLs: IImagsURL[];
}

export interface IImagsURL {
  secure_url: string;
  public_id: string;
}

export interface IPreviewImage {
  imageData: File;
}
