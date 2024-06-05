import app from './app.tsx';

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3000
})
