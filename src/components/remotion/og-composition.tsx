"use client";

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export function OGComposition({
  title = "JH",
  subtitle = "Lead process, prove results.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 30], [40, 0], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [10, 40], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Animated line */}
      <div
        style={{
          width: `${lineWidth}%`,
          height: 2,
          backgroundColor: "#333",
          marginBottom: 40,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 120,
          fontWeight: 700,
          color: "#fafafa",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 28,
          color: "#888",
          marginTop: 16,
          letterSpacing: "0.05em",
        }}
      >
        {subtitle}
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: subtitleOpacity,
          fontSize: 14,
          color: "#555",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
        }}
      >
        Premium Digital Agency
      </div>
    </AbsoluteFill>
  );
}
