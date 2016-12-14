# RSHIP / Installation

## Installation (Locally):
Just install RSHIP via ```npm``` or ```yarn```

```bash
$ npm i rship -g          # npm
$ yarn add rship --global # yarn
```

## For contributing (Locally):
```bash
$ git clone %REPO_HERE%
$ cd $_
$ npm link
% git checkout -B feature/your-super-feature
```

## For building (Locally):
```bash
$ ship run build 
$ cp ./dist/application.tar.gz %desination_folder%
```


## For building (Remote or CI):
```bash
$ cd %application_folder%
$ npm i rship --save-dev
$ vi package.json
```

```json
{
  "scripts": {
    ....
    "build": "./node_modules/.bin/rship run build"
    ....
  }
}

```

```bash
$ npm run build
```


##### MIT [Rambler Digital Solutions](https://github.com/rambler-digital-solutions) (2016)
