const CACHE_NAME = 'cronicas-rpg-v6';
const FONT_CACHE_NAME = 'cronicas-rpg-fonts-v1';

// Todos os arquivos essenciais do portal e das 8 aventuras para funcionamento 100% offline
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/dice-roller.js',
  '/adventure-save.js',
  '/favicon.svg',
  '/site.webmanifest',
  '/hero-bg.webp',
  '/vampire-bg.webp',
  '/cyberpunk-bg.webp',
  '/arsenal-bg.webp',
  '/monster-bg.webp',
  '/inheritance-bg.webp',
  '/metal-bg.webp',
  '/monastery-bg.webp',

  // 1. Jovem Guerreiro
  '/jovem-guerreiro/',
  '/jovem-guerreiro/index.html',
  '/jovem-guerreiro/core/core.js',
  '/jovem-guerreiro/core/core.css',
  '/jovem-guerreiro/my-game/game.js',
  '/jovem-guerreiro/my-game/styles.css',
  '/jovem-guerreiro/my-game/images/background.webp',
  '/jovem-guerreiro/my-game/images/caverna-negra-key-art.png',
  '/jovem-guerreiro/my-game/images/scenes/scene-00.webp',
  '/jovem-guerreiro/my-game/images/scenes/scene-00-modern.png',

  // 2. Nascido das Trevas
  '/nascido-das-trevas/',
  '/nascido-das-trevas/index.html',
  '/nascido-das-trevas/core/core.js',
  '/nascido-das-trevas/core/core.css',
  '/nascido-das-trevas/my-game/game.js',
  '/nascido-das-trevas/my-game/styles.css',
  '/nascido-das-trevas/bg/cold_prison.webp',
  '/nascido-das-trevas/bg/dark_streets.webp',
  '/nascido-das-trevas/bg/mustang_chase.webp',
  '/nascido-das-trevas/bg/punk_rock_bar.webp',
  '/nascido-das-trevas/bg/vampire_confront.webp',

  // 3. Sem Saída
  '/sem-saida/',
  '/sem-saida/index.html',
  '/sem-saida/core/core.js',
  '/sem-saida/core/core.css',
  '/sem-saida/my-game/game.js',
  '/sem-saida/my-game/styles.css',

  // 4. Assalto ao Mestre Arsenal
  '/assalto-ao-mestre-arsenal/',
  '/assalto-ao-mestre-arsenal/index.html',
  '/assalto-ao-mestre-arsenal/core/core.js',
  '/assalto-ao-mestre-arsenal/my-game/game.js',
  '/assalto-ao-mestre-arsenal/my-game/styles.css',
  '/assalto-ao-mestre-arsenal/bg/arsenal_armory.webp',
  '/assalto-ao-mestre-arsenal/bg/arsenal_dungeon.webp',
  '/assalto-ao-mestre-arsenal/bg/guild_victory.webp',
  '/assalto-ao-mestre-arsenal/bg/kristophania_city.webp',
  '/assalto-ao-mestre-arsenal/bg/mountain_pass.webp',
  '/assalto-ao-mestre-arsenal/bg/tower_climbing.webp',
  '/assalto-ao-mestre-arsenal/bg/zombie_corridor.webp',

  // 5. Eu, O Monstro
  '/eu-o-monstro/',
  '/eu-o-monstro/index.html',
  '/eu-o-monstro/core/core.js',
  '/eu-o-monstro/my-game/game.js',
  '/eu-o-monstro/my-game/styles.css',
  '/eu-o-monstro/bg/dark_alley.webp',
  '/eu-o-monstro/bg/forest_clearing.webp',
  '/eu-o-monstro/bg/umbra_world.webp',
  '/eu-o-monstro/bg/werewolf_room.webp',

  // 6. Herança Maldita
  '/heranca-maldita/',
  '/heranca-maldita/index.html',
  '/heranca-maldita/core/core.js',
  '/heranca-maldita/my-game/game.js',
  '/heranca-maldita/my-game/styles.css',
  '/heranca-maldita/bg/cemetery_mausoleum.webp',
  '/heranca-maldita/bg/cursed_forest.webp',
  '/heranca-maldita/bg/dark_police_station.webp',
  '/heranca-maldita/bg/old_mansion.webp',

  // 7. Coragem Metálica
  '/coragem-metalica/',
  '/coragem-metalica/index.html',
  '/coragem-metalica/core/core.js',
  '/coragem-metalica/my-game/game.js',
  '/coragem-metalica/my-game/styles.css',
  '/coragem-metalica/bg/alien_hive.webp',
  '/coragem-metalica/bg/planet_surface.webp',
  '/coragem-metalica/bg/ship_interior.webp',
  '/coragem-metalica/bg/space_orbit.webp',

  // 8. O Segredo do Mosteiro
  '/o-segredo-do-mosteiro/',
  '/o-segredo-do-mosteiro/index.html',
  '/o-segredo-do-mosteiro/core/core.js',
  '/o-segredo-do-mosteiro/core/core.css',
  '/o-segredo-do-mosteiro/my-game/game.js',
  '/o-segredo-do-mosteiro/my-game/styles.css'
];

// Instalação do Service Worker: Pré-armazena em cache o acervo completo
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Adiciona individualmente para evitar que 1 falha quebre todas as outras
      return Promise.allSettled(
        CORE_ASSETS.map((url) =>
          fetch(url, { cache: 'no-cache' })
            .then((res) => {
              if (res.ok) return cache.put(url, res);
            })
            .catch((err) => console.warn(`Falha ao pré-cachear ${url}:`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// Ativação do Service Worker: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== FONT_CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Cache de fontes do Google (Google Fonts & Gstatic)
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);
        });
      })
    );
    return;
  }

  // 2. Recursos locais do site (Portal, Histórias, Scripts, Imagens, Áudios)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Se estiver em cache, retorna imediatamente
          if (cachedResponse) {
            // Em segundo plano, tenta atualizar se houver conexão (Stale-While-Revalidate)
            fetch(request)
              .then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                  cache.put(request, networkResponse.clone());
                }
              })
              .catch(() => {});
            return cachedResponse;
          }

          // Fallback inteligente para rotas de pasta (ex: /sem-saida/ -> /sem-saida/index.html)
          if (request.mode === 'navigate' || request.destination === 'document') {
            const pathWithIndex = url.pathname.endsWith('/') 
              ? url.pathname + 'index.html' 
              : url.pathname + '/index.html';
            
            return cache.match(pathWithIndex).then((indexMatch) => {
              if (indexMatch) return indexMatch;
              
              // Se não encontrou, tenta buscar da rede
              return fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                  cache.put(request, networkResponse.clone());
                }
                return networkResponse;
              }).catch(() => cache.match('/index.html'));
            });
          }

          // Se não estiver em cache, busca na rede e guarda no cache
          return fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.ok) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
        });
      })
    );
  }
});
