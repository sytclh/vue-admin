import { MockMethod } from "vite-plugin-mock";
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const mockModuleObj = import.meta.globEager("../mocks/**/*.ts");
const mockModuleArr: MockMethod[] = [];
Object.keys(mockModuleObj).forEach((key) => {
  mockModuleArr.push(...mockModuleObj[key].default);
});

export function setupProdMockServer() {
  createProdMockServer(mockModuleArr);
}
