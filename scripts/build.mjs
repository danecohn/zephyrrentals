import fs from 'node:fs/promises';
import path from 'node:path';
import {home,collection,unitPage,restaurantPage,explorePage,stayPage,bookPage,galleryPage,contactPage,privacyPage,notFoundPage} from './render.mjs';
import {units} from '../data/site.mjs';
const root=new URL('../',import.meta.url);const dist=new URL('dist/',root);await fs.mkdir(dist,{recursive:true});await fs.cp(new URL('public/',root),dist,{recursive:true});
const pages=[['/',home()],['/lofts',collection()],...units.map(u=>['/lofts/'+u.id,unitPage(u)]),['/guide/restaurants',restaurantPage()],['/guide/explore',explorePage()],['/guide/your-stay',stayPage()],['/book',bookPage()],['/gallery',galleryPage()],['/contact',contactPage()],['/privacy',privacyPage()]];
for(const [url,html]of pages){const target=new URL('.'+url.replace(/\/$/,'')+'/index.html',dist);await fs.mkdir(new URL('.',target),{recursive:true});await fs.writeFile(target,html)}
await fs.writeFile(new URL('404.html',dist),notFoundPage());
await fs.writeFile(new URL('sitemap.xml',dist),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(([url])=>'<url><loc>https://zephyr.rentals'+url+'</loc></url>').join('')+'</urlset>');
await fs.writeFile(new URL('robots.txt',dist),'User-agent: *\nAllow: /\nDisallow: /reserve\nSitemap: https://zephyr.rentals/sitemap.xml\n');
console.log('Built '+pages.length+' complete Zephyr pages with property and guide photography.');
