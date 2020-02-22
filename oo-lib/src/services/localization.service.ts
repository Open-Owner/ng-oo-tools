import { Injectable } from '@angular/core';

import { IObjectKeyValueStrings } from '../interfaces/utility.interface';
import { ILocaleDictionaryList } from '../interfaces/localization.interface';

const localeDictionaries: ILocaleDictionaryList = {
    'en-US': require('../locales/en-US.json'),
};

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    private currentLocale = 'locale';
    private dictionary: IObjectKeyValueStrings;

    constructor() {
        this.currentLocale = 'en-US';
        this.dictionary = localeDictionaries[this.currentLocale];
    }

    get locale(): string {
        return this.currentLocale;
    }

    set locale(value: string) {
        this.currentLocale = value;
    }

    public translate(key: string): string {
        return this.dictionary[key] || '';
    }

    public extend(dictionaries: ILocaleDictionaryList): void {
        Object.keys(dictionaries).forEach((locale: string) => {
            if (!localeDictionaries[locale]) {
                localeDictionaries[locale] = {};
            }

            Object.assign(localeDictionaries[locale], dictionaries[locale]);
        });
    }
}
