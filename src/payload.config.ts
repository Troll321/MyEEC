import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

import { Users } from "./collections/Users"
import { Soal } from "./collections/Soal"
import { Files } from "./collections/Files"
import { EquationFeature } from "./plugins/myeqfeature/feature.server"
import { s3Storage } from "@payloadcms/storage-s3"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const runtime = "nodejs"

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Soal, Files],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => {
      return [
        ...defaultFeatures.filter((feature) => {
          return (
            feature.key !== "upload" &&
            feature.key !== "checklist" &&
            feature.key !== "relationship"
          )
        }), // Include all default features
        EquationFeature(), // Add the EquationFeature plugin
      ]
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        files: true,
      },
      signedDownloads: {
        expiresIn: 60,
        shouldUseSignedURL: () => {
          return true
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
  ],
})
