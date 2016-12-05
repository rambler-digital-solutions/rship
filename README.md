# <a href='https://github.com/rambler-digital-solutions/rship'><img src='https://github.com/rambler-digital-solutions/rship/blob/master/docs/logo/logo.png?raw=true' width='319px'/></a>


[![Build Status](https://travis-ci.org/rambler-digital-solutions/rship.svg?branch=master)](https://travis-ci.org/rambler-digital-solutions/rship)
[![NPM version](https://badge.fury.io/js/rship.svg)](https://badge.fury.io/js/rship)
[![Test Coverage](https://codeclimate.com/github/rambler-digital-solutions/rship/badges/coverage.svg)](https://codeclimate.com/github/rambler-digital-solutions/rship/coverage)
[![Code Climate](https://codeclimate.com/github/rambler-digital-solutions/rship/badges/gpa.svg)](https://codeclimate.com/github/rambler-digital-solutions/rship)

## TL;DR
**RSHIP** *(Rocket Ship)* – isn't boilerplate. It's a **tool** for developing and building isimorphic web applications.

[![asciicast](https://asciinema.org/a/0k7tkffggic88se3utojygyik.png)](https://asciinema.org/a/0k7tkffggic88se3utojygyik)


## Goals
- No pain with iterable stop/run node.js server;
- Fast recompiling and starting node.js webserver processes;
- Livereload over separated ports (**html** / **(css/client js/images)**);
- Source code compiling and running from **RAM** over **MemoryFS**;
- Has instruments for debugging server side code;
- Has CPU and RAM usage metrics;
- Can works globally and locally as part of your project;

## [Installation](https://github.com/rambler-digital-solutions/rship/blob/master/docs/en/docs/parts/installation.md)
```bash
$ npm i rship -g          # via npm
$ yarn global add rship   # via yarn, !can be problems!
```

## Initialize application
When **RSHIP** has been istalled, CLI is ready for creating application from [DEFAULT BOILERPLATE](https://github.com/mrsum/rship-boilerplate)
```bash
$ rship new application_name # rship n applciation_name
```

## [Default boilerplate](https://github.com/mrsum/rship-boilerplate)

#### Contains
- [React](https://facebook.github.io/react/) as view engine;
- [Redux](https://github.com/reactjs/redux) as state container;
- [Webpack](https://webpack.github.io/) as compiler of client and server codebase;
- [Stylus](http://stylus-lang.com/) as style pre-processor;
- [CSSModules](https://github.com/css-modules/css-modules);
- [axios](https://github.com/mzabriskie/axios) as HTTP client;
- [Koa 2.0](http://koajs.com/) as http web server;
- [Jest](https://facebook.github.io/jest/) as testing framework.

#### Goals
- Server Side Rendering;
- SEO compability;
- Similar codebase over all project;
- Performance;
- Maintainability;

## How is it works?
# <img src='https://rambler-digital-solutions.github.io/rship/styles/images/rship_roadmap.svg'/>

## [Documentation](https://rambler-digital-solutions.github.io/rship/)


## CLI
```bash
$ rship

Usage: rship [options] [command]

  Commands:

    new|n     [name]                   create ship application
    setup|s   [options]                setup application
    run       [env]                    run development mode
    install|i [options] [packages...]  install system dependencies
    remove|r  [options] [packages...]  remove client/server dependencies

  CLI for building Isomorphic Web App

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

## [Developing](https://github.com/rambler-digital-solutions/rship/blob/master/docs/en/docs/parts/development.md)
```bash
$ cd /Users/foo/code/application_name
$ rship run dev
```

## [Building globally](https://github.com/rambler-digital-solutions/rship/blob/master/docs/en/docs/parts/building.md)
```bash
$ cd /Users/foo/code/application_name
$ rship run build
```

##### MIT [Rambler Digital Solutions](https://github.com/rambler-digital-solutions) (2016)
