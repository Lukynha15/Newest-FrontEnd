export interface PostDTO {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  likes: number;
  comments: number;
  author: {
    id: string;
    name: string;
  };
}
