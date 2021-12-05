interface ProxyStorage {
  symbol: string;
  get(key: string): any;
  set(Key: string, value: StorageValue): void;
  remove(key: string): void;
  clear(): void;
}

export interface StorageValue {
  type: string;
  content: any;
}

//sessionStorage operate
class sessionStorageProxy implements ProxyStorage {
  protected storage: Storage;
  symbol: string = "prefix";

  constructor(storageModel: Storage) {
    this.storage = storageModel;
  }

  // 在存取之前可以添加加密，解密操作，防止用户手动修改本地存储

  // 存
  public set(key: string, value: StorageValue): void {
    this.storage.setItem(`${this.symbol}-${key}`, JSON.stringify(value));
  }

  // 取
  public get(key: string) {
    const valStr = this.storage.getItem(`${this.symbol}-${key}`);
    if (valStr === null) {
      return null;
    }
    const val: StorageValue = JSON.parse(valStr);
    switch (val.type) {
      case "number":
        return Number(val.content);
      case "boolean":
        return Boolean(val.content);
      case "string":
      default:
        return val.content;
    }
  }

  // 删
  public remove(key: string): void {
    this.storage.removeItem(`${this.symbol}-${key}`);
  }

  // 清空
  public clear(): void {
    this.storage.clear();
  }
}

//localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
  constructor(localStorage: Storage) {
    super(localStorage);
  }
}

export const storageSession = new sessionStorageProxy(sessionStorage);
export const storageLocal = new localStorageProxy(localStorage);
