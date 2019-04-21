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

# Styling
## Use sass instead of css (.scss file instead of .css file)

## Naming a css classname
1. Choose a prefix - 3 characters (Eg. abc-)
2. For common class names, use organization's prefix (Eg. itl-)
3. For app-related class names, use the app's prefix (Eg. att-)
4. Follow hierarchy of html elements/angular components (Eg. itl-app, itl-header, itl-header-div)

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
        models
            constants.ts
            user.model.ts
        services
            auth
                auth.service.ts
            api
                http.service.ts

# Component
## Naming a component
1. Choose a prefix - 4 characters (Eg. abcd-)
2. For common components like header, sidemenu, login, use organization's prefix (Eg. itlx-)
3. For app-related components, use the app's prefix (Eg. attd-)
4. 
