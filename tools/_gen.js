// Generates this week's pin HTML files from the templates' patterns. Run: node _gen.js
const fs=require('fs');
const W=JSON.parse(fs.readFileSync('_week.json','utf8'));
const head=s=>`<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="base.css"><style>${s}</style></head><body>`;
const foot=(cta='Shop on Etsy &rarr;',style='')=>`<div class="foot"><div class="b"><span><img src="src/logo-mark.png"></span>Booked Solid Studio</div><div class="c"${style}>${cta}</div></div></body></html>`;
const dir={cleaning:'cleaning',lawn:'landscaping'};
const docName={cleaning:{agreement:'Service agreement',checklist:'Cleaning checklist',quote:'Estimate form',invoice:'Invoice',intake:'Client intake'},lawn:{agreement:'Service agreement',checklist:'Visit checklist',quote:'Estimate form',invoice:'Invoice',intake:'Client intake'}};
const eyebrowTrade={cleaning:'For cleaning businesses',lawn:'For lawn care &amp; landscaping'};
const kitName={cleaning:'Cleaning Business Starter Kit',lawn:'Lawn Care Starter Kit'};

function inspire(p){
  const dark=p.dark;
  return head(`body{--bgc:${dark?'var(--deep)':'var(--cream)'};--fgc:${dark?'#fff':'var(--deep)'};background:var(--bgc)}
.wrap{position:absolute;left:90px;right:90px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}
.eb{color:${dark?'var(--gold)':'var(--gold-deep)'}}
.rule{width:120px;height:6px;background:var(--gold);margin:34px 0}
q{quotes:none;font-family:Fraunces,serif;font-weight:500;font-size:${p.qsize||96}px;line-height:1.08;color:var(--fgc);text-wrap:balance}
.sub{margin-top:40px;font-size:34px;line-height:1.45;color:${dark?'#C9D2E0':'var(--muted)'};max-width:780px}
.mark{position:absolute;left:90px;bottom:80px;display:flex;align-items:center;gap:16px;font-family:Fraunces,serif;font-size:32px;color:var(--fgc)}
.mark img{height:56px;background:#fff;border-radius:12px;padding:6px}
.dots{position:absolute;right:90px;bottom:92px;display:grid;grid-template-columns:repeat(5,14px);gap:12px}
.dots i{width:14px;height:14px;border-radius:50%;background:${dark?'#2E4570':'#DDD6CA'}}.dots i.o{background:var(--gold)}`)+
`<div class="wrap"><div class="eb">${p.eyebrow}</div><div class="rule"></div><q>${p.quote}</q><p class="sub">${p.sub}</p></div>
<div class="mark"><img src="src/logo-mark.png">Booked Solid Studio</div>
<div class="dots"><i></i><i class="o"></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="o"></i><i></i></div></body></html>`;
}

function tip(p){
  const d=dir[p.trade];
  return head(`body{background:var(--deep)}
.hd{padding:80px 60px 0}.hd .eb{color:var(--gold)}
h1{font-family:Fraunces,serif;font-weight:500;font-size:${p.hsize||84}px;line-height:1.02;color:#fff;margin-top:16px}
ol{list-style:none;margin:46px 60px 0;display:flex;flex-direction:column;gap:20px;width:${p.olw||580}px}
li{display:flex;gap:22px;align-items:flex-start;color:#fff;font-size:32px;font-weight:500;line-height:1.25}
li b{flex:none;width:56px;height:56px;border-radius:50%;background:var(--gold);color:var(--deep);font-family:Fraunces,serif;font-size:32px;display:flex;align-items:center;justify-content:center}
.foot{background:var(--cream);color:var(--deep);border-top:4px solid var(--gold)}`)+
`<div class="hd"><div class="eb">${p.eyebrow}</div><h1>${p.h1}</h1></div>
<ol>${p.points.map((t,i)=>`<li><b>${i+1}</b>${t}</li>`).join('')}</ol>
<p style="position:absolute;left:60px;top:${p.ptop||1080}px;width:470px;color:#DCE2EC;font-size:29px;line-height:1.35">${p.note} <span style="color:#D2AE66;font-weight:700">Customize it in Canva in minutes.</span></p>
<img class="doc" src="src/${d}/${p.doc}.png" style="left:600px;top:${p.dtop||930}px;width:340px;transform:rotate(6deg)">
`+foot('Get the template &rarr;',' style="background:var(--deep);color:#fff"');
}

function product(p){
  const d=dir[p.trade];
  return head(`.top{position:absolute;left:0;right:0;top:0;height:600px;background:var(--deep);padding:70px 60px 0}
.top .eb{color:var(--gold)}
h1{font-family:Fraunces,serif;font-weight:500;font-size:${p.hsize||90}px;line-height:1;color:#fff;margin-top:18px;width:880px}
.sub{color:#DCE2EC;font-size:34px;margin-top:22px}
.kit{position:absolute;left:60px;right:60px;bottom:160px;text-align:center;font-size:30px;color:var(--muted)}
.kit b{color:var(--deep)}`)+
`<div class="top"><div class="eb">${eyebrowTrade[p.trade]}</div><h1>${p.h1}</h1><div class="sub">Editable in Canva &middot; Instant download</div></div>
<img class="doc" src="src/${d}/${p.doc}.png" style="left:220px;top:${p.dtop||490}px;width:${p.dw||540}px;transform:rotate(${p.rot||-2}deg)">
<p class="kit">Also part of the 5-template <b>${kitName[p.trade]}</b></p>
`+foot();
}

