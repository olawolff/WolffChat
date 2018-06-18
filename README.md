# BotFramework-webchat

## About the project / Sobre o projeto
O Olá Wolff é uma startup que está querendo facilitar o processo de abertura de empresas no Brasil, e nós utilizamos um bot para isso pois acreditamos que bots são os novos apps. Uma forma natural e intuitiva conversar, tirando dúvidas e talvez formalizar o seu negócio.

Para isso construímos um componente em react para conversar com o Microsoft Bot Framework por uma página da web. A necessidade do nosso negócio pedia fazer um projeto do zero, ao invéz de utilizar o [BotFramework-WebChat](https://github.com/Microsoft/BotFramework-WebChat) da Microsoft. No nosso projeto estamos adicionando vários componentes que podem ser úteis também para você, por isso estamos abrindo o código fonte.

## Develop / Desenvolvimento

We use React to develop this Microsoft Bot Framework web client. For you to have everything to start developing, you will need to do this simple steps:
Nós utilizamos React para desenvolver o cliente do Microsoft Bot Framework. Para você ter tudo pronto para começar a desenvolver, você vai precisar:

1. Instalar o npm / Install npm
2. `npm install`
2. `npm start`

You can use the file `/public/index.html` as a template for the final file. You will need to pass some data to the bot, as it is showed below:
Você pode utilizar o arquivo `/public/index.html` como template para o arquivo final. Você irá precisar passar alguns dados para o bot. Como mostrado abaixo:

```javascript
    window.chat = {
        bot_id: "O ID DO SEU BOT", //your bot id
        bot_secret: "A CHAVE DO SEU BOT", //Your bot key
        bot_name: "NOME QUE APARECERÁ NO CHAT" //name that will apper on the webchat
    }
}
```

## Guideline / Guia

You can use this component do build amazing webclients for your bot, but PLEASE, do not use our gradient color anywhere or the avatar for our bot, unless you are contributing direct to our project. 

Você pode usar esse componente para construir clientes web para seu bot a vontae, mas POR FAVOR, não utilize a nossa cor em gradiente em nenhum outro lugar ou o avatar para nosso bot. A menos que você esteja contribuindo diretamente para o projeto.

### Styling / Estilização

In the `/src/styles/` folder you will find the source files for generating the styles. For basic branding, change `colors.css` to match your color scheme. For advanced styling, change `chat.scss`.

Na pasta `/src/styles/` você irá encontrar o código fonte para gerar os estilos do projeto. Para estilização rápida, mude `colors.css` para ficar com o esquema de cores do seu projeto. Para estilização avançada, mude o arquivo `chat.scss`.

## You can contribute to Web Chat! / Você pode contribuir com o webchat

* Report any unreported [issues](https://github.com/olawolff/WolffChat/issues)
* Propose new [features](https://github.com/olawolff/WolffChat/issues)
* Fix an outstanding [issue](https://github.com/olawolff/WolffChat/issues) and submit a [pull request](https://github.com/olawolff/WolffChat/pulls) *(please only commit source code, non-generated files)*

(Em português)

* Reportar [problemas](https://github.com/olawolff/WolffChat/issues) não encontrados 
* Recomendar novas [funções](https://github.com/olawolff/WolffChat/issues)
* Corrigir um [problema](https://github.com/olawolff/WolffChat/issues) e enviar um [pull request](https://github.com/olawolff/WolffChat/pulls) *(Por favor, somente commit o código fonte, sem arquivos gerados)*



## Copyright & License

© 2018 Olá Wolff

[MIT License](/LICENSE)