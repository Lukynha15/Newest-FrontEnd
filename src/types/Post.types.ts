export interface PostDTO {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  isLiked: boolean;
  likes: number;
  comments: number;
  author: {
    name: string;
  };
}
