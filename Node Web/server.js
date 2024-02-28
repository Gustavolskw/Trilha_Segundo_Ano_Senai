import http from "http"
import express, { json } from "express"
import path from "path"
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const app = express();
app.use(express.json());
app.use(express.static('express'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(app);
const port = 3000;
server.listen(port);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, "node-example-website/express", 'index.html'));
});

console.debug('Server inicializado na porta ' + port)