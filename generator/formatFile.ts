import prettier from "prettier";

export const formatFile = (content: string): Promise<string> => {
    // 使用 Prettier 保持生成代码格式一致
    return new Promise((resolve, reject) => {
      prettier.resolveConfig(process.cwd()).then((options) => {
        try {
          const formatted = prettier.format(content, {
            ...options,
            parser: "typescript",
          });
          resolve(formatted);
        } catch (error) {
          reject(error);
        }
      });
    });
  };