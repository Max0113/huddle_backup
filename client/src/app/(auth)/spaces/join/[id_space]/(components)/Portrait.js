"use client";

import { useId } from "react";
import { cn } from "cn";

const PALETTES = {
  alex: {
    bg1: "#3B2B50",
    bg2: "#1D1527",
    skin: "#7A5039",
    skinShade: "#66412E",
    hair: "#17110F",
    beard: "#241814",
    shirt: "#E4C15A",
    style: "crop",
    glasses: false,
    headphones: false,
  },
  amanda: {
    bg1: "#254E4F",
    bg2: "#10292A",
    skin: "#E6B598",
    skinShade: "#CE997C",
    hair: "#2C7C84",
    beard: null,
    shirt: "#3D5F6C",
    style: "bob",
    glasses: false,
    headphones: false,
  },
  chelsea: {
    bg1: "#4C3A21",
    bg2: "#241A10",
    skin: "#F0C9A7",
    skinShade: "#D8AD8A",
    hair: "#5A3625",
    beard: null,
    shirt: "#E7D6A2",
    style: "bob",
    glasses: false,
    headphones: false,
  },
  youmes: {
    bg1: "#432E69",
    bg2: "#211631",
    skin: "#BB7A52",
    skinShade: "#9D603C",
    hair: "#201613",
    beard: null,
    shirt: "#7C4DCE",
    style: "crop",
    glasses: false,
    headphones: false,
  },
  creator: {
    bg1: "#57411A",
    bg2: "#291D0C",
    skin: "#D7A16E",
    skinShade: "#BC8655",
    hair: "#32251C",
    beard: null,
    shirt: "#C99C3E",
    style: "curls",
    glasses: true,
    headphones: false,
  },
  sofia: {
    bg1: "#452C44",
    bg2: "#211421",
    skin: "#E7BFA1",
    skinShade: "#CFA07F",
    hair: "#2A1D1A",
    beard: null,
    shirt: "#C75D75",
    style: "long",
    glasses: false,
    headphones: true,
  },
};

function HairBack({ style, hair }) {
  if (style === "bob") {
    return (
      <path
        d="M17 26c0-9.4 6-16.4 15-16.4S47 16.6 47 26v14.5c0 3.2-3.8 4.4-5.2 1.4l-1-13.5H23.2l-1 13.5C20.8 45 17 43.8 17 40.6Z"
        fill={hair}
      />
    );
  }

  if (style === "long") {
    return (
      <path
        d="M16.6 27C16.6 17 23 10 32 10s15.4 7 15.4 17v18.6c0 3-3.8 4.2-5.2 1.2l-1.2-16.4H22.9L21.7 46.8c-1.4 3-5.1 1.8-5.1-1.2Z"
        fill={hair}
      />
    );
  }

  return null;
}

function HairFront({ style, hair }) {
  const cap =
    "M19.4 27.3c0-8.8 5-14.4 12.6-14.4s12.6 5.6 12.6 14.4c0 1.5-.2 2.9-.6 4.2-1.7-4.7-5.4-6.8-12-6.8s-10.3 2.1-12 6.8c-.4-1.3-.6-2.7-.6-4.2Z";

  if (style === "bob") {
    return (
      <>
        <path d={cap} fill={hair} />
        <path
          d="M21.2 22.4c2.1-4.4 6-6.9 11-6.9 5.2 0 9.1 2.3 10.8 6.3-3.4-2.1-6.8-3-10.7-2.2-3.2.7-6.2 2.4-8.5 5Z"
          fill={hair}
          opacity=".92"
        />
      </>
    );
  }

  if (style === "long") {
    return (
      <>
        <path d={cap} fill={hair} />
        <path
          d="M20.7 21.2c2.6-4 6.5-6 11.3-6 4.9 0 8.8 2 11.3 6-2.1-1.2-4.6-1.8-7.6-1.8-4 0-7.7 1-11.2 3.2Z"
          fill={hair}
          opacity=".9"
        />
        <path
          d="M31.6 15.8c.8 2.1 1.2 4.5 1.2 7.3"
          stroke="#161012"
          strokeWidth=".8"
          strokeLinecap="round"
          opacity=".45"
        />
      </>
    );
  }

  if (style === "curls") {
    return (
      <>
        <path d={cap} fill={hair} />
        <g fill={hair}>
          <circle cx="24.4" cy="17.2" r="3.2" />
          <circle cx="29.1" cy="14.7" r="3.4" />
          <circle cx="34.2" cy="15" r="3.2" />
          <circle cx="38.7" cy="17.6" r="3" />
          <circle cx="41.8" cy="21.4" r="2.5" />
          <circle cx="21.2" cy="21.2" r="2.4" />
        </g>
      </>
    );
  }

  return (
    <>
      <path d={cap} fill={hair} />
      <path
        d="M21.5 21.8c2.4-4.2 6.1-6.3 10.8-6.3 4.6 0 8.3 2.1 10.7 6.1-2.7-1.7-5.7-2.4-9-1.9-4 .6-7.4 2.3-10.1 5.1Z"
        fill={hair}
        opacity=".95"
      />
      <path
        d="M19.7 27.5c-.6 2.4-.8 4.6-.5 6.6"
        stroke={hair}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M44.3 27.5c.6 2.4.8 4.6.5 6.6"
        stroke={hair}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  );
}

