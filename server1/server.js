const http = require('http');

http.createServer((request, response) => {
    response.write('server1');
    response.end();
}).listen(4001);