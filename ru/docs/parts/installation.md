# RSHIP / Установка

## Для работы (Локально):
Установить RSHIP можно несколькими способами, самым надежным является установка через **npm** или **yarn**:

```bash
$ npm i rship -g          # npm
$ yarn add rship --global # yarn
```

## Для работы (Локально):
```bash
$ git clone %REPO_HERE%
$ cd $_
$ npm link
% git checkout -B feature/your-super-feature
```

## Для сборки (Локально):
```bash
$ ship run build 
$ cp ./dist/application.tar.gz %desination_folder%
```


## Для сборки (Удаленно или CI):
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
