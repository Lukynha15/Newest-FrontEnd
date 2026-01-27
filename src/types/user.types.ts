export interface User {
  id: number;
  name: string;
  avatar?: string;
  createdAt: string;
  bio: string;
  email: string;
  totalPosts: number;
}

export interface UserSettings {
  id: number;
  name: string;
  avatar?: string;
  bio: string;
  email: string;
  password: string;
}
