const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = path.dirname(require.main.filename) + "\\..\\"
const BASE_HTML_FILE = 'home.html'
const HOSTNAME = '127.0.0.1'
const PORT = process.env.PORT || 3000

function parseContentType(content) {
  switch (path.extname(content)) {
    case '.html':
      return 'text/html'
    case '.js':
      return 'text/javascript'
    case '.css':
      return 'text/css'
    case '.ico':
      return 'image/x-icon'
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url)
  
  file = path.join(ROOT, req.url === "/" ? BASE_HTML_FILE : req.url)
  content_type = parseContentType(file);

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404)
      res.write("File Not Found")
    }
    else {
      res.writeHead(200, { 'Content-Type': content_type })
      res.write(content)
    }
    res.end()
  })
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
})