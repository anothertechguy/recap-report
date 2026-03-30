const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function test() {
  const url = 'https://therecapreport.com/aaliyah-duah-is-making-financial-literacy-fun-and-gen-z-is-finally-listening/';
  const res = await fetch(url);
  const html = await res.text();
  const dom = new JSDOM(html);
  
  const elements = dom.window.document.querySelectorAll('*');
  let target = null;
  for (const el of elements) {
    if (el.textContent && el.textContent.includes('The book that flipped the switch') && el.children.length === 0) {
      target = el;
      break;
    }
  }
  
  if (target) {
    let parent = target.parentElement;
    console.log("Found text! Parent chain:");
    for (let i = 0; i < 5; i++) {
        if (!parent) break;
        console.log(`[${parent.tagName}] className: ${parent.className}`);
        parent = parent.parentElement;
    }
  } else {
    console.log("Text not found.");
  }
}

test();
