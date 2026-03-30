const fs = require('fs');
const path = require('path');

const exportDir = '/Users/sean/Desktop/Antigravity Projects/recap-report/src/pages export from real site';
const files = fs.readdirSync(exportDir).filter(f => f.endsWith('.json'));

let articlesMap = new Map();

const categoryMap = {
  'Entertainment page.json': 'Entertainment',
  'lifestyle.json': 'Lifestyle',
  'business.json': 'Business',
  'health and beauty.json': 'Health And Beauty'
};

const processFile = (file, cat) => {
  const filePath = path.join(exportDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const markdown = data.data.markdown;
    
    // Robust regex matching: Image URL, Title, Date, Excerpt, Article URL
    const regex = /\[!\[[^\]]*\]\(([^)]+)\)\*\*(.*?)\*\*[\s\S]*?(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}[\s\S]*?\n\n?([\s\S]*?)\[…\][\s\S]*?Read more\]\(([^)]+)\)/g;
    
    let match;
    while ((match = regex.exec(markdown)) !== null) {
      let [_, image, title, month, excerptRaw, link] = match;
      
      // Extract the full date line using an inner match since the month was captured
      const dateString = Array.from(match[0].matchAll(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/g))[0][0];
      
      const slugMatch = link.match(/therecapreport\.com\/(.*?)\/?$/);
      const slug = slugMatch ? slugMatch[1] : link;
      
      // clean excerpt
      let excerpt = excerptRaw.replace(/\\\\/g, '').replace(/\\/g, '').replace(/\n/g, ' ').trim() + "...";
      // fix any leading artifacts in excerpt
      excerpt = excerpt.replace(/^[^\w]+/, '');
      
      if (!articlesMap.has(title)) {
        articlesMap.set(title, {
          title: title.trim(),
          image: image.trim(),
          date: dateString.trim(),
          excerpt: excerpt.trim(),
          slug,
          link,
          category: cat,
          categories: [cat]
        });
      }
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
};

['Entertainment page.json', 'lifestyle.json', 'business.json', 'health and beauty.json'].forEach(file => {
  processFile(file, categoryMap[file]);
});

try {
  const filePath = path.join(exportDir, 'top 10.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const markdown = data.data.markdown;
  
  const regex = /\[!\[[^\]]*\]\(([^)]+)\)\*\*(.*?)\*\*[\s\S]*?(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}[\s\S]*?\n\n?([\s\S]*?)\[…\][\s\S]*?Read more\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    let [_, image, title, month, excerptRaw, link] = match;
    const titleTrimmed = title.trim();
    if (articlesMap.has(titleTrimmed)) {
      const existing = articlesMap.get(titleTrimmed);
      if (!existing.categories.includes('Top 10')) {
        existing.categories.push('Top 10');
      }
    } else {
      const dateString = Array.from(match[0].matchAll(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/g))[0][0];
      const slugMatch = link.match(/therecapreport\.com\/(.*?)\/?$/);
      const slug = slugMatch ? slugMatch[1] : link;
      let excerpt = excerptRaw.replace(/\\\\/g, '').replace(/\\/g, '').replace(/\n/g, ' ').trim() + "...";
      excerpt = excerpt.replace(/^[^\w]+/, '');
      
      articlesMap.set(titleTrimmed, {
        title: titleTrimmed,
        image: image.trim(),
        date: dateString.trim(),
        excerpt: excerpt.trim(),
        slug,
        link,
        category: 'Entertainment',
        categories: ['Entertainment', 'Top 10']
      });
    }
  }
} catch (err) {
  console.error("Error reading top 10.json", err);
}

const finalArticles = Array.from(articlesMap.values()).map((a, i) => {
  return {
    id: String(i + 1),
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    categories: a.category === "Health And Beauty" ? ["Health And Beauty"] : [a.category], 
    image: a.image,
    slug: a.slug,
    link: a.link,
    date: a.date,
    readTime: "5 min read",
    author: {
      name: "The Recap Report",
      avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png",
      email: "info@therecapreport.com",
    }
  };
});

finalArticles.forEach(a => {
  const base = articlesMap.get(a.title);
  a.categories = base.categories; 
  if (a.category === "Health And Beauty") a.category = "Health And Beauty";
  a.categories = a.categories.map(c => c === "Health And Beauty" ? "Health And Beauty" : c);
  delete a.link;
});

const tsOutput = `export interface Article {
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

export const articles: Article[] = ${JSON.stringify(finalArticles, null, 2).replace(/"author": \{[\s\S]*?\}/g, '"author": defaultAuthor')};

export const trendingHeadlines = articles.map(a => a.title).slice(0, 8);

export const categories = [
  "Entertainment",
  "Lifestyle",
  "Business",
  "Health And Beauty",
  "Top 10",
];
`;

fs.writeFileSync('/Users/sean/Desktop/Antigravity Projects/recap-report/src/lib/articles.ts', tsOutput);

console.log("Rebuilt articles.ts successfully.");
console.log("Total unique articles processed:", finalArticles.length);
const counts = {};
finalArticles.forEach(a => counts[a.category] = (counts[a.category] || 0) + 1);
console.log("Counts per category:", counts);
console.log("\n--- ARTICLE LIST ---");
finalArticles.forEach(a => console.log(`- [${a.category}] ${a.title}`));
