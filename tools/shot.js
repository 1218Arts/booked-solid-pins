const {chromium}=require('playwright');
(async()=>{const [,,src,out]=process.argv;const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1000,height:1500}});await p.goto('file://'+require('path').resolve(src));await p.waitForTimeout(400);
await p.screenshot({path:out,type:'jpeg',quality:90});await b.close();})();
