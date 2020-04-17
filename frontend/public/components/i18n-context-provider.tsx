import * as React from 'react';
import { I18nProvider, I18n } from "@lingui/react";
import { useLocale } from "use-locales";

import { I18nFuncContextProvider } from './use-i18n';


export const I18nContextProvider: React.FC = props => {
  const [catalogs, setCatalogs] = React.useState<{ [key: string]: any }>({});
  const locale = useLocale();
React.useEffect(() => {
    const loadCatalog = async (locale: string) => {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `@lingui/loader!../../public/locales/${locale}/messages.po`
      );
setCatalogs({
        ...catalogs,
        [locale]: catalog,
      });
    };
    loadCatalog(locale);
  }, [locale]);
if (!catalogs[locale]) return <div />;

return (
    <I18nProvider language={locale} catalogs={catalogs}>
      <I18n>
        {({ i18n }) => <I18nFuncContextProvider value={i18n}>
          {props.children}</I18nFuncContextProvider>}
      </I18n>
    </I18nProvider>
  );
};
