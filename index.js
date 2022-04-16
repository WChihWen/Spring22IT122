//const http = require("http");
import * as http from 'http';
import * as dt from "./data.js";
import { parse } from "querystring";

http.createServer((req,res) => {
    //var path = req.url.toLowerCase();
    let url = req.url.split("?"); // separate route from query string
    var path = url[0].toLowerCase();
    let query = parse(url[1]); // convert query string to a JS object
 
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(dt.getAll()));
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var str = 'My name is Chih Wen Wang, and I come from Taiwan. When I was a university student in Taiwan, I studied information technology and management. ';
            str +='However, I focused on learning how to build software and let it work on a computer or the Internet. While graduating, I became a programmer at a technology company in my country and worked for almost ten years. ';
            str += 'However, my life was changed because I came to the United States with my wife. I have two goals now. One is that I have to improve my English ability. So, I go to study the ESL Program here. Another goal is that I yearn to earn an IT Program degree or certificate in the United States because I do not have any degree in the United States.';
            res.end(str);
            break;

        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});   

            if (dt.getItem(query.name) != null){
                res.end(JSON.stringify(dt.getItem(query.name)));
            }else{
                res.end("Name:["+ query.name + "] was not found!");
            }
            
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('The page('+ path +') was not found!');
            break;
    }
}).listen(process.env.PORT || 3000);