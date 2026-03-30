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

export const articles: Article[] = [
  {
    "id": "1",
    "title": "More Than a Network: How Angel Livas Is Building Space, Power, and Ownership for Black Creators",
    "excerpt": "There are moments in culture when someone quietly builds the kind of infrastructure that changes everything — not overnight, not loudly, but steadily, intentionally, and with purpose rooted in community. Angel Livas is doing exactly that. As the founder of ALIVE Podcast Network, Livas has grown what began as a small audio platform into a \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2026/02/Angel-Livas-at-ALIVE-Studios.jpg",
    "slug": "more-than-a-network-how-angel-livas-is-building-space-power-and-ownership-for-black-creators",
    "date": "February 23, 2026",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "2",
    "title": "Aaliyah Duah Is Making Financial Literacy Fun — And Gen Z Is Finally Listening",
    "excerpt": "Some people talk about wealth. Aaliyah Duah is building a whole movement around it — and she’s doing it in a way Gen Z can actually understand, connect to, and enjoy. In our sit-down, Aaliyah broke down how she started Financial Revolutionn as a teenager, why she refuses to teach finance in a boring way, \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2026/01/1677797533591.jpg",
    "slug": "aaliyah-duah-is-making-financial-literacy-fun-and-gen-z-is-finally-listening",
    "date": "January 27, 2026",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "3",
    "title": "Beyond the Spin: Kayla Tucker Adams on Power, Purpose, and Telling the Truth in Public Relations",
    "excerpt": "In an era where visibility is often confused with virality, Kayla Tucker Adams stands firmly in a different lane—one rooted in truth, strategy, and long-term impact. As an award-winning public relations executive and the founder of KTA Media Group, Kayla has spent more than two decades shaping narratives that don’t just make noise, but \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2026/01/kayla-t-adams.webp",
    "slug": "beyond-the-spin-kayla-tucker-adams-on-power-purpose-and-telling-the-truth-in-public-relations",
    "date": "January 24, 2026",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "4",
    "title": "Inside the World of Mychel “Snoop” Dillard: Healing, Hustle & Snooping 4 Love",
    "excerpt": "If you know the name Mychel “Snoop” Dillard, you already know she’s not just a businesswoman — she’s a movement. Entrepreneur. Author. TV personality. And now, the star and executive producer of the bold reality series Snooping 4 Love. I had the opportunity to sit down with Snoop for an unfiltered conversation about her journey \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/11/0C81BEF1-1A41-4C6F-9E3B-83EF19F5865B.jpeg",
    "slug": "inside-the-world-of-mychel-snoop-dillard-healing-hustle-snooping-4-love",
    "date": "November 4, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "5",
    "title": "Thomas Ricks, \\#14: From SWAC All-American, to SWAT, to CEO of Executive Protection",
    "excerpt": "Security has become increasingly complex, and few professionals can claim the unique blend of athletic discipline, law enforcement expertise, and entrepreneurial vision that defines Thomas Ricks. His journey from high school football fields to professional stadiums, and ultimately to the boardrooms and red carpets where he now protects some of the most recognizable names in \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/08/Bricks-Solo-IMG_7585-1.jpeg",
    "slug": "thomas-ricks-14-from-swac-all-american-to-swat-to-ceo-of-executive-protection",
    "date": "August 14, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "6",
    "title": "The Biggest Family Reunion in Illinois: Mike Page’s Love Revolution",
    "excerpt": "Success often leads people away from their roots, Mike Page chose a different path. The music industry entrepreneur and founder of the Mike Page Foundation made a decision that defies conventional wisdom: he invested his time, money, and passion back into his hometown of Elgin, Illinois. Through his annual “Love on the Lawn” festival, Page \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/08/IMG_1609.jpeg",
    "slug": "the-biggest-family-reunion-in-illinois-mike-pages-love-revolution",
    "date": "August 14, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "7",
    "title": "Ashwin Gane on World-Building, Silence as an Instrument, and Rising “Way Up” in Music",
    "excerpt": "During our recent conversation, genre-defying artist Ashwin Gane let us into his world—a world that blends cinematic trap, mythic imagination, and raw, thoughtful introspection. From charting on Billboard to building sonic universes inspired by samurais and Zen gardens, Ashwin is carving a lane that’s deeply intentional and fiercely original. Building Worlds, Not Just Beats When \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/07/IMG_8379-1.jpg",
    "slug": "ashwin-gane-on-world-building-silence-as-an-instrument-and-rising-way-up-in-music",
    "date": "July 1, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "8",
    "title": "Dr. Tanika Long: Building Bridges of Hope in Barnesville and Beyond",
    "excerpt": "Sometimes all it takes is one moment — one post, one realization — to change everything. For Dr. Tanika Long, that moment came during the height of the pandemic. Scrolling through Facebook, she saw a post celebrating Black history moments from her hometown, Barnesville, Georgia. Right there, in black and white, was her name — \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-12-at-21.54.23_0f100f8c.jpg",
    "slug": "dr-tanika-long-building-bridges-of-hope-in-barnesville-and-beyond",
    "date": "May 13, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "9",
    "title": "Detroit’s Tel K. Ganesan vs. Everybody: Indian-American Engineer Turned Filmmaker Leading a Stellar Black Cast in Trap City",
    "excerpt": "Tel K. Ganesan isn’t your typical filmmaker—and Trap City isn’t your typical indie film. With a background rooted in engineering, entrepreneurship, and leadership, Tel made a bold pivot into storytelling. Today, he stands at the helm of a film that’s not only streaming on Prime Video and Apple TV, but also sparking conversations around ambition, \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/05/trap_city.jpg",
    "slug": "detroits-tel-k-ganesan-vs-everybody-indian-american-engineer-turned-filmmaker-leading-a-stellar-black-cast-in-trap-city",
    "date": "May 2, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "10",
    "title": "Healing the Whole Woman: Dr. Jennifer Mbianda’s Vision for Transformative, Culturally Rooted Care",
    "excerpt": "In a world that often asks women—especially Black women—to carry it all while caring for themselves last, Dr. Jennifer Mbianda is creating something different: a safe, intentional space where women are seen, affirmed, and given the tools to heal wholly. She’s not just wearing the white coat. She’s wearing her story, her purpose, and her \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/05/Dr-Mbianda-FAcebook-Blazer-Seated-465819505_17957967749837290_8414043212908819847_n.jpg",
    "slug": "healing-the-whole-woman-dr-jennifer-mbiandas-vision-for-transformative-culturally-rooted-care",
    "date": "May 2, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "11",
    "title": "Nine Losses, Two Brain Surgeries, One Mission: Rachell Dumas Is Changing How Women Are Heard in Healthcare",
    "excerpt": "How Rachell Dumas Turned Nine Pregnancy Losses, Medical Dismissal, and Survival Into a Blueprint for Advocacy Some stories don’t begin with a title or a résumé. They begin with a moment — a moment when your body is sounding an alarm, and the people who are supposed to help you treat it like background noise. \\[…...",
    "category": "Lifestyle",
    "categories": [
      "Lifestyle",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2026/02/RachellDumas3.webp",
    "slug": "nine-losses-two-brain-surgeries-one-mission-rachell-dumas-is-changing-how-women-are-heard-in-healthcare",
    "date": "February 19, 2026",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "12",
    "title": "“They Didn’t Listen”: Why So Many Black Patients Leave the Doctor Feeling Dismissed",
    "excerpt": "If you have ever walked out of a doctor’s office with more questions than answers, if you have ever felt rushed, unheard, or quietly dismissed, I want to begin here: what you felt was real. Too many Black patients leave medical spaces carrying not just diagnoses, but doubt—about whether their pain mattered, whether their concerns \\[…...",
    "category": "Lifestyle",
    "categories": [
      "Lifestyle",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2026/02/IMG_6771.jpeg",
    "slug": "they-didnt-listen-why-so-many-black-patients-leave-the-doctor-feeling-dismissed",
    "date": "February 10, 2026",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "13",
    "title": "From Lab to Legacy: How Dr. Isfahan is Redefining Black Hair Care Through Science",
    "excerpt": "When Dr. Isfahan first experienced intense scalp irritation and thinning hair from years of chemical straightening, she didn’t just look for a quick fix—she looked deeper. At the time, she was a biomedical scientist conducting clinical autoimmune research at Vanderbilt University, studying diseases like sarcoidosis that disproportionately affect Black women. As she witnessed firsthand how \\[…...",
    "category": "Lifestyle",
    "categories": [
      "Lifestyle"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/08/IMG_9637-e1754248102893.png",
    "slug": "from-lab-to-legacy-how-dr-isfahan-is-redefining-black-hair-care-through-science",
    "date": "August 3, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "14",
    "title": "The Power of Us: Vanessa Bouie and Her Family’s Blueprint for Success",
    "excerpt": "When I think about what it means to build something beautiful out of uncertain times, I think about the Bouie family. I think about Vanessa, her husband, and their two boys-how they gathered around the kitchen table, not just to share a meal, but to share a dream. I think about how, in a world \\[…...",
    "category": "Lifestyle",
    "categories": [
      "Lifestyle"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/05/Screenshot-2025-05-09-at-8.36.21%E2%80%AFAM.png",
    "slug": "the-power-of-us-vanessa-bouie-and-her-familys-blueprint-for-success",
    "date": "May 9, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "15",
    "title": "Ayiti! Ayiti! Ayiti! Director Robenson Lauvince’s Film ‘July 7’ Reclaims Haiti’s Narrative on President Moïse’s Assassination",
    "excerpt": "...",
    "category": "Lifestyle",
    "categories": [
      "Lifestyle",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/05/July-7-Poster-473595922_10160593036216646_4437877519154863856_n.jpg",
    "slug": "ayiti-ayiti-ayiti-director-robenson-lauvinces-film-july-7-reclaims-haitis-narrative-on-president-moises-assassination",
    "date": "In the heart of Atlanta, I sat down with Haitian filmmaker Robenson Lauvince to discuss one of the most anticipated international films in recent years: July 7th: Who Killed the President of Haiti? What began as an exploration of a tragic political event unfolded into a conversation about legacy, truth, and the power of telling \\[…\\]",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "16",
    "title": "At 22, Aaliyah Duah Is Turning Financial Literacy Into a Movement Gen Z Actually Wants",
    "excerpt": "Seeing the Problem Before It Was Named Aaliyah Duah didn’t start her company,  Financial Revolutionn because finance felt trendy. She started it because she noticed something was missing in her community and among her peers: the knowledge to build real wealth. Growing up in New York City, Duah watched how money was used in ways \\[…...",
    "category": "Business",
    "categories": [
      "Business"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/12/IMG_3765-scaled-e1766075037770.jpg",
    "slug": "at-22-aaliyah-duah-is-turning-financial-literacy-into-a-movement-gen-z-actually-wants",
    "date": "December 18, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "17",
    "title": "Black Maternal Health Is Not Genetics. It’s Bias, Delayed Care, and a System That Doesn’t Listen — Dr. Eboni January Explains What Must Change",
    "excerpt": "...",
    "category": "Business",
    "categories": [
      "Business"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/12/Screenshot-2025-12-18-at-10.51.02-AM.png",
    "slug": "black-maternal-health-is-not-genetics-its-bias-delayed-care-and-a-system-that-doesnt-listen-dr-eboni-january-explains-what-must-change",
    "date": "Black women in the United States remain three times more likely to die from pregnancy-related causes, and Dr. Eboni “Dr. EJ” January is clear about what’s driving the crisis: it isn’t biology. It’s a healthcare system shaped by bias, delayed care, and a dangerous pattern of not listening to Black women soon enough. In a \\[…\\]",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "18",
    "title": "From Classroom to Kitchen: How Vanetta Roy Built Atlanta’s Beloved “Eat My Biscuits”",
    "excerpt": "In the heart of Atlanta, there’s a place where comfort food meets culture, where music sets the mood, and where every plate comes with a side of community. That place is Eat My Biscuits, the brainchild of  Vanetta Roy— a Chicago native, former teacher, and passionate chef whose journey from the classroom to the kitchen \\[…...",
    "category": "Business",
    "categories": [
      "Business",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/09/IMG_0076.jpeg",
    "slug": "from-classroom-to-kitchen-how-vanetta-roy-built-atlantas-beloved-eat-my-biscuits",
    "date": "September 1, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "19",
    "title": "Be Bold, Be Bright: Derek Amarillas’ Debut Book “Socko” Teaches Kids the Power of Showing Up as Themselves",
    "excerpt": "From boardrooms to bookstores, Derek Amarillas is redefining what it means to take risks and live boldly. The former finance executive has stepped into the literary world with Socko, a heartwarming children’s picture book that celebrates individuality, resilience, and the freedom to be unapologetically yourself. Inspired by his own childhood experiences of feeling “too much” \\[…...",
    "category": "Health And Beauty",
    "categories": [
      "Health And Beauty",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/08/Derek-Amarillas-Headshot-w-Book.png",
    "slug": "be-bold-be-bright-derek-amarillas-debut-book-socko-teaches-kids-the-power-of-showing-up-as-themselves",
    "date": "August 7, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "20",
    "title": "Wrapped in Rest: How The Rest Spot Holds Space for Black Women to Heal",
    "excerpt": "In a world where “doing it all” is worn like a badge of honor and burnout is often normalized, The Rest Spot in Smyrna, Georgia, is a radical act of softness. It’s more than a wellness space—it’s a sanctuary where Black and Brown women are encouraged to slow down, release the pressure, and simply rest. \\[…...",
    "category": "Health And Beauty",
    "categories": [
      "Health And Beauty"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/08/IMG_0068.jpeg",
    "slug": "wrapped-in-rest-how-the-rest-spot-holds-space-for-black-women-to-heal",
    "date": "August 3, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "21",
    "title": "A New Chapter of Advocacy: LaToya Dwight’s Fight for Fibroid Awareness",
    "excerpt": "There are moments in history when the right woman rises at the right time—rooted in truth, led by grace, and unwavering in her mission to bring others along. LaToya Dwight is that woman. A businesswoman, wife, mother, and survivor turned advocate, LaToya has emerged as a bold voice in the fight for menstrual equity and \\[…...",
    "category": "Health And Beauty",
    "categories": [
      "Health And Beauty"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/07/Fibroid-scaled.png",
    "slug": "a-new-chapter-of-advocacy-latoya-dwights-fight-for-fibroid-awareness",
    "date": "July 11, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  },
  {
    "id": "22",
    "title": "Cocoa Brown on Finding Healing and Strength in Comedy, Motherhood, and Her New Film ‘Twisted Hearts’",
    "excerpt": "Actress. Comedian. Mother. Mogul. Cocoa Brown is all these things and more—but above all, she is real. In an intimate sit-down interview with The Recap Report, Cocoa Brown opened up about her multifaceted journey in entertainment, the healing power of comedy, and how she continues to reinvent herself through life’s highest highs and lowest lows. \\[…...",
    "category": "Entertainment",
    "categories": [
      "Entertainment",
      "Top 10"
    ],
    "image": "https://therecapreport.com/wp-content/uploads/2025/05/TWISTED-HEARTS-POSTER-FB-468354601_122198800418199852_5193933758529602380_n.jpg",
    "slug": "cocoa-brown-on-finding-healing-and-strength-in-comedy-motherhood-and-her-new-film-twisted-hearts",
    "date": "May 2, 2025",
    "readTime": "5 min read",
    "author": defaultAuthor
  }
];

export const trendingHeadlines = articles.map(a => a.title).slice(0, 8);

export const categories = [
  "Entertainment",
  "Lifestyle",
  "Business",
  "Health And Beauty",
  "Top 10",
];
