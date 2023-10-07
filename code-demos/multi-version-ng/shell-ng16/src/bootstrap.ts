import { PlatformRef } from '@angular/core';
import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
// import {
//   Options,
//   bootstrap,
// } from '@angular-architects/module-federation-tools';
import { platformBrowser } from '@angular/platform-browser';
import packageJson from '../package.json';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

// const bootstrapOptions: Options = {
//   production: environment.production,
//   appType: "shell",
// };
// bootstrap(AppModule, bootstrapOptions)

const platform = getAngularPlatform();
platform.bootstrapModule(AppModule);

function getAngularPlatform(): PlatformRef {
  const ngVersion = packageJson.dependencies['@angular/core'];
  (window as any).platform = (window as any).platform || {};
  let platform: PlatformRef = (window as any).platform[ngVersion];
  if (!platform) {
    console.log('creating angular platform with version ', ngVersion);
    platform = platformBrowser();
    (window as any).platform[ngVersion] = platform;
  } else {
    console.log('reusing angular platform with version ', ngVersion);
  }

  return platform;
}