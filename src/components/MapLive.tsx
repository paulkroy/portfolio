// Interactive MapLibre map of client locations, rendered as a React island on
// top of the static SVG map. If WebGL or the tile server fails, it never
// becomes visible and the SVG stays in place.
import { useEffect, useRef, useState } from 'react';
import type { Map as MapLibreMap, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// MapLibre resolves its worker relative to its own file, which breaks once
// bundled. Let Vite bundle the worker (and its shared chunk) and pass the URL in.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import './MapLive.css';

export interface Pin {
  slug: string;
  name: string;
  industry: string;
  location: string;
  coords: [number, number]; // [lat, lng]
}

const STYLES = {
  dark: 'https://tiles.openfreemap.org/styles/dark',
  light: 'https://tiles.openfreemap.org/styles/positron',
};

const darkQuery = '(prefers-color-scheme: dark)';
const motionQuery = '(prefers-reduced-motion: reduce)';

export default function MapLive({ pins }: { pins: Pin[] }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let popup: Popup | null = null;
    const scheme = window.matchMedia(darkQuery);
    const reduced = window.matchMedia(motionQuery).matches;

    async function init() {
      // Loaded on demand so the map library never blocks first paint.
      const maplibre = await import('maplibre-gl');
      if (cancelled || !container.current) return;
      maplibre.setWorkerUrl(workerUrl);

      const lngs = pins.map((p) => p.coords[1]);
      const lats = pins.map((p) => p.coords[0]);

      const map = new maplibre.Map({
        container: container.current,
        style: scheme.matches ? STYLES.dark : STYLES.light,
        bounds: [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ],
        fitBoundsOptions: { padding: { top: 70, bottom: 70, left: 50, right: 60 } },
        // Two-finger / ctrl-scroll to pan, so the map never hijacks page scrolling.
        cooperativeGestures: true,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
      });
      mapRef.current = map;
      map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'bottom-right');
      map.touchZoomRotate.disableRotation();

      for (const pin of pins) {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'live-pin';
        el.setAttribute('aria-label', `${pin.name}, ${pin.location}`);
        el.addEventListener('click', (event) => {
          event.stopPropagation();
          popup?.remove();
          const body = document.createElement('div');
          body.className = 'live-popup';
          body.innerHTML = `
            <p class="live-popup__meta"></p>
            <p class="live-popup__name"></p>
            <a class="live-popup__link" href="/work/${pin.slug}">Case study <span aria-hidden="true">→</span></a>`;
          body.querySelector('.live-popup__meta')!.textContent = `${pin.industry} · ${pin.location}`;
          body.querySelector('.live-popup__name')!.textContent = pin.name;
          popup = new maplibre.Popup({ offset: 16, closeButton: true, maxWidth: '240px', focusAfterOpen: true })
            .setLngLat([pin.coords[1], pin.coords[0]])
            .setDOMContent(body)
            .addTo(map);
          popup.on('close', () => setActive(null));
          setActive(pin.slug);
          map.easeTo({ center: [pin.coords[1], pin.coords[0]], duration: reduced ? 0 : 600 });
        });
        new maplibre.Marker({ element: el }).setLngLat([pin.coords[1], pin.coords[0]]).addTo(map);
      }

      map.once('load', () => !cancelled && setReady(true));
      map.on('error', (e) => console.warn('[map]', e.error?.message));
    }

    const onScheme = () => mapRef.current?.setStyle(scheme.matches ? STYLES.dark : STYLES.light);
    scheme.addEventListener('change', onScheme);

    init().catch((err) => console.warn('[map] falling back to static map:', err));

    return () => {
      cancelled = true;
      scheme.removeEventListener('change', onScheme);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [pins]);

  useEffect(() => {
    document.querySelectorAll<HTMLButtonElement>('.live-pin').forEach((el, i) => {
      el.dataset.active = String(pins[i]?.slug === active);
    });
  }, [active, pins]);

  return (
    <div className="map-live" data-ready={ready}>
      <div ref={container} className="map-live__canvas" role="region" aria-label="Interactive map of client projects" />
    </div>
  );
}
