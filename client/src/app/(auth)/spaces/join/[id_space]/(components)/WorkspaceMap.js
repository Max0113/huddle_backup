"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Minus, Plus, RotateCcw } from "lucide-react";
import { cn } from "cn";

import OfficeScene from "./OfficeScene";
import ParticipantTile from "./ParticipantTile";

const SCENE_WIDTH = 1000;
const SCENE_HEIGHT = 1070;
const MIN_ZOOM = 0.65;
const MAX_ZOOM = 2.4;

function MapControl({ label, onClick, disabled, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-8 place-items-center rounded-full text-zinc-200 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#c4a7f5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114] disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export default function WorkspaceMap({ people }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const dragRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const baseScaleRef = useRef(1);
  const zoomRef = useRef(1);

  const [baseScale, setBaseScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedId, setSelectedId] = useState(
    () => people.find((person) => person.id === "amanda")?.id ?? people[0]?.id,
  );

  const clampPan = useCallback((nextPan, nextZoom = zoomRef.current) => {
    const { width, height } = sizeRef.current;
    const scale = baseScaleRef.current * nextZoom;
    const maxX = Math.max(0, (SCENE_WIDTH * scale - width) / 2);
    const maxY = Math.max(0, (SCENE_HEIGHT * scale - height) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, nextPan.x)),
      y: Math.min(maxY, Math.max(-maxY, nextPan.y)),
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const measure = () => {
      const { width, height } = viewport.getBoundingClientRect();
      if (!width || !height) return;

      sizeRef.current = { width, height };

      const cover = Math.max(width / SCENE_WIDTH, height / SCENE_HEIGHT);
      const scale = Math.min(cover, (height / SCENE_HEIGHT) * 1.22);

      baseScaleRef.current = scale;
      setBaseScale(scale);
      setPan((current) => clampPan(current));
      setReady(true);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [clampPan]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const applyZoom = (nextZoom) => {
    const clamped = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, Math.round(nextZoom * 100) / 100),
    );

    zoomRef.current = clamped;
    setZoom(clamped);
    setPan((current) => clampPan(current, clamped));
  };

  const resetView = () => {
    zoomRef.current = 1;
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await sectionRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen can be blocked by browser policy; the map stays usable.
    }
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0 || dragRef.current) return;
    if (event.target.closest("[data-participant]")) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };

    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;

    setPan(
      clampPan({
        x: drag.panX + event.clientX - drag.startX,
        y: drag.panY + event.clientY - drag.startY,
      }),
    );
  };

  const endDrag = (event) => {
    if (!dragRef.current) return;

    dragRef.current = null;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const selectedPerson = people.find((person) => person.id === selectedId);

  return (
    <section
      ref={sectionRef}
      aria-label="Huddle office map"
      aria-describedby="map-help"
      className="relative h-full w-full overflow-hidden bg-[#83827e] bg-[radial-gradient(circle_at_50%_38%,#979691_0%,#868580_55%,#777672_100%)]"
    >
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "absolute inset-0 touch-none overflow-hidden",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2 transition-opacity duration-300",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: `${SCENE_WIDTH}px`,
            height: `${SCENE_HEIGHT}px`,
            transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          <div
            className="relative h-full w-full origin-center"
            style={{ transform: `scale(${baseScale * zoom})` }}
          >
            <OfficeScene />
            {people.map((person) => (
              <ParticipantTile
                key={person.id}
                person={person}
                selected={selectedId === person.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_0_120px_rgba(20,16,12,.32)]" />

      <div className="absolute bottom-5 right-3 z-20 flex flex-col items-center gap-0.5 rounded-full border border-white/10 bg-[#111114]/95 p-1 shadow-2xl backdrop-blur-md sm:bottom-7 sm:right-4">
        <MapControl
          label={isFullscreen ? "Exit full screen" : "View map full screen"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4" aria-hidden="true" />
          ) : (
            <Maximize2 className="size-4" aria-hidden="true" />
          )}
        </MapControl>
        <span className="h-px w-5 bg-white/10" aria-hidden="true" />
        <MapControl
          label="Zoom in"
          onClick={() => applyZoom(zoom + 0.15)}
          disabled={zoom >= MAX_ZOOM}
        >
          <Plus className="size-4" aria-hidden="true" />
        </MapControl>
        <MapControl
          label="Zoom out"
          onClick={() => applyZoom(zoom - 0.15)}
          disabled={zoom <= MIN_ZOOM}
        >
          <Minus className="size-4" aria-hidden="true" />
        </MapControl>
        <span className="h-px w-5 bg-white/10" aria-hidden="true" />
        <MapControl label="Reset map view" onClick={resetView}>
          <RotateCcw className="size-4" aria-hidden="true" />
        </MapControl>
      </div>

      <p id="map-help" className="sr-only">
        Drag the office map to look around. Use the zoom controls to get a closer
        view. Select a person to focus their spot.
      </p>
      <p className="sr-only" aria-live="polite">
        {selectedPerson ? `${selectedPerson.name} selected` : ""}
      </p>
    </section>
  );
}
