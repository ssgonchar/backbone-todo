# CODE SUPPLY AGREEMENT
## Steel Emotion Village. Java Script

## Table of contents

* [Code style guide](#code-style-guide)
* [Files and folders structure](#files-and-folders-structure)
* [Automated tasks](#automated-tasks)
* [Documentation](#documentation)

## <a name="code-style-guide"></a>Code style guide

You must strictly follow by rules and standards declared in [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml). For easiest use you can integrate that in your IDE and check standards automated.

*You must write documentation comments for all classes (constructor declarations), methods and properties of classes. You must strictly folow by next comments example (use all comment like in example and order they like in example).*

```
/**
 * Short description text.
 * @class
 * @extends Sevgui.Component
 * @param {CConfig} config - Some component configuration.
 */
function SomeComponentClass(config) {

    /**
     * Short description text.
     * @protected
     * @property {array}
     */
    var someProtectedProperty = [];
    
    /**
     * Short description text.
     * @protected
     * @return {Object} result
     */
    var someProtectedMethod = function()
    {
        return {
            property: 'value',
            property2: 123
        };
    };
    
    return {
    
        /**
         * Short description text.
         * @public
         * @property {string}
         */
        somePublicProperty: 'value',    
   
        /**
         * Short description text.
         * @public
         */
        somePublicMethod: function() {
        }
    }
}
```

## <a name="files-and-folders-structure"></a>Files and folders structure

Here asserted in our team files and folders structure. You always must use only this structure because other files and folders will be removed before to start new build compile.

```
sevgui/
├── dist/
│   ├── sevgui.js
│   └── sevgui.min.js
├── src/
│   ├── sorter.js
│   ├── paginator.js
│   ├── autocomplete.js
│   ├── table.js
│   ├── form.js
│   ├── ...
│   └── main.js
├── doc/
├── components/
│   └── sorter/
│        ├── dist/
│        │   ├── sorter.js
│        │   └── sorter.min.js
│        ├── src/
│        │   ├── ...
│        │   └── main.js
│        ├── vendors/
│        ├── .bowerrc
│        ├── .gitignore
│        ├── bower.json
│        ├── package.json
│        ├── gulpfile.js
│        └── README.md
├── vendors/
├── .bowerrc
├── .gitignore
├── bower.json
├── package.json
├── gulpfile.js
└── README.md
```

## <a name="automated-tasks"></a>Automated tasks

For save actual state of sevgui.js library all developers should use Gulp for manage automated tasks. Here you can find list of current tasks which worked in all components and in library:

* `gulp build:component` - run this task in any component folder. This make distribute file of component, thir minimized version for production and save these in `/sevgui/components/<component>/dist/`.
* `gulp build:library` - run this task in `/sevgui/`. This make distribute and sorce builds of library. Version for production will minimized and saved in `/sevgui/dist/sevgui.min.js`. Version for development not uglified and saved in `/sevgui/dist/sevgui.js`. In `/sevgui/src/*.js` will be saved all components separated. Also this task copy README.md from each component folder to `/sevgui/doc/` and change name `README` on `<component_name>`.

Any developer whem making new component should copy gulpfile.js from any other component. This file is required. This is standart file and tasks will be work in any component with right files and folders structure.

## <a name="documentation"></a>Documentation

*Documentation is main part of our work. So all who write code must write documentation for that code too.*

You must place your documentation in READMY.md file of your component. Components without READMY or with empty READMY will not be added to the distribution versions of library build. Example of README.md file you can see in any existing component. 
