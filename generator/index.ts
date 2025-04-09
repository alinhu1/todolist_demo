import { generatorHandler } from "@prisma/generator-helper";

import { generate } from "./prisma-generator";

//注册生成器
generatorHandler({
  onManifest: () => ({
    defaultOutput: "../generated/task",
    prettyName: "Todo Task Generator",
    requiresGenerators: ["prisma-client-js"],
  }),
  onGenerate: generate,
});
