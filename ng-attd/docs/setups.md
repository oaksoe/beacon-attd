# create empty angular template
## ensure to install latest angular cli
npm i -g @angular/cli

## generate empty angular template
ng new app-name

# add angular materials
## install material packages
npm i @angular/material --save
npm i @angular/cdk --save
npm i @angular/animations --save

## import the following modules
BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule and materials-related modules

## import material theme in src/styles.css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";

# add material icons
## install material icons package
npm i material-design-icons --save

## add css file to ./angular.json
"styles": [
    ...,
    "node_modules/material-design-icons/iconfont/material-icons.css"
],
