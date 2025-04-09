import prettier from "prettier";

export const formatFile = (content: string): Promise<string> => {
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