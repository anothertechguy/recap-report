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
    
    // Split by Read more]( to find all articles
    const chunks = markdown.split('Read more](');
    
    // The last chunk doesn't have an article before it
    for (let i = 0; i < chunks.length - 1; i++) {
       const block = chunks[i];
       // The link is at the start of chunks[i+1] up to the first ')'
       const linkMatch = chunks[i+1].split(')')[0];
       
       // Now parse the block
       // It looks like: ... [![](IMAGE_URL)**TITLE** \\\\\nDATE\\\\\n\\\\\nEXCERPT \[…\]\\\\\n\\\\\n
       const titleSplit = block.split(')**');
       if (titleSplit.length < 2) continue;
       
       const imgMatch = titleSplit[titleSplit.length - 2].split('[![](').pop();
       
       const afterTitle = titleSplit[titleSplit.length - 1];
       const dateSplit = afterTitle.split('**');
       if (dateSplit.length < 2) continue;
       
       const title = dateSplit[0].trim();
       const rest = dateSplit[1];
       
       // rest looks like: " \\\\\nFebruary 23, 2026\\\\\n\\\\\nThere are moments..."
       const lines = rest.split('\\\\\n').map(s => s.trim()).filter(Boolean);
       
       let date = "";
       let excerptRaw = "";
       
       for (const line of lines) {
         if (line.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/)) {
           date = line;
         } else if (line.length > 20 && !line.includes('[![](')) {
           excerptRaw = line;
           break;
         }
       }
       
       let excerpt = excerptRaw.replace(/\\[\[\]…]+$/g, '').trim();
       if (!excerpt.endsWith('...')) excerpt += '...';
       
       const slugMatch = linkMatch.match(/therecapreport\.com\/(.*?)\/?$/);
       const slug = slugMatch ? slugMatch[1] : linkMatch;
       
       if (!articlesMap.has(title)) {
         articlesMap.set(title, {
            title,
            image: imgMatch,
            date,
            excerpt,
            slug,
            link: linkMatch,
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
  
  const chunks = markdown.split('Read more](');
  for (let i = 0; i < chunks.length - 1; i++) {
       const block = chunks[i];
       const linkMatch = chunks[i+1].split(')')[0];
       const titleSplit = block.split(')**');
       if (titleSplit.length < 2) continue;
       const imgMatch = titleSplit[titleSplit.length - 2].split('[![](').pop();
       const afterTitle = titleSplit[titleSplit.length - 1];
       const dateSplit = afterTitle.split('**');
       if (dateSplit.length < 2) continue;
       const title = dateSplit[0].trim();
       const rest = dateSplit[1];
       const lines = rest.split('\\\\\n').map(s => s.trim()).filter(Boolean);
       let date = "";
       let excerptRaw = "";
       for (const line of lines) {
         if (line.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/)) {
           date = line;
         } else if (line.length > 20 && !line.includes('[![](')) {
           excerptRaw = line;
           break;
         }
       }
       let excerpt = excerptRaw.replace(/\\[\[\]…]+$/g, '').trim();
       if (!excerpt.endsWith('...')) excerpt += '...';
       const slugMatch = linkMatch.match(/therecapreport\.com\/(.*?)\/?$/);
       const slug = slugMatch ? slugMatch[1] : linkMatch;
       
       if (articlesMap.has(title)) {
         const existing = articlesMap.get(title);
         if (!existing.categories.includes('Top 10')) {
           existing.categories.push('Top 10');
         }
       } else {
         articlesMap.set(title, {
            title,
            image: imgMatch,
            date,
            excerpt,
            slug,
            link: linkMatch,
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
