export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  note?: string;
  author: IAuthor;
}

export interface IRegisterData {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ITags {
  tags: string[];
}

export interface IAuthState {
  user: IUser | null;
  signInModalOpen: boolean;
  signUpModalOpen: boolean;
}

export interface IUserData {
  user: IUser;
}

export interface IArticleData {
  article: IArticle;
}

export interface IUser {
  email: string;
  bio: string;
  image: string;
  token: string;
  username: string;
}

export interface IGetCurrentUser {
  user: IUser | null;
}

export interface IGetArticles {
  articles: IArticle[];
  articlesCount: number;
}

