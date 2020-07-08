# Entrega Rocketseat 🚀

Este repositório contém os três projetos (backend, web e mobile) para a conclusão e recebimento do certificado do Bootcamp da Rocketseat

O projeto desenvolvido foi o Fastfeet

## Executando o backend ⚙

```sh
cd server
yarn
cp .env.example .env
```

Abra o arquivo .env e preencha as informações conforme seu ambiente.

Após salvar o arquivo com suas informações, execute:

```
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

Agora, inicie o servidor local com o comando:

```
yarn dev
```

## Executando o frontend web 💻

```
cd www
yarn
yarn start
```

O usuário e senha para acesso são:

- admin@fastfeet.com
- 123456

## Executando o app 📱💜

O app foi desenvolvido apenas para o sistema Android.

```
cd mobile
yarn
yarn android
```

Se a URL do servidor for diferente de http://localhost:8000, será necessário editar o arquivo `src/services/api.js` apontando para a URL correta.

Se o servidor backend estiver rodando na máquina local, é necessário executar em seu terminal:

```sh
adb reverse tcp:8000 tcp:8000
```

Isso redirecionará requisições localhost:8000 no dispositivo Android para sua máquina.

Este repositório foi criado apenas para entrega do projeto, com os três projetos juntos em um mesmo repositório. Os repositórios originais usados durante o desenvolvimento podem ser acessados nos links abaixo:

[Backend / NodeJS](https://github.com/felipebergamin/gostack10-fastfeed-backend)

[Web / ReactJS](https://github.com/felipebergamin/gostack10-fastfeed-recatjs)

[Mobile / React Native](https://github.com/felipebergamin/gostack10-fastfeet-mobile)
