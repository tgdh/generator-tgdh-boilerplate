# TGDH front-end boilerplate

> Boilerplate to kickstart front-end projects

This project is still in development but is in a good state to be used.

## Getting Started

### Install Yeoman

```bash
npm install -g yo
```

### Yeoman Generators

To install generator-tgdh-boilerplate from npm, run:

```bash
npm install -g generator-tgdh-boilerplate
```

Finally, initiate the generator:

```bash
yo tgdh-boilerplate
```

---

* * *

1. [Features](#1-features)  
2. [Getting started](#2-getting-started)
3. [Task runner](#3-task-runner)
4. [CSS](#4-CSS)
5. [JS](#5-JS)
6. [Browser support](#6-browser-support)

##1. Features

##2. Getting started

##3. Task runner
This project uses [gulp](http://gulpjs.com/) as the task runner of choice.

The dev task runs everything you need while actively working on the project
```bash
gulp dev
```

Running the build task will take care of everything ready for deployment
```bash
gulp build
```

##4. CSS

This project uses [SCSS](http://sass-lang.com/) as it's CSS pre-processor. The main file for this project is `main.scss`, any new file references must be added in here.


###4.1 Naming conventions

This project follows the [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) methodology. This is an extension of the Block Element Modifier (BEM) methodology as it adopts patterns from the [Inverted Triangle CSS (ITCSS)](https://twitter.com/itcss_io) architecture.

All class names should follow the BEM naming convention with the addition of descriptive namespaces, these namespaces are as follows:

```
.o- /* objects */
.c- /* components */
.u- /* utility classes */
.t- /* trumps */
.s- /* scope */
```

As shown above, classes prefixed with these namespaces should also sit in the relevant folder. For example `.o-` styles should be placed in the `objects` folder.

The only exception here is the scope name space (`.s-`), which should be avoided as it involves [nesting classes](#nesting). But if you find the need to use one then it should be placed in the `trumps` folder.

An example of how a class name might look is as follows:

```
.o-block__element--modifier {}
```

Files should also be named after the top level class name (minus the namespace), so it's easier to find the relevant source code later on. For example `.c-nav` will be found in `components/_nav.scss`.

####Nesting

For the most part nesting should be avoided, classes should be portable without relying on parent classes to work.

Don't do this:
```
.o-block {
    .o-block__element {}
}
```
Do this:
```
.o-block {}
.o-block__element {}
```

There are some circumstances where nesting is acceptable, these are for psuedo elements(`:before`), states(`:hover`), dependencies(`.no-enhance`) and scopes(`.s-`) but as mentioned above scopes should be avoided unless needed.

Acceptable:
```
.o-block {
    &:hover {}
    .no-enhance & {}
}

.o-block--modifier {
    .block__element {}
}

.s-free-content {
    h1 {}
}

```

##5. JS

This project follows the Revealing Modular Pattern [Private Naming Conventions](https://toddmotto.com/mastering-the-module-pattern/#private-naming-conventions)

Code should be broken down into component based modules which can be configured as necessary.
If applicable, settings should be configurable through `data-attributes` to allow for variety. An example of this might be a carousel which enables dots in one location and navigation arrows in another. 

```
var Module = (function () {

  var _privateMethod = function () {
    // private stuff
  };

  var publicMethod = function () {
    _privateMethod();
  };

  return {
    publicMethod: publicMethod
  };

})();
```


##6. Browser support

This project has been built with progressive enhancement at its core. It uses an approach first coined by the BBC known as [Cutting the Mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard).
