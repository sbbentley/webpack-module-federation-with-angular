# Basics of @angular-architects/module-federation npm package

- [Description](#description)
- [Webpack Module Federation setup](#webpack-module-federation-setup)
- [What if I want to know what this package is doing for me?](#what-if-i-want-to-know-what-this-package-is-doing-for-me)

## Description

The [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package, whose source code is at [github.com/angular-architects/module-federation-plugin](https://github.com/angular-architects/module-federation-plugin), aims to streamline the setup of Webpack Module Federation for Angular projects. For more information read:
- [the readme page for the @angular-architects/module-federation npm package](https://www.npmjs.com/package/@angular-architects/module-federation?activeTab=readme)
- [the tutorial for the @angular-architects/module-federation plugin](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/tutorial/tutorial.md)

## Webpack Module Federation setup

To setup Webpack Module Federation using the [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package:

- install the package on both the shell and remote apps with:
```
npm i -D @angular-architects/module-federation
```
- configure the remote app to act as a remote via:
```
ng g @angular-architects/module-federation:init --project mfe1-ng16 --port 4201 --type remote
```
- configure the shell app to act as a host via:
```
ng g @angular-architects/module-federation:init --project shell-ng16 --port 4200 --type host
```
- update the `exposes` block on the webpack configuration file for the remote app so that it exposes the desired file.
- update the `remotes` block on the webpack configuration file for the shell app so that it points to the location/URL where the external webpack module from the remote app is available.

> [!NOTE]
>
> The last step which updates the `remotes` on the shell app might not be necessary. It's possible to leave the `remotes` block on the webpack configuration file for the shell empty and dynamically load the external webpack module using helper functions from the `@angular-architects/module-federation` package. For a code demo see the [dynamic-ng16](../code-demos/dynamic-ng16/README.md) example.
>

## What if I want to know what this package is doing for me?

The `@angular-architects/module-federation` npm package does a lot of work for us when configuring Webpack Module Federation for Angular. Everything listed in the [Webpack Module Federation](/code-demos/basic-ng16/README.md#webpack-module-federation), the [Webpack configuration file](/code-demos/basic-ng16/README.md#webpack-configuration-file) and the [Angular configuration file](/code-demos/basic-ng16/README.md#angular-configuration-file) sections of the README for the [basic-ng16](/code-demos/basic-ng16/README.md#description) example is done by this package.

The webpack configuration file is streamlined with the help of functions such as the `withModuleFederationPlugin` and `shareAll` functions.