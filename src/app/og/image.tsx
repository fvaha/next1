import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OGImage() {
  const font = await fetch(
    new URL("../../fonts/Inter-Bold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#0a0a0a",
          color: "#FFE066",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          fontFamily: "Inter",
        }}
      >
        <img
          src="/logo.png" // ✅ Replace with your actual domain path or use `/logo.png` if in /public
          width={160}
          height={160}
          alt="TerraCrypt Logo"
          style={{ marginBottom: 40 }}
        />
        <h1 style={{ fontSize: 60 }}>TerraCrypt</h1>
        <p style={{ fontSize: 28, color: "#aaaaaa", marginTop: 16 }}>
          Quantum-secure privacy platform
        </p>
      </div>
    ),
    {
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
        },
      ],
    }
  );
}
