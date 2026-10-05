# MOVEO — Premium Movie Discovery

A production-oriented movie discovery frontend built with Next.js 14 App Router, Tailwind CSS, Framer Motion and TMDB.

## Environment

```env
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=
```

`API_ACCESS_TOKEN` is preferred and is sent as a server-side Bearer token. TMDB documents Bearer authentication for v3 and v4 application access. Never expose the token through a `NEXT_PUBLIC_` variable.

## Included

- MOVEO visual identity inspired by the supplied cinematic copper / midnight logo.
- Original editorial hero with rotating TMDB films.
- Dark / light mode with persisted preference and reduced visual flash.
- Responsive navigation and mobile menu.
- Debounced movie search with protected server route.
- Trending, now playing, top-rated, popular and upcoming rails.
- Genre pages and paginated search results.
- Movie detail pages with trailer modal, cast, stills and similar films.
- Device-local watchlist with action toasts.
- Premium skeleton loading state and route error recovery UI.
- Responsive desktop / tablet / mobile layouts.
- Reduced-motion support.
- TMDB attribution notice.

## Run

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm start
```
