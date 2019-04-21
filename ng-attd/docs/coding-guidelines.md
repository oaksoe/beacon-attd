# Documentation
## Document setups, installations, deployment steps
## Document issues and solutions
## Document complex features, architectures, communications

# Code Formatting
## Use same VSCode .editorconfig as follows:

root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
max_line_length = 0
trim_trailing_whitespace = true

## Always leave one empty line after the last line in every file

# Styling
## Use sass instead of css (.scss file instead of .css file)

## Naming a css classname
- Choose a prefix - 3 characters (Eg. abc-)
- For common class names, use organization's prefix (Eg. itl-)
- For app-related class names, use the app's prefix (Eg. att-)
- Follow hierarchy of html elements/angular components (Eg. itl-app, itl-header, itl-header-div)

# Folder/File Structure
## Have the following folder structure
src
    app
        components
            common
                header
                    header.component.* (ts, html, scss)
                sidemenu
                    sidemenu.component.* (ts, html, scss)
                login
                    login.component.* (ts, html, scss)
            index.ts
        models
            constants.ts
            user.model.ts
            index.ts
        services
            auth
                auth.service.ts
            api
                http.service.ts
            index.ts

## Use index.ts to export (expose) components, models and services

# Typescript syntax
## Minimize using let. Use const instead.

## In a class whether a component, service or a normal class,
- Always use access modifier public, protected, private.
- The order of class variables and methods shall follow that of access modifiers (public, protected, private)
- If the variable or method is to be used by another class or in the html, use public, else use private

# Component
## Naming the component selector
- Choose a prefix - 4 characters (Eg. abcd-)
- For common components like header, sidemenu, login, use organization's prefix (Eg. itlx-)
- For app-related components, use the app's prefix (Eg. attd-)

## Naming the component
- Name the same as component selector without the prefix (Eg. attd-create-attendance => CreateAttendanceComponent)
- Name with meaning. Avoid using short names

## Implements lifecycle events
- Always implement OnInit, AfterViewInit, OnDestroy if the ngOnInit, ngAfterViewInit are used

## Constructor
- Use private for constructor parameters (injected services, ...)
- no access modifier in front of constructor()