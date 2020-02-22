# Open Owner

## Getting Started with Angular

-   Make sure you have node 12.14.0 installed. Use _nvm_ to switch between different node versions if you need - `nvm list` shows them - `nvm use 12.7.0` will switch
-   Make sure you have the angular cli installed globally using `npm install -g @angular/cli`
-   Run `npm install` to install all the dependencies.
-   Run `npm start` to run angular.
-   Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Getting Started with Firebase (for backend development with functions or firestore)

-   Make sure you have firebase tools

    `npm install -g firebase-tools`

-   Login to firebase

    `firebase login`

-   Choose the correct project

    Run `firebase list` to show the projects.
    Run `firebase use dev` or `firebase use prod` to switch to the dev site.

-   (Optional) Install the emulator if you need to debug firestore rules

    `firebase setup:emulators:firestore`

Full instructions for the CLI are at https://firebase.google.com/docs/cli

## NPM Scripts

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build Angular

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.
Use the `--aot` flag for ahead-of-time compilation.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Linting

Run `npm run lint` to find lint/formatting issues and automatically fix them.

Linting will also be done automatically during the pre-commit hook.
If you need to skip the commit hook then do the following:

-   SourceTree: Choose **Bypass Commit Hooks** from the commit options.
-   Command Line: Run with the `--no-verify` flag: `git commit -n -m "Commit Message"`

### Deploy to Firebase

Run `npm run deploy` to build the angular project and deploy everything to firebase.
It will deploy to whichever firebase project you have set with `firebase use`.

NOTE: The `npm run deploy` script takes a long time so if you just need one thing deployed see the _Partial Firebase Deployment_ section below.

## Firebase Integration

We use firebase for the backend. It handles the authentication, database, and notifications.

We utilize the angularFire2 module. See https://github.com/angular/angularfire2

### Deploying Code

Pretty easy... you just run `npm run deploy`.
This will build the angular files first and then call `firebase deploy`.
The deploy script will publish the built angular files from the dist folder, publish the functions, and then publish the firestore indexes/rules.

### Partial Firebase Deployment

The `npm run deploy` script takes a long time to build angular and then deploy the hosting, functions, firestore indexes, firestore rules.
So if you just need to deploy firestore or functions then instead run the following:

`firebase deploy --only functions` or `firebase deploy --only firestore`

### Setting Firebase Function Config Options

The firebase function pulls in the environment variables when it runs based on what you set with this weird command. To change them just run this command and then deploy again

`firebase functions:config:set stripe.testkey="KEY" mailjet.publickey="KEY" mailjet.privatekey="KEY"`

### AngularFire2 Database Calls

There is one important nuance to know when querying the firestore database.
You can query for either multiple documents or a single document and listen to the `snapshotChanges()` observable for the result.
We also provide a pipe operator that adds the id and ref to our local object for ease.

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

#### ValueChanges() vs SnapshotChanges() Method

ValueChanges method returns a simpler response with just the data. We won't use it though cause it is easier to just stick to the single snapshotChanges() method which returns all the data valueChanges has plus more.

-   ValuesChanges returns just the data
-   SnapshotChanges returns the data + the id and the ref

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

### Firestore Rules and Indexes

To change these edit the `firestore.rules` and `firestore.indexes.json` files.
They get updated on firebase when we run `firebase deploy` or `firebase deploy --only firestore`

**HUGELY IMPORTANT**: If you change a rule or add an index on the website you **MUST** duplicate those changes in these files in git too.
Otherwise your changes could be overwritten the next time someone deploys.

#### Debugging Firestore Rules

There is no logging on firestore about the rules.
The only way to gain insight into why a rule won't work is with the emulator.
Make sure you followed the getting started steps for firebase and then do the following:

1. Start the emulator

    `firebase emulators:start --only firestore`

2. Run the tests

    `mocha firestore-rules-tests.js`

3. View the output report

    Visit http://localhost:8080/emulator/v1/projects/firestore-rules-test:ruleCoverage.html and you can debug the rules that failed.
    Hover over any of the black lines to view the stack trace of what was returned.

## Style Guide

Follow the style guidelines from angular at https://angular.io/guide/styleguide#general-naming-guidelines

### Naming

-   Filenames - use lowercase kebab case like `some-file.component.ts`
-   Directories - use lowercase kebab case like `some-folder`
-   CSS Classes - use lowercase kebab case like `some-class`

### Linters

In addition we use tslint, prettier and stylelint to ensure that files are styled consistently.
These will run during the pre-commit hook so all code is submitted consistently.
The pre-commit hook will call `lint:commit` scripts that only run for the files staged in git using lint-staged. This is so the pre commit hook is fast.

If linting fails during the pre-commit hook (or you want to manually run the lint scripts then run) then run `npm run lint` to automatically fix the errors.

## Debugging

### Debugging Firebase Functions Locally

Run `firebase serve --only functions` to run the functions locally.

NOTE that the config will not be used automatically you have to first write it to a file by doing:

`firebase functions:config:get > funtions/.runtimeconfig.json`

### Error Committing

If you get an error committing it probably means that a linter/formatter ran during the pre-commit hook and found an issue in your code that needs to be resolved.
You just need to run `npm run lint` and it will try to auto-fix the errors. Then manually fix any issues it couldn't auto-fix and retry your commit.

Alternatively, you can bypass the commit hook.
See the linter section above for instructions.
