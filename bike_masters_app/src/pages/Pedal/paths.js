import map from '../../assets/images/map.png'

export const paths = [
  {
    id: 1,
    map,
    title: 'Trilha da Bruxa',
    description: 'Trajeto de montanha com grande dificuldade',
    abbreviation: 'tBruxa',
    difficulty: 'Difícil',
    votes: [
      {
        id: 1,
        name: 'João',
      },
      {
        id: 2,
        name: 'Maria',
      },
    ],
  },
  {
    routeImg: 'http://localhost:3001/images/tCobOuro.png',
    title: 'Cobrinha de Ouro',
    description:
      'O trajeto inicia as margens da Br-101, próximo ao viaduto do Furadinho. Todo o trajeto é feito em estrada de chão, acompanhado de uma natureza exuberante. Com aproximadamente 16km(ida e volta), é excelente para quem está iniciando no mundo dos pedais.',
    abbreviation: 'tCobOuro',
    difficulty: 'Fácil',
    votes: [],
  },

  {
    routeImg: 'http://localhost:3001/images/tGruVarginha.png',
    title: 'Gruta da Varginha',
    description:
      'O trajeto inicia as margens da Br-101, próximo ao posto da Policia Rodoviária Federal. Inicialmente o trajeto é formado por uma estrada de paralelepídedos(1,5km) depois passando a ter todo o seu trajeto em estrada de chão. Durante todo o seu trajeto, há uma alternancia entre trechos planos e trechos de subidas e descidas. Entre os destaques do trajeto está o morro dos Quadros, subida extramente íngreme. Somente recomendada para ciclistas muito experientes.',
    abbreviation: 'tGruVarginha',
    difficulty: 'Difícil',
    votes: [],
  },

  {
    id: 4,
    map,
    title: 'Praia de Fora',
    description: `Trajeto de aproximadamente 20km, 
      com boa parte do caminho feito pela marginal da BR 101`,
    abbreviation: 'tPFora',
    difficulty: 'Fácil',
    votes: [
      {
        id: 1,
        name: 'João',
      },
      {
        id: 2,
        name: 'Maria',
      },
      {
        id: 3,
        name: 'Pedro',
      },
    ],
  },
  {
    id: 5,
    map,
    title: 'São Pedro de Alcantara',
    description: `Trajeto feito pela marginal da SC-283,
    com aproximadamente 50km`,
    abbreviation: 'tSPA',
    difficulty: 'Dificil',
    votes: [
      {
        id: 1,
        name: 'João',
      },
    ],
  },
]
