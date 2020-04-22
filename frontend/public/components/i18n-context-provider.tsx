import * as React from "react";
import { I18nProvider, I18n } from "@lingui/react";
import { useLocale, getBrowserLocale } from 'use-locale';

import { I18nFuncContextProvider } from './use-i18n';

type LanguageCode = 'en' | 'ja';

export const I18nContextProvider: React.FC = props => {

    const [catalogs, setCatalogs] = React.useState<{ [key: string]: any }>({});
    const { locale } = useLocale<LanguageCode>(getBrowserLocale<LanguageCode>());
    
    React.useEffect(() => {
        const loadCatalog = async (locale: string) => {
            const catalog = await import(
                /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
                `@lingui/loader!../locales/${locale}/messages.po`
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
