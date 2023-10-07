# multi-version-ng code demo

- [TODO](#todo)

## TODO

$env:NODE_OPTIONS = "--openssl-legacy-provider"

code-demos\multi-version-ng\mfe2-ng14\tsconfig.app.json -> includes "src/app/my-feature/remote-bootstrap.ts"
code-demos\multi-version-ng\shell-ng16\tsconfig.json -> resolveJsonModule and allowSyntheticDefaultImports set to true for the json file import
code-demos\multi-version-ng\mfe3-ng12\tsconfig.json -> resolveJsonModule and allowSyntheticDefaultImports set to true for the json file import


webpack.config.js files -> talk about the diffs, different ng versions have differnt setups. More importantly is the share bit


code-demos\multi-version-ng\mfe3-ng12\package.json -> start:local-web-component


code-demos\multi-version-ng\mfe3-ng12\src\app\my-feature\remote-bootstrap.ts -> bootstrapMyComponentAsyncV2
code-demos\multi-version-ng\shell-ng16\src\app\app.component.html -> html has 2 nodes for the mfe3


code-demos\multi-version-ng\shell-ng16\src\bootstrap.ts -> show both bootstrap ways, perhaps with environment variable?


code-demos\multi-version-ng\mfe3-ng12\src\app\app.module.ts
// bootstrap: [AppComponent],
//
// TODO: move this to the README for this code demo
// The fact that AppComponent is in the bootstrap array is what makes Angular load it. Meaning when the module is bootstraped by the platform, see src/bootstrap.ts it
// will process the AppComponent and render it on its selector which is what is used on the index.html and then the app is started.
//
// The way we are using module federation with this app, we are exposing a function that bootstraps the AppModule in order to then expose the MyComponent Angular component.
// When we do that we cannot auto bootstrap the AppComponent or else angular loads zone.js and it creates an error https://stackoverflow.com/questions/55143772/error-expected-to-not-be-in-angular-zone-but-it-is
//
// So now we are in a situation where we want to bootstrap the AppComponent if we are running locally for development of the mfe3 app but we also want to have a way to don't bootstrap the AppComponent
// because we just want to expose the MyComponent Angular component to run in integration with the shell.
//
// Because of this we don't add anything to the boostrap array and we do some logic in the ngDoBootstrap function which gets called if the bootstrap array is empty (check this, link to article).


Maybe change the ngDoBootstrap signature to take in the appref? What makes more sense? check docs on bgDoBootstrap overloads?