export default function Portrait({
  variant = "youmes",
  name = "Huddle member",
  className,
}) {
  const palette = PALETTES[variant] ?? PALETTES.youmes;
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const backgroundId = `portrait-bg-${id}`;
  const glowId = `portrait-glow-${id}`;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={name}
      className={cn("block size-full", className)}
    >
      <defs>
        <linearGradient id={backgroundId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.bg1} />
          <stop offset="1" stopColor={palette.bg2} />
        </linearGradient>
        <radialGradient id={glowId} cx=".28" cy=".18" r=".95">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".22" />
          <stop offset=".65" stopColor="#ffffff" stopOpacity=".04" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="64" height="64" fill={`url(#${backgroundId})`} />
      <circle cx="32" cy="30" r="25" fill="#ffffff" opacity=".035" />
      <rect width="64" height="64" fill={`url(#${glowId})`} />

      <HairBack style={palette.style} hair={palette.hair} />

      <path
        d="M6.6 64c1.3-10.8 10.8-16.8 25.4-16.8S56.1 53.2 57.4 64Z"
        fill={palette.shirt}
      />
      <path
        d="M6.6 64c1.3-10.8 10.8-16.8 25.4-16.8 3.7 0 7 .5 9.8 1.4C26 50 15 54.9 13.2 64Z"
        fill="#ffffff"
        opacity=".07"
      />
      <path
        d="M27.8 39.5h8.4v8.9c0 2.4-1.9 4.3-4.2 4.3s-4.2-1.9-4.2-4.3Z"
        fill={palette.skinShade}
      />
      <path
        d="M26 47.9 32 53l6-5.1-2.2 10.2h-7.6Z"
        fill="#ffffff"
        opacity=".16"
      />

      <ellipse cx="32" cy="28" rx="12.4" ry="14" fill={palette.skin} />
      <ellipse
        cx="32"
        cy="30.4"
        rx="11"
        ry="10.6"
        fill={palette.skin}
        opacity=".55"
      />
      <circle cx="19.5" cy="29.8" r="2.4" fill={palette.skinShade} />
      <circle cx="44.5" cy="29.8" r="2.4" fill={palette.skinShade} />

      {palette.beard ? (
        <path
          d="M21.4 31.2c0 7 4 12 10.6 12s10.6-5 10.6-12c0 0-2.2 4.2-4.6 5.4-1.6.8-3.5.7-6 .7s-4.4.1-6-.7c-2.4-1.2-4.6-5.4-4.6-5.4Z"
          fill={palette.beard}
          opacity=".85"
        />
      ) : null}

      <HairFront style={palette.style} hair={palette.hair} />

      <path
        d="M25.2 25c1.3-1 3.1-1 4.4 0"
        fill="none"
        stroke={palette.hair}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity=".8"
      />
      <path
        d="M34.4 25c1.3-1 3.1-1 4.4 0"
        fill="none"
        stroke={palette.hair}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity=".8"
      />

      <ellipse cx="27.5" cy="29.2" rx="1.25" ry="1.55" fill="#241714" />
      <ellipse cx="36.5" cy="29.2" rx="1.25" ry="1.55" fill="#241714" />
      <circle cx="27.9" cy="28.6" r=".4" fill="#ffffff" opacity=".8" />
      <circle cx="36.9" cy="28.6" r=".4" fill="#ffffff" opacity=".8" />

      <path
        d="M32 29.6v4.3c0 .8-.5 1.3-1.3 1.5"
        fill="none"
        stroke={palette.skinShade}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M28.4 37.1c2.1 2 5.1 2 7.2 0"
        fill="none"
        stroke="#7a3b34"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <ellipse cx="23.6" cy="34.2" rx="2.2" ry="1.2" fill="#e2796b" opacity=".3" />
      <ellipse cx="40.4" cy="34.2" rx="2.2" ry="1.2" fill="#e2796b" opacity=".3" />

      {palette.glasses ? (
        <g>
          <path
            d="M22.7 26.9h7.1v4.4c0 1.4-1.1 2.5-2.5 2.5h-2.1c-1.4 0-2.5-1.1-2.5-2.5Z"
            fill="#18141A"
          />
          <path
            d="M34.2 26.9h7.1v4.4c0 1.4-1.1 2.5-2.5 2.5h-2.1c-1.4 0-2.5-1.1-2.5-2.5Z"
            fill="#18141A"
          />
          <path d="M29.8 28.4h4.4" stroke="#18141A" strokeWidth="1.5" />
          <path
            d="m22.7 28-2.3-.7M41.3 28l2.3-.7"
            stroke="#18141A"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="m24.7 28.7 2.4-1M36.5 28.7l2.4-1"
            stroke="#ffffff"
            strokeWidth=".8"
            strokeLinecap="round"
            opacity=".35"
          />
        </g>
      ) : null}

      {palette.headphones ? (
        <g>
          <path
            d="M17.6 30.3c0-9.2 6.2-16.2 14.4-16.2s14.4 7 14.4 16.2"
            fill="none"
            stroke="#211C27"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <rect
            x="14.9"
            y="27.7"
            width="5.6"
            height="9.4"
            rx="2.6"
            fill="#2B2433"
            stroke="#41374D"
            strokeWidth=".8"
          />
          <rect
            x="43.5"
            y="27.7"
            width="5.6"
            height="9.4"
            rx="2.6"
            fill="#2B2433"
            stroke="#41374D"
            strokeWidth=".8"
          />
          <rect x="16.4" y="30.2" width="2.4" height="4.6" rx="1.2" fill="#A78BFA" />
          <rect x="45" y="30.2" width="2.4" height="4.6" rx="1.2" fill="#A78BFA" />
        </g>
      ) : null}
    </svg>
  );
}
