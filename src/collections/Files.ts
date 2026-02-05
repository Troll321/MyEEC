import type { CollectionConfig } from "payload"

export const Files: CollectionConfig = {
  slug: "files",
  admin: { description: "Maximum File Size 4.5 MB" },
  upload: { crop: false, focalPoint: false },
  fields: [{ name: "alt", type: "text" }],
}
