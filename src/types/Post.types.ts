export interface PostDTO {
  id: string;
  createdAt: Date;
  title: string;
  image?: string;
  content: string;
  isLiked: boolean;
  likes: number;
  comments: number;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}
