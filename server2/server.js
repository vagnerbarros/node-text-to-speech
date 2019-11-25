const http = require('http');

http.createServer((request, response) => {
    response.write('server2');
    response.end();
}).listen(4002);