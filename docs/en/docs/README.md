# RSHIP

RSHIP *(Rocket Ship)* – simple and effective tool for developing and building isimorphic web application.

Current appilcation is **CLI** (Command Line Interface) wich avaliable from command ```$ rship```

## [Install](parts/install.html)
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


## Create application
После установки RSHIP готов к созданию приложения
```bash
$ rship new application_name # rship n applciation_name
```
```bash
16:12:17 App will create at: /Users/foo/code/application_name
yarn install v0.17.2
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 13.07s.

$ cd application_name
```

## [Developing](parts/development.html)
```bash
$ rship run dev
```

## [Building](parts/building.html)
```bash
$ rship run build
```

## Install packages
```bash
$ rship setup     # without node_modules folder remove
```
```bash
16:30:06 Please be patient
16:30:06 Installing dependencies
16:30:06 Success
yarn install v0.17.2
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.63s.
```

```bash
$ rship setup -f  # with node_modules folder remove
```
```bash
16:30:26 Please be patient
16:30:26 Removing client node_modules
16:30:28 Installing dependencies
16:30:28 Success
yarn install v0.17.2
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 9.89s.
```

## Add package
```bash
$ rship install moment
```
```bash
16:15:32 Please be patient
yarn add v0.17.2
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency
└─ moment@2.16.0
Done in 5.01s.
```


## Remove package
```bash
$ rship remove moment
```
```bash
16:15:48 Please be patient
yarn remove v0.17.2
[1/2] Removing module moment...
[2/2] Regenerating lockfile and installing missing dependencies...
success Uninstalled packages.
Done in 4.93s.
```

##### MIT [Rambler Digital Solutions](https://github.com/rambler-digital-solutions) (2016)
