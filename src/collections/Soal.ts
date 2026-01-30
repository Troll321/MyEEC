import type { CollectionConfig } from "payload"

function genRTFDefaultValue(text: string) {
  return {
    value: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: text,
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
            textStyle: "",
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
  }
}

export const Soal: CollectionConfig = {
  slug: "soal",
  admin: {
    useAsTitle: "judul",
  },
  fields: [
    { name: "judul", type: "text", required: true },
    {
      name: "bidang",
      type: "select",
      options: [
        { value: "matematika", label: "Matematika" },
        { value: "fisika", label: "Fisika" },
        { value: "komputer", label: "Komputer" },
      ],
      required: true,
    },
    { name: "pembuat", type: "relationship", relationTo: "users", required: true },
    {
      name: "status",
      admin: { description: "Digunakan dalam babak ..." },
      type: "select",
      options: [
        { value: "draft", label: "Draft" },
        { value: "penyisihan", label: "Penyisihan" },
        { value: "semifinal", label: "Semifinal" },
        { value: "final", label: "Final" },
      ],
      required: true,
      defaultValue: "draft",
    },
    {
      label: "Vote",
      type: "collapsible",
      fields: [
        {
          name: "vote_penyisihan",
          type: "relationship",
          relationTo: "users",
          hasMany: true,
        },
        {
          name: "vote_semifinal",
          type: "relationship",
          relationTo: "users",
          hasMany: true,
        },
        {
          name: "vote_final",
          type: "relationship",
          relationTo: "users",
          hasMany: true,
        },
      ],
    },
    { name: "file", type: "upload", relationTo: "files" },
    { name: "deskripsi", type: "richText", required: true },
    {
      name: "jenis",
      type: "blocks",
      required: true,
      maxRows: 1,
      blocks: [
        {
          slug: "pilgan",
          fields: [
            {
              name: "jawaban",
              type: "number",
              min: 1,
              validate: (num: any, { siblingData }: any) => {
                if (!num) {
                  return true
                }
                if (num < 1 || num > siblingData.pilihan.length) {
                  return "Kunci jawaban tidak valid!"
                }
                return true
              },
              required: true,
            },
            {
              name: "pilihan",
              type: "array",
              fields: [{ name: "value", type: "richText" }],
            },
          ],
        },
        { slug: "essai", fields: [{ name: "jawaban", type: "richText" }] },
      ],
      defaultValue: [
        {
          blockType: "pilgan",
          pilihan: [
            genRTFDefaultValue("A"),
            genRTFDefaultValue("B"),
            genRTFDefaultValue("C"),
            genRTFDefaultValue("D"),
          ],
        },
      ],
    },
    {
      name: "tag",
      admin: { description: "Tag / Materi / Penanda untuk soal ini" },
      type: "text",
      hasMany: true,
    },
  ],
}
