export interface CommentDTO {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    avatar: string | null;
  };
}