import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marcel Wiskow — Fullstack-Developer & AI-Automatisierung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#05060a",
          backgroundImage:
            "radial-gradient(ellipse at 30% 40%, rgba(56, 224, 120, 0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(109, 245, 255, 0.08), transparent 50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: "#38e078",
              borderRadius: 8,
              color: "#05060a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            MW
          </div>
          <span>marcelwiskow.de</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
              color: "white",
            }}
          >
            Marcel
          </div>
          <div
            style={{
              fontSize: 150,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
              color: "white",
            }}
          >
            Wiskow<span style={{ color: "#38e078" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 30,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 900,
            }}
          >
            Fullstack-Developer · 9 Jahre · AI-Automatisierung, Web &amp; Software
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>Gründer von thenotperfect.de</span>
          <span style={{ color: "#38e078" }}>→ projekte@marcelwiskow.de</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
