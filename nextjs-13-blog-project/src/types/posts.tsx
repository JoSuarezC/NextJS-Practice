export interface BasePost {
  title: string,
  image: string,
  excerpt: string,
  date: string,
  isFeatured: boolean,
}

export interface Post extends BasePost{
  _id: string,
  content: string,
};
