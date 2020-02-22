import { IObjectKeyValueStrings } from './utility.interface';

export type ILocale = 'en-US'
    | 'de-DE'
    | 'en-CA'
    | 'en-GB'
    | 'es-ES'
    | 'es-MX'
    | 'fr-FR'
    | 'it-IT'
    | 'ja-JP'
    | 'pt-BR'
    | 'ru-RU'
    | 'zh-CN'
    ;

export interface ILocaleDictionaryList {
    [locale: string]: IObjectKeyValueStrings;
}
