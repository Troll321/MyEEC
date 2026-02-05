"use client"

import {
  $isHorizontalRuleNode,
  createClientFeature,
  slashMenuBasicGroupWithItems,
  toolbarFormatGroupWithItems,
} from "@payloadcms/richtext-lexical/client"
import {
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
} from "@payloadcms/richtext-lexical/lexical"
import { EquationsPlugin, INSERT_EQUATION_COMMAND } from "./OGEqPlugin"

import { MyIcon } from "./MyIcon"
import { EquationNode } from "../myeqfeature/OGEqNode"
import { myEqMDTransformer } from "./myEqMDTransformer"

export const EquationClientFeature = createClientFeature({
  nodes: [EquationNode],
  plugins: [{ Component: EquationsPlugin, position: "normal" }],
  markdownTransformers: myEqMDTransformer,
  toolbarInline: {
    groups: [
      toolbarFormatGroupWithItems([
        {
          ChildComponent: MyIcon,
          isActive: ({ selection }) => {
            if (!$isNodeSelection(selection) || !selection.getNodes().length) {
              return false
            }
            const firstNode = selection.getNodes()[0]
            return $isHorizontalRuleNode(firstNode)
          },
          key: "Equation",
          onSelect: ({ editor }) => {
            const eq = editor.getEditorState().read(() => {
              const selection = $getSelection()
              if ($isRangeSelection(selection)) {
                return selection.getTextContent() // Get the selected text
              }
              return null
            })

            editor.dispatchCommand(INSERT_EQUATION_COMMAND, { equation: eq ?? "", inline: true })
          },
        },
      ]),
    ],
  },
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon: MyIcon,
          key: "Equation",
          keywords: ["Equation", "Math", "Function"],
          onSelect: ({ editor }) => {
            editor.dispatchCommand(INSERT_EQUATION_COMMAND, {
              equation: "x^{2}",
              inline: false,
            })
          },
        },
      ]),
    ],
  },
})
