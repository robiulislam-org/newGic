const cp = require("child_process");
const fs = require("fs");

// Extract home page from the last committed version (44a0bf7) - BEFORE my changes
const commit = "44a0bf7";
const html = cp.execSync(`git show ${commit}:index.html`).toString();

const homeStart = html.indexOf('<div class="page active" id="page-home">');
const homeEnd = html.indexOf('\n<!-- ─────────── FREE COURSES PAGE ─────────── -->');

console.log("homeStart:", homeStart, "homeEnd:", homeEnd);
if (homeStart !== -1 && homeEnd !== -1) {
  const homeContent = html.substring(homeStart, homeEnd);
  fs.writeFileSync("home_44a0bf7.html", homeContent, 'utf8');
  console.log("Saved. Lines:", homeContent.split('\n').length);
  
  // Show first 40 lines
  console.log("\n=== FIRST 40 LINES ===");
  homeContent.split('\n').slice(0, 40).forEach((l, i) => console.log(`${i+1}: ${l}`));
}
