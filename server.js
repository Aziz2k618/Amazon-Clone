// Starts this module-based project through http://localhost:3000.
// Opening the HTML files directly with file:// causes browsers to block modules.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
};

http.createServer((request, response) => {
  const requestPath = new URL(request.url, 'http://localhost').pathname;
  const relativePath = requestPath === '/' ? 'index.html' : decodeURIComponent(requestPath).replace(/^[/\\]+/, '');
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500);
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }
    response.writeHead(200, { 'Content-Type': `${contentTypes[path.extname(filePath)] || 'application/octet-stream'}; charset=utf-8` });
    response.end(file);
  });
}).listen(3000, () => {
  console.log('Amazon project is running at http://localhost:3000');
});
