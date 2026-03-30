export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categories: string[];
  image: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
    email: string;
  };
  date: string;
  readTime: string;
  content?: string;
}

const defaultAuthor = {
  name: "The Recap Report",
  avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png",
  email: "info@therecapreport.com",
};

export const articles: Article[] = [];

export const categories = [
  "Entertainment",
  "Lifestyle",
  "Business",
  "Health And Beauty",
  "Top 10",
];
