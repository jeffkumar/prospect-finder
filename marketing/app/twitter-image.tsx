import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Adventure Flow - Your AI Transformation Partner";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "16px",
              background: "#000",
              border: "2px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "52px",
              fontWeight: "bold",
              color: "white",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            AF
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Adventure Flow
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#a0a0a0",
            textAlign: "center",
            maxWidth: "800px",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Your AI Transformation Partner
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#666",
            textAlign: "center",
            marginTop: "40px",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          adventureflow.ai
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
