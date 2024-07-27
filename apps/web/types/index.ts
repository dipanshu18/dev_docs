export interface CreateBlog {
  thumbnail: undefined | File | string;
  title: string;
  content: string;
  type: "draft" | "publish";
}

export interface Blog {
  id: string;
  title: string;
  thumbnail: string;
  body: string;
  userId: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
