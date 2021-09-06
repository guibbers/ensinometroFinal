# <h1 align="center"> Projeto Ensinômetro </h1>

> _📈 Projeto parte do desafio tecnico que estou realizando da Jovens Gênios.

## :pushpin: Sobre

<p align="justify">
O projeto ensinômetro visa facilitar as aulas a distância dando ao professor e ao aluno plataformas perfeitas para que o aluno não perca o seu foco em aulas não-presenciais bem como ao professor a mandar perguntas e quizzes para seus alunos e acompanhar o resultado de todos em tempo real.
</p>

<p align="justify">
Tecnologias utilizadas:
<ul>
    <li>Vue.js</li>
    <li>Vuetify</li>
    <li>Animate.css</li>
    <li>Node.js</li>
    <li>Socket.io</li>
</ul>

## :pushpin: Como Rodar

<h1> Setup Inicial </h1>
    
   Acesse a pasta "back-end" e, pelo console, digite o código:
    
    
 
    npm install
    
    
    
   repita esse mesmo processo dentro das pastas "front-aluno" e depois "front-professor".
    


<h1> Back-end </h1>
Para rodar o back-end da aplicação, faça um fork de todo o repositório, acesse a pasta "back-end" pelo console e digite o comando:

    node server.js
    
(por padrão ele iniciará na porta 3000)


<h1> Front-end Professor </h1>

Para rodar a aplicação para o professor, faça um fork de todo o repositório, acesse a pasta "front-professor" pelo console e digite o comando:

    npm run serve -- --port8081
    
e acesse a aplicação pelo endereço "localhost:8081" em seu navegador.
<strong>Obs: Não esqueça de iniciar o servidor do back-end antes dessa etapa.</strong>


<h1> Front-end Aluno </h1>
Para rodar a aplicação para o aluno faça um fork de todo o repositório, acesse a pasta "fgront-aluno" pelo console e digite o comando: 

    "npm run serve -- --port8080" 
    
e acesse a aplicação pelo endereço "localhost:8080" em seu navegador. <br>
<strong>Obs: Não esqueça de iniciar o servidor do back-end antes dessa etapa.</strong>

## 📌 Histórias de usuário:

- [x] Eu como aluno preciso inserir meu nome antes de começar o quiz para que meu professor me identifique.
- [x] Eu como aluno preciso ter acesso às questões que meu professor passou para mim e preciso respondê-las.
- [x] Eu como professor preciso acompanhar em tempo real como meus alunos estão se saindo no quiz que criei para eles, para que eu possa ajudar os alunos com maior dificuldade.

## 📌 Considerações Finais do Desenvolvedor e Atual Estado da Aplicação:

- Nesse projeto, decidi usar node, vue e o vuetify pois na nossa entrevista, os desenvolvedores da empresa me contaram que eram essas as principais tecnologias usadas por aí na Jovens Genios. Eu não tinha nenhuma experiência prévia com Vue e Vuetify, usei essa uma semana de desenvolvimento para começar os estudos de Vue e ir desenvolvendo o projeto enquanto aprendia. Foi uma experiência incrivelmente enriquecedora, a cada segundo que passa, mais me interesso pelo vue. Mas também é preciso comentar, com honestidade, que devido a minha pouca/nenhuma experiência anterior com o Vue, não tive tempo hábil para implementar todas as ideias e GUIS que eu tinha vontade, mas não pretendo parar com esse projeto por aqui, quero continuar com seu desenvolvimento futuramente, pois além de uma ideia incrível, também foi a minha experiência mais interessante no mundo da tecnologia.

- Como na proposta de projeto foi esclarecido que o importante era a amostra de que o websocket estaria funcionando (fazendo a comunicação entre aplicações do professor e aluno), não implementei totalmente a GUI da aplicação dos professores, por enquanto há apenas um embrião de ideia de como a plataforma ficará assim que for implementada a opção de o professor inserir dinamicamente perguntas. No estado atual da aplicação, deixei três perguntas hard coded no back-end da aplicação. Para enviá-las para o aluno, basta clicar em "enviar perguntas" na plataforma do professor (após o login com o nome do professor) e na próxima tela clicar em confirmar (mesmo com todos os campos em branco).

- Para que o aluno não fosse "deslogado" a cada atualização de página, guardei nome de usuário e timestamp no localstorage do navegador, assim, quando um aluno logar com seu nome, não precisará logar de novo na aplicação se a página for atualizada.

- Para acompanhar os resultados dos alunos na aplicação do professor, em vez de a implementação de uma GUI só para isso, decidi me manter com a abordagem de apenas logar no console da aplicação, como proposto nas dicas do e-mail com o projeto que me foi enviado.

