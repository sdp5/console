import * as React from 'react';
import { IntlProvider } from 'react-intl';
import * as Japanese from "../locales/ja-JP.json";
import * as Italian from "../locales/it-IT.json";
import * as English from "../locales/en-US.json";

export const I18nContext = React.createContext();

const navLang = navigator.language;
let lang;

if (navLang === "ja-JP") {
    lang = Japanese;
} else if (navLang === "it-IT") {
    lang = Italian;
} else {
    lang = English;
}

const I18nWrapper = (props) => {

    const [locale, setLocale] = React.useState(navLang);
    const [messages, setMessages] = React.useState(lang);

    function selectLang(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);

        console.log("setting msg for locale: " + newLocale);
        
        if (newLocale === "ja-JP") {
            setMessages(Japanese);
        } else if (newLocale === "it-IT") {
            setMessages(Italian);
        } else {
            setMessages(English);
        }
    }

    return (
        <I18nContext.Provider value={{ locale, selectLang }}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </I18nContext.Provider>
    );
}

export default I18nWrapper;
