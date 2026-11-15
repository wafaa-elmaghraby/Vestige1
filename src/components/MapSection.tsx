import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { spanStart } from '../utils/nasa';
import { MapPin, Globe, Compass, Layers, Navigation } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface MapSectionProps {
  activeWorld: Destination;
  onSelectWorld: (world: Destination) => void;
  onSelectMission: (mission: Mission) => void;
}

export const MapSection: React.FC<MapSectionProps> = ({
  activeWorld,
  onSelectWorld,
  onSelectMission,
}) => {
  const { t, localize, language } = useT();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersByIdRef = useRef<Record<string, L.Marker>>({});

  const [selectedPinMission, setSelectedPinMission] = useState<Mission | null>(null);

  // Filter missions for the active planetary world that have valid numeric coordinates
  const worldMissions = missionsData.filter(
    (m) => m.destination === activeWorld && m.coordinates.latNum !== undefined && m.coordinates.lonNum !== undefined
  );

  // Tile endpoints configuration
  const tileConfigs = {
    Moon: {
      url: 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      fallbackUrl: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect width='256' height='256' fill='%2306101f'/%3E%3Cpath d='M0 64H256M0 128H256M0 192H256M64 0V256M128 0V256M192 0V256' stroke='%231e3a5f' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E",
      attribution: 'NASA Moon Trek / LRO WAC Global Mosaic (USGS / NASA)',
      maxZoom: 7,
      minZoom: 1,
      center: [10, 15] as [number, number],
      zoom: 2,
    },
    Mars: {
      url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      fallbackUrl: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect width='256' height='256' fill='%2306101f'/%3E%3Cpath d='M0 64H256M0 128H256M0 192H256M64 0V256M128 0V256M192 0V256' stroke='%231e3a5f' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E",
      attribution: 'NASA Mars Trek / MGS MOLA & Viking MDIM (NASA / JPL / USGS)',
      maxZoom: 7,
      minZoom: 1,
      center: [5, 50] as [number, number],
      zoom: 2,
    },
  };

  useEffect(() => {
    setSelectedPinMission(null);
  }, [activeWorld]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    markersByIdRef.current = {};

    // Destroy previous map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const cfg = tileConfigs[activeWorld];

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: cfg.center,
      zoom: cfg.zoom,
      minZoom: cfg.minZoom,
      maxZoom: cfg.maxZoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Add zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Primary NASA Trek Tile layer with fallback
    const tileLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
      noWrap: true,
      errorTileUrl: cfg.fallbackUrl,
    });

    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;

    // Layer group for pins
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Add markers
    worldMissions.forEach((mission) => {
      const lat = mission.coordinates.latNum!;
      const lon = mission.coordinates.lonNum!;

      const isMars = mission.destination === 'Mars';
      const markerColor = isMars ? '#4fd8ff' : '#7b8bff';
      const pulseColor = isMars ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.4)';

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-nasa-pin',
        html: `
          <div style="position: relative; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; inset: 0; border-radius: 9999px; background-color: ${pulseColor}; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 14px; height: 14px; border-radius: 9999px; background-color: ${markerColor}; border: 2px solid white; box-shadow: 0 0 10px ${markerColor};"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });

      const marker = L.marker([lat, lon], { icon: customIcon });

      // Localized strings for popup
      const missionTypeName = localize(mission.type);
      const missionName = localize(mission.name);
      const locName = localize(mission.locationName);
      const worldName = isMars ? t.worldSelector.marsTitle : t.worldSelector.moonTitle;
      const dossierBtnText = t.map.fullDossierBtn;

      // Popup Content with Clean Dark Aerospace Typography & High Contrast
      const popupHtml = `
        <div style="background-color: #090d16; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 220px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: 700; text-transform: uppercase; color: ${isMars ? '#f87171' : '#4fd8ff'}; letter-spacing: 0.05em;">
              ${missionTypeName} · ${worldName}
            </span>
            <span style="font-size: 10px; font-family: monospace; color: #cbd5e1; background: #1e293b; padding: 1px 6px; border-radius: 4px; font-weight: 600;">
              ${spanStart(mission.activeSpan)}
            </span>
          </div>
          <div style="font-size: 15px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 4px; line-height: 1.2;">
            ${missionName}
          </div>
          <div style="font-size: 12px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px;">
            ${locName}
          </div>
          <div style="font-size: 10px; font-family: monospace; color: #cbd5e1; background: #0f172a; padding: 4px 6px; border-radius: 4px; border: 1px solid #1e293b; margin-bottom: 10px;">
            📍 ${localize(mission.coordinates.formatted)}
          </div>
          <button id="popup-btn-${mission.id}" style="width: 100%; padding: 8px 12px; background-color: #2e7dff; color: #ffffff; border: none; border-radius: 6px; font-size: 11px; font-family: monospace; text-transform: uppercase; cursor: pointer; font-weight: 700; letter-spacing: 0.05em; transition: background 0.2s;">
            ${dossierBtnText}
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'nasa-leaflet-popup',
      });

      marker.on('popupopen', () => {
        spaceAudio.playTelemetryBeep(1300, 0.04);
        setSelectedPinMission(mission);
        setTimeout(() => {
          const btn = document.getElementById(`popup-btn-${mission.id}`);
          if (btn) {
            btn.onclick = () => {
              spaceAudio.playTelemetryBeep(1400, 0.05);
              onSelectMission(mission);
            };
          }
        }, 50);
      });

      markersByIdRef.current[mission.id] = marker;
      marker.addTo(markersLayer);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeWorld, language]);

  const handleFocusMission = (m: Mission) => {
    if (!mapInstanceRef.current || m.coordinates.latNum === undefined || m.coordinates.lonNum === undefined) return;
    spaceAudio.playTelemetryBeep(1200, 0.04);
    setSelectedPinMission(m);
    mapInstanceRef.current.flyTo([m.coordinates.latNum, m.coordinates.lonNum], 4, {
      duration: 1.2,
    });
    markersByIdRef.current[m.id]?.openPopup();
  };

  return (
    <section id="map-section" className="relative isolate z-10 border-t border-[color:var(--line)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="04"
          tag={t.map.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.map.title}
          description={t.map.subtitle}
          action={
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectWorld('Mars')}
                aria-pressed={activeWorld === 'Mars'}
                className={`chip ${activeWorld === 'Mars' ? 'is-active' : ''}`}
              >
                {t.map.filterMars}
              </button>
              <button
                onClick={() => onSelectWorld('Moon')}
                aria-pressed={activeWorld === 'Moon'}
                className={`chip ${activeWorld === 'Moon' ? 'is-active' : ''}`}
              >
                {t.map.filterMoon}
              </button>
            </div>
          }
        />

        {/* Map Viewport Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Leaflet Canvas */}
          <div className="lg:col-span-8 relative rounded-xl border border-[color:var(--line)] overflow-hidden bg-[color:var(--surface)] shadow-2xl">
            {/* Top Toolbar Overlay */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-[color:var(--surface)]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[color:var(--line)] text-xs font-mono text-[color:var(--ink-2)]">
              <Layers className="w-3.5 h-3.5 text-[color:var(--cyan)]" />
              <span>
                {activeWorld === 'Mars' ? 'Mars Trek (MOLA)' : 'Moon Trek (LRO WAC)'}
              </span>
            </div>

            {/* Coordinates / Compass HUD overlay */}
            <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-2 bg-[color:var(--surface)]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[color:var(--line)] text-[11px] font-mono text-[color:var(--ink-2)]">
              <Navigation className="w-3 h-3 text-[color:var(--cyan)]" />
              <span>{t.map.clickToView}</span>
            </div>

            {/* Actual Map Container */}
            <div
              ref={mapContainerRef}
              className="w-full h-[460px] sm:h-[560px] z-0 cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Right Sidebar: Quick Location Focus Cards */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            <div className="text-xs font-mono uppercase tracking-wider text-[color:var(--ink-2)] mb-2 flex items-center gap-2 px-1">
              <MapPin className="w-3.5 h-3.5 text-[color:var(--cyan)]" />
              <span>{t.map.sectorObjectsCount} ({worldMissions.length})</span>
            </div>

            {worldMissions.map((m) => {
              const isSelected = selectedPinMission?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => handleFocusMission(m)}
                  className={`group p-3.5 rounded-xl border text-start cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[color:var(--surface-2)] border-[color:var(--line-strong)] shadow-lg'
                      : 'bg-[color:var(--surface)]/80 border-[color:var(--line)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-2)]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[color:var(--ink-2)] mb-1">
                    <span className="truncate">{localize(m.type)}</span>
                    <span className="text-[color:var(--ink-3)] font-mono-tabular">{spanStart(m.activeSpan)}</span>
                  </div>

                  <div className="text-sm font-display font-bold text-[color:var(--ink)] uppercase group-hover:text-[color:var(--cyan)] transition-colors">
                    {localize(m.name)}
                  </div>

                  <div className="text-xs text-[color:var(--ink-2)] mt-1 truncate">
                    {localize(m.locationName)}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[color:var(--line)] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[color:var(--ink-3)]">{m.coordinates.lat}, {m.coordinates.lon}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        spaceAudio.playTelemetryBeep(1400, 0.05);
                        onSelectMission(m);
                      }}
                      className="text-[color:var(--cyan)] hover:text-[color:var(--cyan)] font-semibold"
                    >
                      {t.map.openDossierBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
