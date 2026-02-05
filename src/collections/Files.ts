import type { CollectionConfig } from "payload"

export const Files: CollectionConfig = {
  slug: "files",
  admin: {},
  upload: { crop: false, focalPoint: false },
  fields: [{ name: "alt", type: "text" }],
}
