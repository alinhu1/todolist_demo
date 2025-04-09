import { EnvValue, GeneratorOptions } from "@prisma/generator-helper";
import { parseEnvValue } from "@prisma/internals";
import path from "path";
import { writeFileSafely } from "./writeFileSafely";
import { formatFile } from "./formatFile";

export async function generate(options: GeneratorOptions) {
    // 获取所有模型名称
    const modelInfo = options.dmmf.datamodel.models.map((model) => ({
        name: model.name,
    fields: model.fields.map(field => ({
        name: field.name,
        type:field.type,
        isId: field.isId
    }))
}));
const typeDefinitions = `
export type ModelInfo = {
  name: string;
  fields: Array<{
    name: string;
    type: string;
    isId: boolean;
  }>;
};

export const models: ModelInfo[] = ${JSON.stringify(modelInfo, null, 2)};
`;
const formatted = await formatFile(typeDefinitions);
    await writeFileSafely(
        path.join(parseEnvValue(options.generator.output as EnvValue), "task.ts"),
        formatted
    );
}