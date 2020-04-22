import * as React from "react";
import { I18n } from "@lingui/core";

const I18nFuncContext = React.createContext<I18n | null>(null);
export const I18nFuncContextProvider = I18nFuncContext.Provider;

export function useI18n(): I18n { 
  const i18n = React.useContext(I18nFuncContext);
  if (!i18n) {
    throw new Error("No i18n context found");
  }
  return i18n;
}
