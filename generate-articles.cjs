const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const exportDir = '/Users/sean/Desktop/Antigravity Projects/recap-report/src/pages export from real site';

let articlesMap = new Map();

const categoryMap = {
  'Entertainment page.json': 'Entertainment',
  'lifestyle.json': 'Lifestyle',
  'business.json': 'Business',
  'health and beauty.json': 'Health And Beauty',
  'top 10.json': 'Top 10'
};

const processFile = (file, cat) => {
  const filePath = path.join(exportDir, file);
  
  // Sanitize text: strip escaped backslashes, markdown bracket artifacts, etc.
  const sanitize = (str) => {
    return str
      .replace(/\\\\/g, '')       // remove escaped backslashes
      .replace(/\\n/g, ' ')        // replace literal \n with space
      .replace(/\\\[…\\?\]/g, '') // remove \[…\]
      .replace(/\[…\]/g, '')       // remove [...]
      .replace(/\\\[/g, '')       // remove \[
      .replace(/\\\]/g, '')       // remove \]
      .replace(/\\{1,}/g, '')     // remove remaining stray backslashes
      .replace(/\s+/g, ' ')        // collapse whitespace
      .trim();
  };
  try {
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
       
       const lines = rest.split('\\\\\\n').map(s => s.trim()).filter(Boolean);
       
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
       
       let excerpt = sanitize(excerptRaw.replace(/\\[\[\]…]+$/g, ''));
       if (!excerpt.endsWith('...')) excerpt += '...';
       
       date = sanitize(date);
       
       const slugMatch = linkMatch.match(/therecapreport\.com\/(.*?)\/?$/);
       const slug = slugMatch ? slugMatch[1] : linkMatch;
       
       if (articlesMap.has(title)) {
         // MERGE: add the new category to existing article
         const existing = articlesMap.get(title);
         if (!existing.categories.includes(cat)) {
           existing.categories.push(cat);
         }
       } else {
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

// Process ALL files including top 10 — all merge categories now
['Entertainment page.json', 'lifestyle.json', 'business.json', 'health and beauty.json', 'top 10.json'].forEach(file => {
  processFile(file, categoryMap[file]);
});

// HARDCODED MULTI-CATEGORY OVERRIDES from live site crawl data
const liveCategoryMap = {
  "More Than a Network: How Angel Livas Is Building Space, Power, and Ownership for Black Creators": ["Entertainment", "Business", "Top 10"],
  "Aaliyah Duah Is Making Financial Literacy Fun — And Gen Z Is Finally Listening": ["Entertainment", "Business", "Top 10"],
  "Beyond the Spin: Kayla Tucker Adams on Power, Purpose, and Telling the Truth in Public Relations": ["Entertainment", "Business"],
  "Inside the World of Mychel \"Snoop\" Dillard: Healing, Hustle & Snooping 4 Love": ["Entertainment", "Lifestyle", "Business", "Top 10"],
  "Thomas Ricks, #14: From SWAC All-American, to SWAT, to CEO of Executive Protection": ["Entertainment", "Business"],
  "The Biggest Family Reunion in Illinois: Mike Page's Love Revolution": ["Entertainment", "Lifestyle", "Business"],
  "Ashwin Gane on World-Building, Silence as an Instrument, and Rising \"Way Up\" in Music": ["Entertainment"],
  "Dr. Tanika Long: Building Bridges of Hope in Barnesville and Beyond": ["Entertainment", "Health And Beauty"],
  "Detroit's Tel K. Ganesan vs. Everybody: Indian-American Engineer Turned Filmmaker Leading a Stellar Black Cast in Trap City": ["Entertainment", "Lifestyle", "Top 10"],
  "Healing the Whole Woman: Dr. Jennifer Mbianda's Vision for Transformative, Culturally Rooted Care": ["Entertainment", "Lifestyle", "Health And Beauty"],
  "Nine Losses, Two Brain Surgeries, One Mission: Rachell Dumas Is Changing How Women Are Heard in Healthcare": ["Lifestyle", "Business", "Health And Beauty", "Top 10"],
  "They Didn\u2019t Listen: Why So Many Black Patients Leave the Doctor Feeling Dismissed": ["Lifestyle", "Health And Beauty", "Top 10"],
  "From Lab to Legacy: How Dr. Isfahan is Redefining Black Hair Care Through Science": ["Lifestyle", "Health And Beauty"],
  "The Power of Us: Vanessa Bouie and Her Family's Blueprint for Success": ["Lifestyle", "Health And Beauty", "Fashion"],
  "Ayiti! Ayiti! Ayiti! Director Robenson Lauvince\u2019s Film \u2018July 7\u2019 Reclaims Haiti\u2019s Narrative on President Mo\u00efse\u2019s Assassination": ["Lifestyle", "Top 10", "Fashion"],
  "At 22, Aaliyah Duah Is Turning Financial Literacy Into a Movement Gen Z Actually Wants": ["Business"],
  "Black Maternal Health Is Not Genetics. It's Bias, Delayed Care, and a System That Doesn't Listen — Dr. Eboni January Explains What Must Change": ["Business", "Health And Beauty"],
  "From Classroom to Kitchen: How Vanetta Roy Built Atlanta\u2019s Beloved \"Eat My Biscuits\"": ["Business", "Top 10", "Food"],
  "Be Bold, Be Bright: Derek Amarilla\u2019s Debut Book \"Socko\" Teaches Kids the Power of Showing Up as Themselves": ["Health And Beauty", "Top 10", "Fashion"],
  "Wrapped in Rest: How The Rest Spot Holds Space for Black Women to Heal": ["Health And Beauty"],
  "A New Chapter of Advocacy: LaToya Dwight\u2019s Fight for Fibroid Awareness": ["Health And Beauty"],
  "Cocoa Brown on Finding Healing and Strength in Comedy, Motherhood, and Her New Film \u2018Twisted Hearts\u2019": ["Entertainment", "Top 10", "Fashion"],
};

// Apply the overrides
for (const [title, cats] of Object.entries(liveCategoryMap)) {
  // Try exact match first, then fuzzy
  let article = articlesMap.get(title);
  if (!article) {
    // Try fuzzy match (some titles have slightly different quotes/chars)
    for (const [key, val] of articlesMap.entries()) {
      if (key.includes(title.substring(0, 30)) || title.includes(key.substring(0, 30))) {
        article = val;
        break;
      }
    }
  }
  if (article) {
    article.categories = [...new Set(cats)];
    // Keep the primary category as the first one
    article.category = cats[0];
  }
}

// Check for Dr. Eanah (missing from exports)
if (!Array.from(articlesMap.keys()).some(k => k.includes('Eanah'))) {
  console.log("Adding missing Dr. Eanah article...");
  articlesMap.set("The Power of Healing, Honesty, and Humanity: Inside the Heartwork of Dr. Eanah", {
    title: "The Power of Healing, Honesty, and Humanity: Inside the Heartwork of Dr. Eanah",
    image: "",
    date: "",
    excerpt: "",
    slug: "",
    link: "",
    category: "Lifestyle",
    categories: ["Lifestyle"],
    needsScrape: true
  });
}

async function finalize() {
  const finalArticles = Array.from(articlesMap.values()).map((a, i) => {
    return {
      id: String(i + 1),
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      categories: a.categories,
      image: a.image,
      slug: a.slug,
      link: a.link,
      date: a.date,
      readTime: "5 min read",
      author: {
        name: "The Recap Report",
        avatar: "https://therecapreport.com/wp-content/uploads/2021/11/favicon.png",
        email: "info@therecapreport.com",
      },
      needsScrape: a.needsScrape || false
    };
  });

  console.log("Fetching full article contents...");

  for (let i = 0; i < finalArticles.length; i++) {
    const a = finalArticles[i];
    
    // If this article was missing from exports, try to find it on the live site
    if (a.needsScrape && !a.link) {
      // Attempt to find URL from known patterns
      const guessSlug = a.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      a.link = `https://therecapreport.com/${guessSlug}/`;
      a.slug = guessSlug;
    }

    try {
      console.log(`[${i+1}/${finalArticles.length}] Fetching ${a.link}...`);
      const res = await fetch(a.link);
      const html = await res.text();
      const dom = new JSDOM(html);
      
      // If we need to scrape metadata too (missing article)
      if (a.needsScrape) {
        const ogImage = dom.window.document.querySelector('meta[property="og:image"]');
        if (ogImage) a.image = ogImage.getAttribute('content');
        
        const timeEl = dom.window.document.querySelector('time');
        if (timeEl) a.date = timeEl.textContent.trim();
        
        const metaDesc = dom.window.document.querySelector('meta[property="og:description"]');
        if (metaDesc) a.excerpt = metaDesc.getAttribute('content');
      }

      const panels = Array.from(dom.window.document.querySelectorAll('.uk-panel.uk-margin-medium'));
      let bestPanel = null;
      let maxP = 0;
      for (const p of panels) {
         const pCount = p.querySelectorAll('p').length;
         if (pCount > maxP) {
           maxP = pCount;
           bestPanel = p;
         }
      }
      
      if (bestPanel) {
        Array.from(bestPanel.querySelectorAll('script, style, iframe')).forEach(el => el.remove());
        Array.from(bestPanel.querySelectorAll('p')).forEach(el => {
           if (!el.textContent.trim()) el.remove();
        });
        a.content = bestPanel.innerHTML.trim();
      } else {
        console.log("  -> Warning: No content blocks found.");
        a.content = `<p>${a.excerpt}</p>`;
      }
    } catch (e) {
      console.log(`  -> Error fetching: ${e.message}`);
      a.content = `<p>${a.excerpt}</p>`;
    }
    delete a.link;
    delete a.needsScrape;
  }

  // Log category counts
  const catCounts = {};
  finalArticles.forEach(a => {
    a.categories.forEach(c => catCounts[c] = (catCounts[c] || 0) + 1);
  });
  console.log("\nCategory counts (articles tagged with each):");
  console.log(catCounts);

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
  "Food",
  "Fashion",
];
`;

  fs.writeFileSync('/Users/sean/Desktop/Antigravity Projects/recap-report/src/lib/articles.ts', tsOutput);

  console.log("\nRebuilt articles.ts successfully with FULL text body content.");
  console.log("Total unique articles processed:", finalArticles.length);
}

finalize();
