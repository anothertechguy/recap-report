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
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "More Than a Network: How Angel Livas Is Building Space, Power, and Ownership for Black Creators",
    excerpt: "There are moments in culture when someone quietly builds the kind of infrastructure that changes everything — not overnight, not loudly, but steadily, intentionally, and with purpose rooted in community.",
    category: "Business",
    categories: ["Business", "Entertainment", "Featured", "Trending"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/03/Angel-Livas-at-ALIVE-Studios-032d05a7.jpg",
    slug: "angel-livas-building-space-power-ownership",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "March 15, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Nine Losses, Two Brain Surgeries, One Mission: Rachell Dumas Is Changing How Women Are Heard in Healthcare",
    excerpt: "A powerful story of resilience, advocacy, and the fight for women's health equity in a system that often fails to listen.",
    category: "Health & Beauty",
    categories: ["Health and Beauty", "Business", "Lifestyle"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/a8/RachellDumas3-a8c572fa.webp",
    slug: "rachell-dumas-changing-women-healthcare",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "March 12, 2026",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "\"They Didn't Listen\": Why So Many Black Patients Leave the Doctor Feeling Dismissed",
    excerpt: "An investigation into systemic healthcare bias and the voices demanding change in how Black patients are treated.",
    category: "Health & Beauty",
    categories: ["Education", "Health and Beauty", "Influential People", "Lifestyle"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/d7/IMG_6771-d78e28a3.jpeg",
    slug: "black-patients-feeling-dismissed",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "March 10, 2026",
    readTime: "7 min read",
  },
  {
    id: "4",
    title: "Aaliyah Duah Is Making Financial Literacy Fun — And Gen Z Is Finally Listening",
    excerpt: "At just 22, Aaliyah Duah is turning complex financial concepts into engaging content that resonates with an entire generation.",
    category: "Business",
    categories: ["Business", "Education", "Entertainment"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/a7/1677797533591-a752c5f0.jpg",
    slug: "aaliyah-duah-financial-literacy-gen-z",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "March 8, 2026",
    readTime: "5 min read",
  },
  {
    id: "5",
    title: "Beyond the Spin: Kayla Tucker Adams on Power, Purpose, and Telling the Truth in Public Relations",
    excerpt: "A candid conversation about navigating power, purpose, and authenticity in the world of public relations.",
    category: "Business",
    categories: ["Business", "Education", "Entertainment", "Influential People"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/36/kayla-t-adams-36012740.webp",
    slug: "kayla-tucker-adams-public-relations",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "March 5, 2026",
    readTime: "6 min read",
  },
  {
    id: "6",
    title: "Inside the World of Mychel \"Snoop\" Dillard: Healing, Hustle & Snooping 4 Love",
    excerpt: "From healing to hustle, Mychel Dillard opens up about building an empire rooted in love, resilience, and authenticity.",
    category: "Entertainment",
    categories: ["Business", "Entertainment", "Lifestyle"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/ac/0C81BEF1-1A41-4C6F-9E3B-83EF19F5865B-ac421de6.jpeg",
    slug: "mychel-snoop-dillard-healing-hustle",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "March 3, 2026",
    readTime: "7 min read",
  },
  {
    id: "7",
    title: "From Classroom to Kitchen: How Vanetta Roy Built Atlanta's Beloved \"Eat My Biscuits\"",
    excerpt: "The inspiring story of a teacher-turned-entrepreneur who created one of Atlanta's most beloved food brands.",
    category: "Food",
    categories: ["Business", "Food", "Influential People"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/64/IMG_0076-64707877.jpeg",
    slug: "vanetta-roy-eat-my-biscuits",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "February 28, 2026",
    readTime: "5 min read",
  },
  {
    id: "8",
    title: "Thomas Ricks, #14: From SWAC All-American, to SWAT, to CEO of Executive Protection",
    excerpt: "A remarkable journey from the football field to law enforcement to building a premier executive protection company.",
    category: "Sports",
    categories: ["Business", "Education", "Entertainment", "Sports"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/77/Bricks-Solo-IMG_7585-1-77435e80.jpeg",
    slug: "thomas-ricks-swac-swat-ceo",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "February 25, 2026",
    readTime: "8 min read",
  },
  {
    id: "9",
    title: "Black Maternal Health Is Not Genetics. It's Bias, Delayed Care, and a System That Doesn't Listen",
    excerpt: "Dr. Eboni January explains what must change to address the maternal health crisis affecting Black women across America.",
    category: "Health & Beauty",
    categories: ["Business", "Health and Beauty"],
    image: "https://therecapreport.com/wp-content/uploads/yootheme/cache/49/Screenshot-2025-12-18-at-10.51.02-AM-49f5e770.png",
    slug: "black-maternal-health-bias-delayed-care",
    author: { name: "The Recap Report", avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png", email: "info@therecapreport.com" },
    date: "February 22, 2026",
    readTime: "9 min read",
  },
];

export const trendingHeadlines = [
  "Angel Livas Is Building Space & Ownership for Black Creators",
  "Rachell Dumas Is Changing How Women Are Heard in Healthcare",
  "Why So Many Black Patients Leave the Doctor Feeling Dismissed",
  "Aaliyah Duah Is Making Financial Literacy Fun for Gen Z",
  "Kayla Tucker Adams on Power & Truth in Public Relations",
  "Vanetta Roy Built Atlanta's Beloved 'Eat My Biscuits'",
  "Thomas Ricks: From SWAC All-American to CEO",
];

export const categories = [
  "Entertainment",
  "Lifestyle",
  "Business",
  "Health & Beauty",
  "Top 10",
  "Education",
  "Sports",
  "Food",
];
