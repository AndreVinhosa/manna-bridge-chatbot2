// Service Worker para Manna Bridge PWA
const CACHE_NAME = 'manna-bridge-v1.0.0'
const STATIC_CACHE = 'manna-bridge-static-v1.0.0'
const DYNAMIC_CACHE = 'manna-bridge-dynamic-v1.0.0'

// Arquivos essenciais para cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/_next/static/css/app.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main.js',
  '/api/chatbot/message',
  '/offline.html'
]

// URLs da API para cache dinâmico
const API_URLS = [
  '/api/chatbot/message',
  '/api/chatbot/contact'
]

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
  
  // Força a ativação imediata
  self.skipWaiting()
})

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Removing old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Assume controle de todas as páginas
  self.clients.claim()
})

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Ignorar requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return
  }
  
  // Estratégia Cache First para assets estáticos
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(cacheFirst(request))
    return
  }
  
  // Estratégia Network First para APIs
  if (API_URLS.some(apiUrl => request.url.includes(apiUrl))) {
    event.respondWith(networkFirst(request))
    return
  }
  
  // Estratégia Stale While Revalidate para páginas
  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request))
    return
  }
  
  // Estratégia Cache First para outros recursos
  event.respondWith(cacheFirst(request))
})

// Estratégia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    // Cache apenas respostas válidas
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('[SW] Cache First failed:', error)
    
    // Fallback para página offline
    if (request.mode === 'navigate') {
      return caches.match('/offline.html')
    }
    
    throw error
  }
}

// Estratégia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    
    // Cache respostas de API bem-sucedidas
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('[SW] Network First failed, trying cache:', error)
    
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Retorna resposta offline para APIs
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Você está offline. Verifique sua conexão.',
        offline: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => {
    // Se falhar e não tiver cache, retorna página offline
    if (!cachedResponse) {
      return caches.match('/offline.html')
    }
  })
  
  // Retorna cache imediatamente se disponível, senão aguarda network
  return cachedResponse || fetchPromise
}

// Listener para mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Aqui você pode implementar sincronização de dados offline
    console.log('[SW] Performing background sync')
    
    // Exemplo: enviar mensagens em fila quando voltar online
    const cache = await caches.open(DYNAMIC_CACHE)
    // Implementar lógica de sincronização conforme necessário
    
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}
