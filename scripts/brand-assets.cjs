const fs=require('node:fs'),sharp=require('sharp');
(async()=>{const source=process.argv[2];for(const n of [64,180,256,512,1024])await sharp(source).resize(n,n).png().toFile('public/assets/brand/zephyr-'+n+'.png');await sharp(source).resize(512,512).webp({quality:94}).toFile('public/assets/brand/zephyr-mark.webp');console.log('Zephyr brand assets ready')})();
