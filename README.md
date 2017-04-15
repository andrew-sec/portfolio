# Учебная сборка Loftschool

## Секачев Андрей 

> Сборка работает на gulp версии 4.0. 

#### Для начала работы

1. `clone this repo`
2. `cd path/to/...`
3. `yarn add gulpjs/gulp-cli -g`  
> Установка последней версии Gulp CLI tools глобально (подробнее - [GitHub](https://github.com/gulpjs/gulp/blob/4.0/docs/getting-started.md) )

4. `yarn install`
6. `run gulp` 

#### В сборку добавлены таски:

1. `sprite:img - для создания спрайтов, плагин gulp.spritesmith. В папку /source/img добавлены тестовые файлы в формате gif`

2. `copy:fonts - копирует шрифты в /build. Так же сгенерированы шрифты и добавлены в папку /source/fonts `

3. `jquery перенеcен из devDependencies в dependencies`