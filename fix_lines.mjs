import fs from 'fs';
const path = 'c:/Users/Latitude/Desktop/main.f/fixxy/backend/src/controllers/auth.controller.js';
let content = fs.readFileSync(path, 'utf8');
// Normalize to LF
content = content.replace(/\r\n/g, '\n');
// Collapse multiple blank lines to a single one
content = content.replace(/\n{3,}/g, '\n\n');
// Write back (keep LF for consistency with the project)
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed.');
