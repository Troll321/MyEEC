import { createServerFeature } from "@payloadcms/richtext-lexical"

export const EquationFeature = createServerFeature({
  feature: {
    ClientFeature: "@/plugins/myeqfeature/client.feature.ts#EquationClientFeature",
  },
  key: "myEquationFeature",
})
