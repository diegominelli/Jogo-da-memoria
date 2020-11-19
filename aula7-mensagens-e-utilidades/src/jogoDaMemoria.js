class JogoDaMemoria {
  // se mandar um obj = { tela: 1, idade: 2, etc: 3}
  // vai ignorar o resto das propriedadese pegar somente a propriedade
  // tela
  constructor ({ tela, util }) {
    this.tela = tela
    this.util = util
    // caminho do arquivo, sempre relativo
    // ao index.html
    this.heroisIniciais = [
      { img: './assets/batman.png', nome: 'batman'},
      { img: './assets/ciclope.png', nome: 'ciclope'},
      { img: './assets/flash.png', nome: 'flash'},
      { img: './assets/spider-man.png', nome: 'spider-man'},
    ]
    this.iconePadrao = './assets/zombie.png'
    this.heroisEscondidos = []
    this.heroisSelecionados = []
  }
  // para usar o this, não podemos usar static!
  inicializar() {
    // vai pegar todas as funções da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais)
    // força a tela a usar o THIS de Jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this))
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
  }

  async embaralhar() {
    const copias = this.heroisIniciais
    // duplicar os itens
    .concat(this.heroisIniciais)
    // entrar em cada id e criar um id aleatorio
    .map(item => {
      return Object.assign({}, item, { id: Math.random() / 0.5})
    }) 
    // ordenar aleatoriamente
    .sort(() => Math.random() - 0.5)

    this.tela.atualizarImagens(copias)
    this.tela.exibirCarregando()
    // vamos esperar 1 segundo para atualizar a tela
    await this.util.timeout(1000)
    this.esconderHerois(copias)
    this.tela.exibirCarregando(false)
  }

  esconderHerois(herois) {
    // vamos trocar a imagem de todos os herois existentes
    // pelo icone padrao
    // como fizemos no construtor, vamos extrair somente o necessario
    // usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar
    // o que tiver dentro dos parenteses
    // quando não usamos : (exemplo do id), o JS entende que o nome
    // é o mesmo do valor: Ex: id: id, vira id, 
    const heroisOcultos = herois.map(( { nome, id, }) => ({
      id,
      nome,
      img: this.iconePadrao

    }))
    // atualizamos a tela com os herois ocultos
    this.tela.atualizarImagens(heroisOcultos)
    // guardamos os herois para trabalhar com eles depois
    this.heroisOcultos = heroisOcultos
  }

  exibirHerois(nomeDoHeroi) {
    // vamos procurar esse heroi pelo nome em nossos heroisIniciais
    // vamos obter somente a imagem dele
    const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
    // vamos criar uma funcao na tela, para exibir somento o heroi selecionado
    this.tela.exibirHerois(nomeDoHeroi, img)
  }

  verificarSelecao(id, nome) {
    const item = { id, nome }
    // vamos verificar a quantidade de herois selecionados
    // e toma ação se escolheu certo ou errado
    const heroisSelecionados = this.heroisSelecionados.length
    switch(heroisSelecionados) {
      case 0:
        // adicionar a escolha na lista, esperando pela proxima
        // clicada 
        this.heroisSelecionados.push(item)
        break;
      case 1:
        // se a quantidade de escolhidos for 1,significa
        // que o usuario só pode escolher mais um
        // vamos obter o primeiro item da lista
        const [ opcao1 ] = this.heroisSelecionados
        // zerar itens para não selecionar mais de dois 
        this.heroisSelecionados = []
        // conferimos se os nomes e ids batem conforme
        // o esperado
        if(opcao1.nome === item.nome &&
          // aqui verificamos se são ids diferentes para 
          // o usuario não clitar duas vezes no mesmo
          opcao1.id !== item.id
          ) {
            this.exibirHerois(item.nome)
            // como padrao é true, nao precisa passar nada 
            this.tela.exibirMensagem()
            // para a execucao
            return;
          }  

          this.tela.exibirMensagem(false)
          // fim co case !
          break;
    }
  }

  jogar() {
    this.embaralhar()
  }
}









