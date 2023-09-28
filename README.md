# Webpack module federation examples

- [Description](#description)
- [Read me before exploring the code demos](#read-me-before-exploring-the-code-demos)
- [Code demos](#code-demos)
  - [Why are all the Angular code demos done using either Angular 12 or Angular 16?](#why-are-all-the-angular-code-demos-done-using-either-angular-12-or-angular-16)
- [Debug](#debug)

## Description 

This repo came about as a result of my journey to learn how to use [webpack module federation](https://webpack.js.org/concepts/module-federation/).

There's a learning curve required to understand how to work with webpack module federation, which is even higher if you're not confortable with frontend development, and so I thought it would be useful to consolidate my learnings, code experiments and research articles into one place. 

**I hope this repo makes it easier for those who want to learn about webpack module federation.**

## Read me before exploring the code demos

Some of the code demos are variations of a concept where the main difference is how a remote webpack module is exposed. The main thing to keep in mind is that, at a high level, all of the code demos consist of:

1) An app that exposes a webpack module (a remote). The exposed webpack module can be anything: an Angular module, an Angular component, an Angular standalone component, a set of Angular routes, a web component, a function, etc. 
2) An app that consumes a webpack module at runtime (a host/shell). The way the host consumes the remote webpack module depends on what is exposed on that module. For instance, consuming an Angular module is slightly different from consuming an Angular component.

This might seem like something obvious but if you understand this then you understand that there are infinite ways to expose Angular/Vue/React/etc apps/components as webpack modules and equally infinite ways to consume them. 

**There is no single best way to do things, some ways might enable functionality that others don't but in the end it's up to you to decide what you prefer for your use case.**

> **Warning**
>
> When working with webpack module federation you are the one that has to guarantee that your final app, the host/shell, will work as expected. 
> 
> **Webpack module federation is **just** a mechanism for integrating webpack modules at runtime. It does NOT take care of any frontend technology or javascript specific concern.** This means that you might have to do code so that when the remote is loaded into the host everything works as expected. Scenarios where you might have to do extra code apart from setting up webpack module federation:
> 
> - if both your host and your remote use Angular and both use routing. Otherwise, you might find that routing changes in the remote don't affect the shell as you expect or vice versa. 
> - if you want to load different Angular versions. If you simply try to more than one different version of Angular you will get an error about the fact that Angular Platform can only be instantiated once.
> - if want to have your host/shell consuming remotes implemented in different frontend technologies (Angular/Vue/React/etc).  
>
> And the list goes on... Don't be afraid though, there's always a way to get things to work. Just don't expect that everything will work out of the box. The [code demos section](#code-demos) gives you plenty of examples to get started and hopefully enough so that you can then adjust to any scenario that might not be listed here. 
>

## Code demos

> **Note**
>
> The examples are mainly focused on using module federation with Angular apps but several concepts explained here are applicable regardless of the frontend technology used.
> 
>
> If you are not familiar with webpack module federation it's recommended that you start by reading and exploring the [basic-ng16](/basic-ng16/README.md) code demo. Although this example uses Angular, it goes over the basics for setting up webpack module federation which is useful regardless of the frontend technology used.
>

| Demo                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [basic-ng16](/code-demos/basic-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                | The most bare-bones possible example of how to setup webpack module federation where the shell lazy loads an Angular module using Angular routing. This code demo does NOT make use of the [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package which is usually used to setup module federation for Angular projects. </br></br> The main idea is to show the basics for learning purposes. </br></br> The remote wepack module contains an Angular module which the shell loads using Angular routing.                                                                                  |
| [angular-architects-ng16](/code-demos/angular-architects-ng16/README.md) </br></br> Both shell and remote app use Angular 16.     | Same as the [basic-ng16](/code-demos/basic-ng16/README.md) example but instead of manually doing all the module federation setup, it uses the [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package which is a package that aims to streamline the module federation setup. </br></br> The remote wepack module contains an Angular module which the shell loads using Angular routing.                                                                                                                                                                                                    |
| [dynamic-ng16](/code-demos/dynamic-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                           | Shows how to setup module federation without having to declare a remote in the shell's webpack configuration file. This code demo is called dynamic because it does NOT require the remote to be declared in the shell's webpack configuration. </br></br> Despite not being part of this example, it would be simple to extend it and have the remote webpack module location fetched at runtime via an HTTP call. </br></br> The remote wepack module contains an Angular module which the shell loads using Angular routing. In one of the shell's routes the remote location is hard-coded in the shell's app code, in the other it uses a manifest file. |
| [component-ng16](/code-demos/component-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                        | The shell dynamically instantiates and adds to the DOM an Angular component. This example also shows how to pass inputs to the Angular component. </br></br> The remote wepack module contains an Angular component which the shell dynamically loads without using Angular routing. It shows 4 different ways to load the component.                                                                                                                                                                                                                                                                                                                         |
| [component-directive-ng16](/code-demos/component-directive-ng16/README.md) </br></br> Both shell and remote app use Angular 16.   | Same as the [component-ng16](/code-demos/component-ng16/README.md) example but using an Angular directive. This example also shows how to pass inputs to the Angular component. </br></br> The remote wepack module contains an Angular component which the shell dynamically loads without using Angular routing.                                                                                                                                                                                                                                                                                                                                            |
| [component-standalone-ng16](/code-demos/component-standalone-ng16/README.md) </br></br> Both shell and remote app use Angular 16.  | The shell dynamically instantiates and adds to the DOM an Angular standalone component. This also shows how a remote can expose Angular routes and how to consume them in the shell app. <br></br> TODO: needs review                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [web-component-ng16](/code-demos/web-component-ng16/README.md) </br></br>  Both shell and remote app use Angular 16.               | Shows how to setup module federation where the shell loads a web component created from an Angular standalone component. <br></br> TODO: needs review                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

### Why are all the Angular code demos done using either Angular 12 or Angular 16?

Beginning with Angular 13, the CLI is emitting EcmaScript modules. This affects module federation setup since it affects how the remote exposes the webpack module and therefore how the shell can consume it. This means that the Angular 16 examples should work down to Angular 13 version, except in some cases where some Angular API to load the component dynamically is being used that might not exist or have changed since Angular 13. For Angular 12 versions we need to adjust the code. 

## Debug

To debug any of the apps in the examples:
1) go to apps's URL and open your browser's dev tools (usually accessible via F12). Usually the examples will at least have the shell at http://localhost:4200 and one remote at http://localhost:4201.
2) go to the sources tab and locate the files under webpack:///src.
3) add breakpoints to help you step through and understand the code.

> **Note**
>
> You can also debug the remote from the shell. Go to the shell's URL, open the browser's dev tools and **once the remote has been loaded into the shell** you will find the code of the remote under webpack:///src as well.
> 