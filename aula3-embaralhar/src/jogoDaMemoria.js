class JogoDaMemoria {
  // se mandar um obj = { tela: 1, idade: 2, etc: 3}
  // vai ignorar o resto das propriedadese pegar somente a propriedade
  // tela
  constructor ({ tela }) {
    this.tela = tela
    // caminho do arquivo, sempre relativo
    // ao index.html
    this.heroisIniciais = [
      { img: './assets/batman.png', name: 'batman'},
      { img: './assets/ciclope.png', name: 'ciclope'},
      { img: './assets/flash.png', name: 'flash'},
      { img: './assets/spider-man.png', name: 'spider-man'},
    ]
  }
  // para usar o this, não podemos usar static!
  inicializar() {
    // vai pegar todas as funções da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais)
    // força a tela a usar o THIS de Jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this))
  }

  embaralhar() {
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
  }

  jogar() {
    this.embaralhar()
  }
}









