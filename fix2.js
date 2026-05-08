const fs = require('fs');
const files = ['courses.html', 'teachers.html', 'about.html', 'contact.html', 'join-as-teacher.html', 'policy.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/<div class="nav-toggle"[^>]*>([\s\S]*?)<\/div>/g, '<button class="nav-toggle" aria-label="Toggle Navigation">$1</button>');
    fs.writeFileSync(file, content, 'utf-8');
});
