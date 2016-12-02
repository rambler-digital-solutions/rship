# <a href='https://github.com/rambler-digital-solutions/rship'><img src='https://github.com/rambler-digital-solutions/rship/blob/master/docs/logo/logo.png?raw=true' width='319px'/></a>


[![Build Status](https://travis-ci.org/rambler-digital-solutions/rship.svg?branch=master)](https://travis-ci.org/rambler-digital-solutions/rship)
[![NPM version](https://badge.fury.io/js/rship.svg)](https://badge.fury.io/js/rship)
[![Test Coverage](https://codeclimate.com/github/rambler-digital-solutions/rship/badges/coverage.svg)](https://codeclimate.com/github/rambler-digital-solutions/rship/coverage)
[![Code Climate](https://codeclimate.com/github/rambler-digital-solutions/rship/badges/gpa.svg)](https://codeclimate.com/github/rambler-digital-solutions/rship)


**RSHIP** *(Rocket Ship)* – tool for developing and building isimorphic web application.

Current appilcation is **CLI** (Command Line Interface) which avaliable by ```$ rship```


## [Documentation](https://rambler-digital-solutions.github.io/rship/)

## [Installation](https://github.com/rambler-digital-solutions/rship/blob/master/docs/en/docs/parts/installation.md)
```bash
$ npm i rship -g          # via npm
$ yarn add rship --global # via yarn
```

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

## How is it works?

# <img src='https://github.com/rambler-digital-solutions/rship/blob/master/docs/styles/images/rship_roadmap.svg?raw=true'/>

## Initialize application
When **RSHIP** has been istalled, CLI is ready for creating application from [boilerplate](https://github.com/mrsum/rship-boilerplate)
```bash
$ rship new application_name # rship n applciation_name
```

## [Developing](https://github.com/rambler-digital-solutions/rship/blob/master/docs/en/docs/parts/development.md)
```bash
$ cd /Users/foo/code/application_name
$ rship run dev
```

## [Building](https://github.com/rambler-digital-solutions/rship/blob/master/docs/en/docs/parts/building.md)
```bash
$ cd /Users/foo/code/application_name
$ rship run build
```


##### MIT [Rambler Digital Solutions](https://github.com/rambler-digital-solutions) (2016)
