# Open Owner Angular Tools

Common components, services, and pipes to help you make Angular apps faster.

### Contents

- [Getting Started](#getting-started)
- [Translations](#translations)

### Getting Started

##### Requirements

* Node.js 10.13+
* Angular 9+

##### Installation in Your App

`npm i @oo/ng-tools`

### Translations
The library has many common translations already available for localization (l10n).
Things like save, cancel, ok, etc… that every app will use.

#### How It Works
All you have to do is use a pipe or use the service method to get the translation for the user's language.

If any phrase is NOT found in the user's chosen locale it will fallback to the english version. 
 
Example:

```
{{ 'ok' | l10n }}:
```

or 

```
this.localization.translate('save')
```
