# basic-ng16

- [Description](#description)
- [How to run](#how-to-run)
- [MFE1 app](#mfe1-app)
- [Shell app](#shell-app)
- [Webpack module federation](#webpack-module-federation)
  - [Webpack configuration file](#webpack-configuration-file)
  - [Angular configuration file](#angular-configuration-file)

## Description

This shows an example of how to setup webpack module federation using Angular 16. This project consists of two Angular 16 apps:
- shell-ng16: this app is used as the shell and uses Angular routing to lazy load an Angular module from the mfe1-ng16 app. 
- mfe1-ng16: this app represents a micro frontend that is consumed by the shell-ng16 app.

This project does NOT make use of the [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package which is usually used to setup module federation for Angular projects. The main idea is to show the basics for learning purposes.

## How to run

1) Go to `/basic-ng16/shell-ng16` folder and run `npm i`, followed by `npm start`. This will start the shell app on http://localhost:4200.
2) Go to `/basic-ng16/mfe1-ng16` folder and run `npm i`, followed by `npm start`. This will start the mfe1 app on http://localhost:4201.

To see the mfe1 app loaded into the shell go to the shell's URL and click the `load my-feature Angular module from mfe1` link. 

Both apps are very simple and consist mainly of a bit of text inside a styled `div` which indicates if it's part of the shell or the mfe1 app. The shell renders in a red coloured `div` whilst the mfe1 app renders in a blue coloured `div`. In addition both apps display the version of Angular being used.

## MFE1 app

The mfe1 app contains three Angular modules:
- the default [AppModule](/code-demos/basic-ng16/mfe1-ng16/src/app/app.module.ts) created as part of doing `ng new`.
- the default [AppRoutingModule](/code-demos/basic-ng16/mfe1-ng16/src/app/app-routing.module.ts) created as part of doing `ng new`.
- a feature module named [MyFeatureModule](/code-demos/basic-ng16/mfe1-ng16/src/app/my-feature/my-feature.module.ts) which was created to represent the micro front that we want to expose via module federation.

The `MyFeatureModule` Angular module contains a route that loads the [MyComponent](/code-demos/basic-ng16/mfe1-ng16/src/app/my-feature/my-component/my-component.component.ts) Angular component on `/my-component`. You can use the `Go to my-component` link on the mfe1 app to load the `MyComponent`.

## Shell app

The shell app is able to consume the Angular module exposed by the mfe1 app and display it. It consists of a two Angular modules:
- the default [AppModule](/code-demos/basic-ng16/shell-ng16/src/app/app.module.ts) created as part of doing `ng new`.
- the default [AppRoutingModule](/code-demos/basic-ng16/shell-ng16/src/app/app-routing.module.ts) created as part of doing `ng new`.

A route was added to the `AppRoutingModule` that lazy loads the mfe1 app on the `/mfe1` path. You can load the mfe1 app by selecting the `load my-feature Angular module from mfe1` link.

The `/mfe1` route added to the `AppRoutingModule` uses an import to lazy load the `MyFeatureModule` from the mfe1 app. The lazy load is done via the `loadChildren` function which imports the external webpack module `mfe1/my-feature-module` at runtime and then accesses the `MyFeatureModule` Angular module from the mfe1 app. Also note that for typescript to be ok with the import we must tell it that the module `mfe1/my-feature-module` exists and we do that by declaring it in the [remote-module.d.ts](/code-demos/basic-ng16/shell-ng16/src/app/remote-modules.d.ts) file.

> **Note**
> 
> For a better understanding of how the external webpack module from mfe1 is loaded into the shell see [How the loading of an external webpack module works
](../docs/basics-module-federation.md#how-the-loading-of-an-external-webpack-module-works).
>

## Webpack module federation

To setup webpack module federation we had to:
- add a `bootstrap.ts` file. The code that originally is on `main.ts` moves to this file and the code on `main.ts` just imports the `bootrap.ts` file.
- add a `webpack.config.js` and a `webpack.prof.config.js`. These are used to extend angular's webpack configuration and configure module federation for the apps.
- change the builders used by `ng build` and `ng serve` commands. For this we installed the [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) package with `npm i -D ngx-build-plus` and then we updated the `angular.json` file. These changes allow us to tell Angular to use the `webpack.config.js` files we created when building and serving and therefore apply the module federation settings.

### Webpack configuration file

Two webpack configuration files were added, one `webpack.config.js` which contains the base of the webpack configuration and a `webpack.config.prod.js` which extends the base configuration with production settings *if needed*.

For this projects all the configuration is on the `webpack.config.js`. This file contains the minimum configuration required to get module federation to work properly with Angular.

The only difference between the shell's webpack configuration and the mfe1's webpack configuration is that:
- the shell wants to consume the mfe1 app and therefore in the `plugins.ModuleFederationPlugin.remotes` it points to the mfe1 app location.
- the mfe1 app wants to expose an Angular module and therefore in the `plugins.ModuleFederationPlugin.exposes` indicates which Angular module is exposed.

> **Note**
> 
> For a better understanding of the settings defined in the webpack configuration file see  [Basics of webpack module federation](../docs/basics-module-federation.md). 
>

### Angular configuration file

The `angular.json` file contains Angular specific app configuration. This file needs to be adjusted so that we can tell Angular to use the webpack configuration files. To do this we change the builders used by `ng build` and `ng serve` from the default Angular builders to the `ngx-build-plus` builders which then allow us to add an extra configuration which points to the webpack configuration files.

Using the Shell's Angular configuration file as an example, what was changed was:

- The builder for `ng build` at `projects.shell-ng16.architect.build.builder` was changed to `ngx-build-plus:browser`: 
```json
"builder": "ngx-build-plus:browser",
```

- Extra default options were added for `ng build` at `projects.shell-ng16.architect.build`: 
```json
"extraWebpackConfig": "webpack.config.js",
"commonChunk": false
```

- Extra production options were added for `ng build` at `projects.shell-ng16.architect.build.configurations.production`: 
```json
"extraWebpackConfig": "webpack.prod.config.js"
```

- The builder for `ng serve` at `projects.shell-ng16.architect.serve.builder` was changed to `ngx-build-plus:dev-server`: 
```json
"builder": "ngx-build-plus:dev-server",
```

- Extra default options were added for `ng serve` at `projects.shell-ng16.architect.serve`: 
```json
"options": {
    "port": 4200,
    "publicHost": "http://localhost:4200",
    "extraWebpackConfig": "webpack.config.js"
}
```

- Extra production options were added for `ng serve` at `projects.shell-ng16.architect.serve.configurations.production`: 
```json
"extraWebpackConfig": "webpack.prod.config.js"
```