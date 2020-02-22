# Open Owner Angular Tools

Common components, services, and pipes to help you make Angular apps faster. 
This library makes use of Angular Material and Firebase heavily since they will speed up the development of your app.


### Contents

- [Getting Started](#getting-started)
- [Translations](#translations)


### Getting Started

##### Installation in Your App

`npm i @oo/ng-tools`


### Translations
We provide a simplified localization system to translate phrases into the user's locale (ie language). 
The library has many common translations already available for localization (l10n).
Things like save, cancel, ok, etc… that every app will use.

IMPORTANT: Angular has their own localization system based on the CLDR group's localization standards. 
If you will be doing advanced localization and internationalization then use that instead. 
Our library just supplies a simpler system since most apps don't have crazy localization needs.

#### Files
Put your translation files in a **locales** folder. The translation file is just a json object with a list of keys and their translation in each language. 
English is the main file and will be used if no translation is found in the user's main language.

This library follows the same pattern and supplies many common phrases already. You can override these keys in your own app. 

#### How It Works
All you have to do is use the `l10n` pipe or use the LocalizationService's `translate()` method to get the translation for the user's language.
 
Example:

```
{{ 'ok' | l10n }}:
```

or 

```
this.localization.translate('save')
```


## Firebase Integration

Firebase makes your life easier in so many ways. It handles the authentication, database, and notifications.
If you choose to use it here's how this library helps you.

We utilize the angularFire2 module. See https://github.com/angular/angularfire2

### AngularFire2 Database Calls
You can query for either multiple documents or a single document and listen to the `snapshotChanges()` observable for the result.
We provide a pipe operator that adds the id and ref to our local object for ease.

`this.fbUtil.mapDoc<SeatingChart>()`

The confusing part is the response structure is different between the two. So you need to call the right one.

-   For multiple documents you call `mapCollection`
-   For single documents you call `mapDoc`

#### Multiple Documents Response

Call `this.db.collection<SeatingChart>('seatingCharts').snapshotChanges()`
and the response will be a `DocumentChangeAction<SeatingChart>[]`

You can then call the helper like this.

`pipe(this.fbUtil.mapCollection<SeatingChart>())`

Cause the response structure is

`change (DocumentChangeAction) > payload (DocumentChange) > doc (QueryDocumentSnapshot) > id`

#### Single Document Response

Call `this.db.collection<SeatingChart>('seatingCharts').doc(id).snapshotChanges()`
and the response will be a `Action<DocumentSnapshot<SeatingChart>>`

You can then call the helper like this.

`pipe(this.fbUtil.mapDoc<SeatingChart>())`

Cause the response structure is

`change (Action) > payload (DocumentSnapshot) > id`

#### Updates and Deletes

Thanks to the `mapDoc` and `mapCollection` pipe operators the objects returned include the id and ref object.
Use the ref object to directly call methods on the ref object.
You do NOT need to do the whole db.collection().doc() stuff again because the ref object is a doc!

```
someItem.ref
    .update({prop: value})
    .then(() => {})
    .catch(() => {});

someItem.ref.delete();
```

