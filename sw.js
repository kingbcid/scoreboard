'use strict';
const CACHE='courtside-live-king-brand-2';
const ASSETS=['./','./index.html','./app.js?v=1.1.4','./sync.js?v=1.1.4','./firebase-config.js?v=1.1.4','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./king-logo.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(x=>new Request(new URL(x,self.registration.scope),{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('courtside-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;const u=new URL(e.request.url);const match=ASSETS.find(x=>{const a=new URL(x,self.registration.scope);return a.pathname===u.pathname&&(!u.pathname.endsWith('.js')||a.search===u.search)});if(match)e.respondWith(caches.open(CACHE).then(async c=>(await c.match(new URL(match,self.registration.scope).href))||fetch(e.request,{cache:'no-store'})))});
