import {
  ElementTransformer,
  TextMatchTransformer,
} from "@payloadcms/richtext-lexical/lexical/markdown"
import { EquationNode } from "./OGEqNode"

const InlineEqTransformer: TextMatchTransformer = {
  type: "text-match",
  dependencies: [EquationNode],
  export: (node, exportChildren) => {
    if (node.getType() !== "equation" || (node as EquationNode).__inline !== true) {
      return null
    }
    return "$"
  },
  regExp: /(?<!\S)\$\s(.+?)\s\$(?!\S)/,
  trigger: " ",
  replace: (textNode, match) => {
    textNode.replace(new EquationNode(match[0].slice(1, match[0].length - 1), true))
  },
}

const BlockEqTransformer: ElementTransformer = {
  type: "element",
  dependencies: [EquationNode],
  export: (node, exportChildren) => {
    if (node.getType() !== "equation" || (node as EquationNode).__inline !== false) {
      return null
    }
    return "$$"
  },
  regExp: /(?<!\S)\$\$\s(.+?)\s\$\$(?!\S)/,
  replace: (parentNode, children, match) => {
    parentNode.replace(new EquationNode(match[0].slice(2, match[0].length - 2), false))
  },
}

export const myEqMDTransformer = [BlockEqTransformer, InlineEqTransformer]
