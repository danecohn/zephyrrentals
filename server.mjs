import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {reservationURL} from './booking.mjs';
const root=fileURLToPath(new URL('./dist/',import.meta.url)).replace(/\/$/,'');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const legacy={'/otl':'/lofts','/otl/':'/lofts','/otl/book':'/book','/otl/localrestaurants':'/guide/restaurants','/otl/fun':'/guide/explore','/otl/instructions':'/guide/your-stay','/restaurants':'/guide/restaurants','/explore':'/guide/explore','/instructions':'/guide/your-stay'};
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createServer(){return http.createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' https://zephyrstr.guestybookings.com");
 let url;try{url=new URL(req.url,'http://localhost')}catch{res.writeHead(400);res.end('Bad request');return}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return}
 if(url.pathname==='/api/health'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(req.method==='HEAD'?'':JSON.stringify({ok:true,service:'zephyr-rentals'}));return}
 if(url.pathname==='/reserve'){
  res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');
  try{const destination=reservationURL(url.searchParams);res.writeHead(303,{'Location':destination.href});res.end()}
  catch(error){res.writeHead(400,{'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?'':`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A little detail to check · Zephyr Rentals</title><link rel="stylesheet" href="/styles.css"></head><body><main class="error-page"><h1>A little detail to check.</h1><p>${escape(error.message)}</p><a class="button primary" href="/book">Choose your stay</a><a class="button secondary" href="/lofts">Explore the lofts</a></main></body></html>`)}return
 }
 if(legacy[url.pathname]){res.writeHead(301,{'Location':legacy[url.pathname]+url.search});res.end();return}
 let decoded;try{decoded=decodeURIComponent(url.pathname)}catch{res.writeHead(400);res.end('Bad request');return}
 if(decoded.includes('\0')||decoded.split('/').some(p=>p.startsWith('.'))){res.writeHead(404);res.end('Not found');return}
 let filename=path.resolve(root,'.'+decoded);if(filename!==root&&!filename.startsWith(root+path.sep)){res.writeHead(404);res.end('Not found');return}
 try{if(fs.statSync(filename).isDirectory())filename=path.join(filename,'index.html')}catch{}
 let status=200;if(!fs.existsSync(filename)||!fs.statSync(filename).isFile()){filename=path.join(root,'404.html');status=404}
 const extension=path.extname(filename),stats=fs.statSync(filename);res.statusCode=status;res.setHeader('Content-Type',mime[extension]||'application/octet-stream');res.setHeader('Content-Length',stats.size);res.setHeader('Cache-Control',extension==='.html'?'no-cache':decoded.startsWith('/assets/')?'public, max-age=86400':'public, max-age=300');
 if(req.method==='HEAD'){res.end();return}const stream=fs.createReadStream(filename);stream.on('error',()=>res.destroy());stream.pipe(res)
 })}
if(process.argv[1]===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4347);createServer().listen(port,'0.0.0.0',()=>console.log('Zephyr Rentals is ready at http://localhost:'+port))}
