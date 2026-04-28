const CACHE_NAME = 'salvatore-cache-v8';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './images/logo.webp',
    './images/logo2.webp',
    './images/prato.webp',
    './images/whats.webp',
    './images/logo64.png',
    './images/512logo.png'
];
//Instala o Service Worker e coloc os arquivoc no Cache
self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            console.log('preparare la salsa nella Cache 🍝');
            return cache.addAll(ASSETS);
        })
    );
});
//Faz as requisições olharem o cache primeiro 
self.addEventListener('fetch', (event) => {
    event.respondWich(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);

        })
    );
});
//Remove caches antigo quando atualizar
self.addEventListener('activate', (event)=> {
    event.waitUntil(
        caches.keys().then((keys)=>{
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});