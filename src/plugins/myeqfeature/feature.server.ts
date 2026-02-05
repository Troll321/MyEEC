import { createServerFeature } from "@payloadcms/richtext-lexical"
import { myEqMDTransformer } from "./myEqMDTransformer"

export const EquationFeature = createServerFeature({
  feature: {
    ClientFeature: "@/plugins/myeqfeature/client.feature.ts#EquationClientFeature",
    markdownTransformers: myEqMDTransformer,
  },
  key: "myEquationFeature",
})
