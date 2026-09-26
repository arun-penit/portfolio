import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/arun.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#08080a", color: "#edeae4", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#8e8a83" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#cdfb52" }} />
            Open to international roles
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
            <div style={{ fontSize: 40, color: "#cdfb52", marginTop: 20 }}>{site.role}</div>
            <div style={{ fontSize: 26, color: "#8e8a83", marginTop: 24, lineHeight: 1.4 }}>
              Voice agents · RAG platforms · Multimodal LLM pipelines · FastAPI
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#56534e" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
        <img src={src} width={420} height={502} style={{ objectFit: "cover", borderRadius: 32 }} alt="" />
      </div>
    ),
    size,
  );
}
