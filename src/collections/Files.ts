import type { CollectionConfig } from "payload"

export const Files: CollectionConfig = {
  slug: "files",
  admin: {},
  upload: {},
  fields: [{ name: "alt", type: "text" }],
}
