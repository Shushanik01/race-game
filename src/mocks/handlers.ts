import { http, HttpResponse } from 'msw';
import { loadDB, saveDB } from './db.ts';

const BASE = 'http://localhost:3000';

export const handlers = [
  // ── Garage ────────────────────────────────────────────────────────────────

  http.get(`${BASE}/garage`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('_page') || '1');
    const limit = parseInt(url.searchParams.get('_limit') || '7');
    const db = loadDB();
    const start = (page - 1) * limit;
    return HttpResponse.json(db.garage.slice(start, start + limit), {
      headers: { 'X-Total-Count': String(db.garage.length) },
    });
  }),

  http.get(`${BASE}/garage/:id`, ({ params }) => {
    const car = loadDB().garage.find((c) => c.id === Number(params.id));
    return car
      ? HttpResponse.json(car)
      : HttpResponse.json({ error: 'Car not found' }, { status: 404 });
  }),

  http.post(`${BASE}/garage`, async ({ request }) => {
    const body = (await request.json()) as { name: string; color: string };
    const db = loadDB();
    const car = { id: db.nextGarageId++, ...body };
    db.garage.push(car);
    saveDB(db);
    return HttpResponse.json(car, { status: 201 });
  }),

  http.put(`${BASE}/garage/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { name: string; color: string };
    const db = loadDB();
    const idx = db.garage.findIndex((c) => c.id === Number(params.id));
    if (idx === -1) return HttpResponse.json({ error: 'Car not found' }, { status: 404 });
    db.garage[idx] = { id: Number(params.id), ...body };
    saveDB(db);
    return HttpResponse.json(db.garage[idx]);
  }),

  http.delete(`${BASE}/garage/:id`, ({ params }) => {
    const db = loadDB();
    const idx = db.garage.findIndex((c) => c.id === Number(params.id));
    if (idx === -1) return HttpResponse.json({ error: 'Car not found' }, { status: 404 });
    db.garage.splice(idx, 1);
    saveDB(db);
    return HttpResponse.json({ success: true });
  }),

  // ── Engine ────────────────────────────────────────────────────────────────

  http.patch(`${BASE}/engine`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    if (status === 'started') {
      const velocity = Math.floor(Math.random() * 150) + 50;
      return HttpResponse.json({ velocity, distance: 500000 });
    }
    if (status === 'drive') {
      const success = Math.random() > 0.1;
      return success
        ? HttpResponse.json({ success: true })
        : HttpResponse.json({ success: false }, { status: 500 });
    }
    if (status === 'stopped') {
      return HttpResponse.json({ success: true });
    }
    return HttpResponse.json({ error: 'Invalid status' }, { status: 400 });
  }),

  // ── Winners ───────────────────────────────────────────────────────────────

  http.get(`${BASE}/winners`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('_page') || '1');
    const limit = parseInt(url.searchParams.get('_limit') || '10');
    const sort = (url.searchParams.get('_sort') || 'id') as 'id' | 'wins' | 'time';
    const order = (url.searchParams.get('_order') || 'ASC').toUpperCase();
    const db = loadDB();
    const sorted = [...db.winners].sort((a, b) =>
      order === 'ASC' ? a[sort] - b[sort] : b[sort] - a[sort]
    );
    const start = (page - 1) * limit;
    return HttpResponse.json(sorted.slice(start, start + limit), {
      headers: { 'X-Total-Count': String(db.winners.length) },
    });
  }),

  http.get(`${BASE}/winners/:id`, ({ params }) => {
    const winner = loadDB().winners.find((w) => w.id === Number(params.id));
    return winner
      ? HttpResponse.json(winner)
      : HttpResponse.json({ error: 'Winner not found' }, { status: 404 });
  }),

  http.post(`${BASE}/winners`, async ({ request }) => {
    const body = (await request.json()) as { id: number; wins: number; time: number };
    const db = loadDB();
    db.winners.push(body);
    saveDB(db);
    return HttpResponse.json(body, { status: 201 });
  }),

  http.put(`${BASE}/winners/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { wins: number; time: number };
    const db = loadDB();
    const idx = db.winners.findIndex((w) => w.id === Number(params.id));
    if (idx === -1) return HttpResponse.json({ error: 'Winner not found' }, { status: 404 });
    db.winners[idx] = { id: Number(params.id), ...body };
    saveDB(db);
    return HttpResponse.json(db.winners[idx]);
  }),

  http.delete(`${BASE}/winners/:id`, ({ params }) => {
    const db = loadDB();
    const idx = db.winners.findIndex((w) => w.id === Number(params.id));
    if (idx === -1) return HttpResponse.json({ error: 'Winner not found' }, { status: 404 });
    db.winners.splice(idx, 1);
    saveDB(db);
    return HttpResponse.json({ success: true });
  }),
];
