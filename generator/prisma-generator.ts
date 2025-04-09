import { EnvValue, GeneratorOptions } from "@prisma/generator-helper";
import { parseEnvValue } from "@prisma/internals";
import { renderFile } from "ejs";
import path from "path";
import { writeFileSafely } from "./writeFileSafely";

export async function generate(options: GeneratorOptions) {
    // 获取所有模型名称
    const modelNames = options.dmmf.datamodel.models.map((model) => model.name);

    // 生成 buildTask.ts
    const buildTaskContent = await renderFile(
        path.join(__dirname, "buildTask.ejs"),
        {
            models: modelNames,
            actions: [
                "create",
                "update",
                "delete",],
            capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
        }
    );

    await writeFileSafely(
        path.join(parseEnvValue(options.generator.output as EnvValue), "buildTask.ts"),
        buildTaskContent
    );
}