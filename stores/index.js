import { useStaticRendering } from "mobx-react";
import Counter from "./Counter";

const isServer = !process.browser;
useStaticRendering(isServer);

let store = null;

export function initializeStore () {
  if (isServer) {
    return {
      counter: new Counter()
    };
  }
  
  if (store === null) {
      store = {
        counter: new Counter()
      };
  }

  return store;
}
