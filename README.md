# A12

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---
# NG Instructions

### one time stuff …

### get brew installed
```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

### install node
```brew install node```

Make sure you have NPM installed and updated:
```npm install -g npm``` to update

### check node and npm installs
```
node -v
npm -v
```

### upgrade node
```brew upgrade node```

```npm version```

### get the extension for sublime…

```git clone --depth 1 https://github.com/Microsoft/TypeScript-Sublime-Plugin.git TypeScript```

### install angular

```
sudo npm install -g @angular/cli
sudo chown -R $USER:$(id -gn $USER) /Users/bubba/.config
```

### create a new project…
cd to your top level directory (one directory **above** the place where you want it ; e.g. Desktop)

```ng new a8 --routing --style=scss``` (--routing creates a routing file and --style=scss adds scss styles)

>  *note, the new Angular7 is supposed to ask you for routes and styles but it don't seem to do it for me*

```cd a8```

do all your ng updates

```ng update --all```

```ng serve```

### move the new project to git

Log into github and create a project (for example a8)

cd to main directory

```
cd ~/Desktop/a8
git init
git add .
git commit -m “first“
git remote add origin https://github.com/hmfic/a8.git
git push -u origin master
```

### create component …

```cd a8/src/app```

create directory called components

```
md components
ng g component components/user
``` 
> (these create the correct entry in the app.module.ts for you)

```
ng g component components/about
ng g component components/details
```

### Create services

create a directory called services

```md services```

```ng g service services/data```

add service to each component that needs it … 

   e.g. add ```“import {DataService} from ‘../../services/data.service’``` to user.component.ts
   
then inject dependency into the constructor in the user.component.ts file … 

   e.g. ’constructor(private dataService:DataService) { ‘
   
add your service code after the constructor and don’t forget to return the value

NOTE: if you don’t like the components subdirectory, consider running directly from src/app

Add the component to the main html, edit app.component.html to add component selector
(selector is found in user.component.ts file):

```<app-user></app-user>```

### to add a new module (http, etc)
go to the app.module.ts and add a new import

  e.g. ```import { HttpModule } from “@angular/http’```
  
then add to the imports in the app.module.ts file

  e.g. imports: […,..,HttpModule]
  
go to each service that needs the module and import

  e.g. import {Http} from ‘@angular/http’
  
and for each service, inject the service as a dependency in the constructor
  e.g. ```constructor(public http:Http) { …```


### important directory/files
src/app/app.module.ts - MAIN: imports, components and services/providers plus bootstrap

src/app/app.component.ts - 

src/app/app.component.html - main html

src/app/components/<component>.component.html - component html

### Updates:
```npm outdated```

```npm install tslint@latest --save``` (etc)

Run the following command to install a compatible version of TypeScript.

```npm install typescript@'>=2.7.2 <2.10'```

### MATERIAL
```npm install --save @angular/material @angular/cdk @angular/animations```

```ng add @angular/material```

### Cookies
```npm install ngx-cookie-service --save```

### Browser animiations
in app.module.ts add

```import { BrowserAnimationsModule } from '@angular/platform-browser/animations';```

```import { DragDropModule } from '@angular/cdk/drag-drop';```

### maps
```npm install @agm/core --save```

then add to app.modules:
```import { AgmCoreModule } from '@agm/core';```

### D3
```npm install d3```

```npm i @types/d3 @types/socket.io-client -D``` this is optional in case you want sockets

```import * as d3 from "d3";``` iin your xxxxx.component.ts for each component it needs

```npm install --save-dev @types/d3```

or 

```npm install @types/d3-array --save```

### D3 tips

```npm install ngx-d3-tooltip```

need typiing? ```npm install --save-dev @types/node```

then add to app modules

don't forget encapsulation in d3 modules to avoid rewriting the styles

### D3 Sankey
```npm install --save d3-sankey```

```npm install --save @types/d3-sankey```

### Drag and drop
```npm new dragdrop```

### Flex layout
```npm install @angular/flex-layout@latest --save```

### Use schematics
```ng generate @angular/material:nav components/sidebar```

### D3 Tree
```npm install d3 angular-d3-tree --save```

### D3 Gauge
```npm install --save ngx-gauge ```

### Too new version of typescript, had to go back
```npm i typescript@3.1.6 --save-dev --save-exact```

### Need flex layout (see above)
```npm install @angular/flex-layout```

#### ngx charts
```npm i @swimlane/ngx-charts --save```