function grid(p){
  const d=dir[p.trade],n=docName[p.trade];
  const order=['agreement','checklist','quote','invoice','intake'];
  return head(`.hd{padding:70px 60px 0}.hd .eb{color:var(--gold-deep)}
h1{font-family:Fraunces,serif;font-weight:500;font-size:${p.hsize||80}px;line-height:1.02;color:var(--deep);margin-top:14px}
.grid{position:absolute;left:60px;right:60px;top:${p.gtop||380}px;display:grid;grid-template-columns:repeat(3,1fr);gap:26px 22px}
.c{text-align:center}.c img{width:100%;height:330px;object-fit:cover;object-position:top;border-radius:6px;box-shadow:0 14px 30px rgba(18,38,71,.25)}
.c p{margin-top:12px;font-weight:700;font-size:25px;color:var(--deep)}
.c.cta{background:var(--deep);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;padding:24px;height:330px}
.c.cta b{font-family:Fraunces,serif;font-weight:500;font-size:44px;line-height:1.1}.c.cta span{color:var(--gold);font-weight:700;font-size:24px;margin-top:14px}`)+
`<div class="hd"><div class="eb">${p.eyebrow}</div><h1>${p.h1}</h1></div>
<div class="grid">${order.map(k=>`<div class="c"><img src="src/${d}/${k}.png"><p>${n[k]}</p></div>`).join('')}<div class="c cta"><b>${p.ctab}</b><span>${p.ctas}</span></div></div>
<p style="position:absolute;left:60px;right:60px;bottom:170px;text-align:center;font-size:32px;color:#4A4E55">${p.line}</p>
`+foot();
}

function rows(p){
  const d=dir[p.trade];
  return head(`.hd{padding:70px 60px 0}.hd .eb{color:var(--gold-deep)}
h1{font-family:Fraunces,serif;font-weight:500;font-size:${p.hsize||78}px;line-height:1.02;color:var(--deep);margin-top:14px}
.rs{position:absolute;left:60px;right:60px;top:${p.rtop||350}px;display:flex;flex-direction:column;gap:18px}
.r{display:flex;align-items:center;gap:30px;background:#fff;border-radius:14px;padding:12px 24px;box-shadow:0 8px 20px rgba(18,38,71,.10)}
.r img{width:110px;height:128px;object-fit:cover;object-position:top;border-radius:4px;box-shadow:0 6px 14px rgba(18,38,71,.25)}
.r b{display:block;font-family:Fraunces,serif;font-weight:500;font-size:40px;color:var(--deep)}
.r span{display:block;font-size:27px;color:var(--muted);margin-top:4px}`)+
`<div class="hd"><div class="eb">${kitName[p.trade]}</div><h1>${p.h1}</h1></div>
<div class="rs">${p.rows.map(([k,b,s])=>`<div class="r"><img src="src/${d}/${k}.png"><div><b>${b}</b><span>${s}</span></div></div>`).join('')}</div>
<p style="position:absolute;left:60px;right:60px;bottom:160px;text-align:center;font-size:30px;color:#4A4E55">Editable in Canva &middot; Instant download</p>
`+foot();
}

function fan(p){
  const d=dir[p.trade],n=docName[p.trade];
  return head(`.top{position:absolute;left:0;right:0;top:0;height:560px;background:var(--deep);padding:70px 60px 0}
.top .eb{color:var(--gold)}
h1{font-family:Fraunces,serif;font-weight:500;font-size:${p.hsize||90}px;line-height:1;color:#fff;margin-top:18px;width:700px}
.sub{color:#DCE2EC;font-size:34px;margin-top:22px}
.badge{position:absolute;right:60px;top:430px;width:220px;height:220px;border-radius:50%;background:var(--gold);color:var(--deep);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:5;box-shadow:0 18px 36px rgba(0,0,0,.3)}
.badge b{font-family:Fraunces,serif;font-weight:500;font-size:92px;line-height:.9}.badge span{font-weight:700;font-size:22px;letter-spacing:.08em;text-transform:uppercase}
.list{position:absolute;left:60px;bottom:160px;display:flex;flex-wrap:wrap;gap:12px;width:880px}
.list span{background:#fff;border:2px solid #DDD6CA;color:var(--deep);font-weight:700;font-size:26px;padding:10px 20px;border-radius:999px}`)+
`<div class="top"><div class="eb">${eyebrowTrade[p.trade]}</div><h1>${p.h1}</h1><div class="sub">${p.sub}</div></div>
<div class="badge"><b>5</b><span>templates</span></div>
<img class="doc" src="src/${d}/${p.docs[0]}.png" style="left:70px;top:610px;width:330px;transform:rotate(-9deg)">
<img class="doc" src="src/${d}/${p.docs[1]}.png" style="left:560px;top:620px;width:330px;transform:rotate(8deg)">
<img class="doc" src="src/${d}/${p.docs[2]}.png" style="left:300px;top:580px;width:380px;transform:rotate(-1deg)">
<div class="list">${['agreement','checklist','quote','invoice','intake'].map(k=>`<span>${n[k]}</span>`).join('')}</div>
`+foot();
}

const R={inspire,tip,product,grid,rows,fan};
for(const p of W){fs.writeFileSync(`_${p.slug}.html`,R[p.kind](p));}
console.log(W.length,'files');
