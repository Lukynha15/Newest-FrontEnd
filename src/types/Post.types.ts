export interface PostDTO {
  id: string;
  createdAt: Date;
  title: string;
  images?: string[];
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