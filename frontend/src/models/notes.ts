export interface Note {
  _id: string;
  title: string;
  text?: string; // text is optional
  createdAt: string;
  updatedAt: string;
}
