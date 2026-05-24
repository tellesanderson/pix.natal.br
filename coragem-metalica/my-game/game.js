export const credits = {
  title: "Coragem Metálica",
  author: "Anderson Telles",
  description: "No papel do capitão Daion, explorador espacial, cabe a você investigar mundos desconhecidos e contactar novas formas de vida em nome do Império Metaliano."
};

export const textNodes = [
  {
    "id": "intro",
    "texto": "-A Sagrada Mãe Galáxia presenteou-nos com um lindo mundo, com céus coloridos e musicais, onde podemos viver em paz e segurança. Mas, cedo ou tarde, um filho deve abandonar a proteção do ninho materno e cumprir seu papel no Universo. Vá, corajoso explorador espacial, e seja um dos primeiros a mergulhar no seio da Sagrada Mãe. Você irá enfrentar seus rigores, desafiar seus irmãos, retornar trazendo para seu povo sua divina luz celeste. Eu lhe entrego o instrumento de sua missão, presente enviado pelo próprio coração de nosso planeta... a Espada da Galáxia. -Não, obrigado - você responde. Não houve quem não ficasse abismado com sua negativa. Você e a comitiva imperial flutuavam no espaço, a três mil quilômetros da superfície de Metalian. Naves e mais naves protegiam as redondezas, patrulhando tudo em um raio de vários anos-luz, atentas a qualquer risco que sua Imperatriz pudesse correr. A Cerimônia de Despedida era a única ocasião em que ela se permitia abandonar a segurança da Cidade Imperial. E apesar de tudo isso, você recusou a lâmina de aço nuclear. -Qual é? - riu você. - Só vou bisbilhotar uns planetas por aí. Não preciso fatiar ninguém para isso. -Está louco, Daion? - rosnou o capitão Kursor. Mas a Imperatriz não se zangou. Estava feito. Encerrava-se assim a Cerimônia de Despedida. Daion Dairax era agora um explorador espacial. Alguns anos haviam transcorrido desde então. Você descobriu que Kursor sabia do que falava. Em vez de clonar outro braço após um acidente, você solicitou o implante de uma prótese biônica armada com laser. Você recorda tudo isso quando Parsec, sua bionave, penetra no inexplorado sistema Trentor.",
    "escolhas": [
      { "texto": "Iniciar Exploração", "destino": "01" }
    ]
  },
  {
    "id": "01",
    "texto": "A imagem do planeta Trentor-1 na tela não parece muito promissora. Está coberto de nuvens brancas, o que pode indicar a presença de vapor d'água e outros venenos. Os regulamentos da Frota Exploratória estabelecem que o procedimento correto seria solicitar uma análise ao computador de bordo. Só então, calcular o risco de uma investigação pessoal.",
    "escolhas": [
      { "texto": "Deixar a exploração por conta do computador", "destino": "34" },
      { "texto": "Descer e investigar por conta própria", "destino": "15" }
    ]
  },
  {
    "id": "02",
    "texto": "Cavar uma passagem alternativa é um plano bastante arrojado mas planos arrojados são sua especialidade. Você contorna a montanha e calcula o provável local onde há outros túneis. Seu braço brilha com luz vermelha. O raio laser incide sobre a rocha, derretendo, vaporizando. A quantidade de fumaça é imensa e você torce para que ela não chame a atenção dos monstros. Pouco a pouco você avança pelo túnel que se forma. Infelizmente, depois de algumas horas, você percebe que está perdido. Orientar-se sob a terra é mais difícil do que julgou. Escolha ao acaso um caminho.",
    "escolhas": [
      { "texto": "Tentar o caminho 1", "destino": "10" },
      { "texto": "Tentar o caminho 2", "destino": "18" },
      { "texto": "Tentar o caminho 3", "destino": "31" }
    ]
  },
  {
    "id": "03",
    "texto": "Você pensa em tornar-se invisível, mas o traje não permite. As criaturas movem os olhos facetados e arreganham os dentes, saltando em sua direção. Seu braço direito ergue-se. O punho fechado crepita pouco antes de disparar o feixe de laser. Uma cratera explode onde antes havia a cabeça de um monstro. O outro consegue alcançar você. É bem mais forte do que parece; suas garras poderiam até mesmo ferir sua pele biometálica. Nunca terá essa chance. Você arromba seu peito com o punho biônico e faz outro disparo, incinerando sua carne.",
    "escolhas": [
      { "texto": "Entrar na ponte de comando", "destino": "29" }
    ]
  },
  {
    "id": "04",
    "texto": "Sua chegada parece agitar os diabinhos, e você compreende que eles devem estar com fome. Sem nenhuma intenção de servir de lanche, você se vira para sair e descobre uma grade espinhosa bloqueando a passagem. As larvas estão borrifando jatos de líquido fumegante sobre você. Pelos buracos que a coisa abre no tecido regenerador do traje isolante, deve tratar-se de um forte ácido. A roupa protege você da primeira salva, mas não vai aguentar por muito mais tempo. Com um soco você estilhaça a grade destinada a deter a fuga de presas muito mais fracas.",
    "escolhas": [
      { "texto": "Escapar da armadilha", "destino": "30" }
    ]
  },
  {
    "id": "05",
    "texto": "Você está na entrada do esconderijo. Precisa decidir o que fazer com seu equipamento.",
    "escolhas": [
      { "texto": "Tirar o traje plástico isolante", "destino": "16" },
      { "texto": "Continuar vestindo o traje", "destino": "25" },
      { "texto": "Estou sem traje, prosseguir", "destino": "25" }
    ]
  },
  {
    "id": "06",
    "texto": "Terminando de percorrer o túnel do meio, você se acha em uma imensa câmara ovalada. Muitas criaturas-soldado estão empoleiradas nas paredes, olhando para você. Uma quantidade ainda maior de operárias corre à volta de uma piscina de gel alaranjado. Dentro da piscina flutua um corpo biometálico. Reila. Inconsciente. Por incrível que pareça, você não se importa com nada disso. Seu olhar está preso vários metros acima, onde um pescoço segmentado de serpente eleva-se até uma cabeça enorme, uma monstruosa mistura de dragão e besouro. É a rainha-mãe da colônia, tá na cara.",
    "escolhas": [
      { "texto": "Aproveitar que estou invisível (sem traje)", "destino": "27" },
      { "texto": "Enfrentar a situação (usando traje)", "destino": "14" }
    ]
  },
  {
    "id": "07",
    "texto": "Você atinge uma grande câmara que parece ser o depósito de comida. As paredes são forradas de pequenos compartimentos. Muitas criaturas espalham-se pela câmara, mas não parecem importar-se com sua presença mesmo em sua forma visível. São bem diferentes dos monstros que você viu antes: esverdeadas, com garras menores e bocas desdentadas. Você suspeita tratar-se de uma casta operária especializada em coleta. Por isso não atacam você. Você perambula tranquilo pela câmara. Consegue perceber que alguns túneis levam para fora, e três outros aprofundam-se ainda mais no interior da montanha.",
    "escolhas": [
      { "texto": "Entrar no túnel da esquerda", "destino": "22" },
      { "texto": "Entrar no túnel do meio", "destino": "06" },
      { "texto": "Entrar no túnel da direita", "destino": "35" },
      { "texto": "Usar os túneis que levam para fora e abandonar a busca", "destino": "08" }
    ]
  },
  {
    "id": "08",
    "texto": "A doutora Venny acreditou que suas pesquisas poderiam auxiliar no futuro. Hoje ela sabe que deveria ter ouvido os avisos. Agora ela está segura na enfermaria da bionave Parsec. A porta desliza. Daion entra. -Como você está? Algo... errado? -Nada prematuro, se é o que teme. Obrigada. Onde está Reila? Você baixa os olhos verde-cobre envergonhado. -Foi mal. Não pude encontrá-la. Mas, pelo menos, você está bem. Venny não parece muito satisfeita com isso, e lágrimas oleosas correm. A vida de uma incubadora foi salva, mas Reila está perdida. Primária ficará arrasada com isso. Enquanto abandona a órbita de Trentor-1, você amaldiçoa sua incompetência e deseja que houvesse alguém por perto para dar-lhe um bom soco nas fuças...",
    "escolhas": []
  },
  {
    "id": "09",
    "texto": "À medida que avança, percebe que o túnel não parece formado de rocha comum. O toque que você sente sob os pés não é inteiramente sólido, sua textura lembra uma esponja úmida. Sim, aquele solo estranho está permeado com algum líquido estranho, que pinica seus pés. Água, provavelmente. Quando a sensação de ardência chega, você entende. A ideia é tão agonizante quanto a dor em si. Aquele líquido NÃO é água. Você NÃO está em uma caverna. Isto é o tubo digestivo de alguma criatura monstruosa, e você está recebendo banhos de ácido clorídrico concentrado! Você se volta para fugir, mas é atacado pela dor e cai. Sua pele desmancha-se. O suco gástrico penetra em seus tecidos, destruindo o delicado equilíbrio elétrico em sua carne. Mesmo o braço biônico não resiste à corrosão. Ao final de alguns minutos, nada resta de você...",
    "escolhas": []
  },
  {
    "id": "10",
    "texto": "Após horas de escavação, o túnel parece não levar a lugar nenhum. Vá para 20.",
    "escolhas": [
      { "texto": "Continuar", "destino": "20" }
    ]
  },
  {
    "id": "11",
    "texto": "Você repete a análise com Trentor-2, 3, 4 e os demais planetas do sistema. Um total de cinco bolas de rocha nua, e duas de hidrogênio e poeira. Nada de metal. Sisteminha miserável, esse! De mãos vazias, você retorna a Metalian para transmitir as informações colhidas. Chegando lá, recebe a triste notícia de que uma bionave está desaparecida; seu capitão e duas cientistas estavam a bordo, pesquisando os efeitos da vida no espaço. As buscas vão prosseguir - talvez para sempre - mas elas nunca serão encontradas. Você lamenta, mas não podia fazer nada para evitar essa tragédia. Ou será que podia?",
    "escolhas": []
  },
  {
    "id": "12",
    "texto": "Quando um grupo daquelas criaturas-inseto aproxima-se em sentido contrário, você se lembra que ainda está usando sua roupa plástica e não pode tornar-se invisível. Dentes brancos como as estrelas arreganham-se em bocas verticais. As feras atacam. Você derruba alguns com rajadas de laser. Toda a colônia deve estar ciente de sua presença: centenas daquelas criaturas estão convergindo para este túnel. Os projetores de seu braço ficam superaquecidos e desligam-se automaticamente. Por alguns segundos você será obrigado a lutar com os próprios punhos. Seus socos esmagam com facilidade a carapaça das criaturas - mas, para cada ataque que desfere, recebe três outros. Garras espinhosas rasgam seu traje e sua pele. O venenoso vapor d'água da atmosfera penetra em seus ferimentos. Se os monstros não matarem você, a água o fará. Sua missão termina aqui.",
    "escolhas": []
  },
  {
    "id": "13",
    "texto": "Você caminha para fora do cadáver da bionave, contente em abandonar aquela catedral de carniça. As antenas implantadas nos flancos de seu focinho varrem os arredores com microondas, e os ecos descrevem o que existe ao redor. Súbito, um eco diferente. Você concentra as microondas naquela direção, e percebe em uma montanha a entrada de uma grande caverna. Pode não ser nada, mas pode ser também a toca das coisas. É a única pista que você tem.",
    "escolhas": [
      { "texto": "Seguir para a caverna", "destino": "05" }
    ]
  },
  {
    "id": "14",
    "texto": "Sem a proteção da invisibilidade, não lhe resta muita escolha. Você terá que lutar.",
    "escolhas": [
      { "texto": "Usar as habilidades hipnóticas que ganhei", "destino": "40" },
      { "texto": "Atacar diretamente", "destino": "17" }
    ]
  },
  {
    "id": "15",
    "texto": "Optando pela descida, você examina seu equipamento. Não precisa se preocupar com muita coisa: sua forma de vida é resistente ao vácuo, a grandes variações de temperatura e gravitações severas. A presença de nuvens indica quantidades significativas de vapor d'água - substância irritante para a pele, e altamente venenosa quando em contato com um ferimento aberto. Um traje plástico isolante poderia minimizar os riscos. Mas esse mesmo traje tornaria inútil o controle de refração cutânea, a disciplina que dá aos exploradores metalianos o poder da invisibilidade.",
    "escolhas": [
      { "texto": "Vestir o traje isolante", "destino": "24" },
      { "texto": "Ficar sem traje para usar invisibilidade", "destino": "39" }
    ]
  },
  {
    "id": "16",
    "texto": "Você percebe que este planeta reserva perigos bem maiores que o vapor d'água contido na atmosfera, e resolve livrar-se do traje. A invisibilidade pode ser mais necessária.",
    "escolhas": [
      { "texto": "Prosseguir sem o traje", "destino": "25" }
    ]
  },
  {
    "id": "17",
    "texto": "Luzes intensas piscam na cabeça do dragão-inseto, mas elas não lhe dizem nada. Quando você avança um passo na direção de Reila, os monstros arreganham os dentes de suas mandíbulas verticais e saltam em sua direção. A chacina dura horas. Ondas e mais ondas de monstros avançam enquanto você os destrói com raios laser. O próprio dragão-inseto cai fulminado por um disparo certeiro, mas isso parece apenas enfurecer ainda mais os soldados. Quando a arma laser fica superaquecida, seus próprios punhos encarregam-se de despedaçar os inimigos mas a vantagem numérica termina prevalecendo. Não demora até que você afunde sob uma massa de corpos insectóides, a poucos metros da metaliana que pretendia salvar. -Desculpe, gata - você ainda consegue dizer. - Pisei na bola com você...",
    "escolhas": []
  },
  {
    "id": "18",
    "texto": "Você começa a achar que a escavação do túnel não foi uma ideia das mais prodigiosas, quando um bocado de rocha derretida cai e revela uma abertura. Encontrou a toca dos bichos! A Mãe Galáxia está mesmo zelando por você.",
    "escolhas": [
      { "texto": "Entrar na caverna", "destino": "07" }
    ]
  },
  {
    "id": "19",
    "texto": "Como seria inevitável, algumas criaturas chegam em sentido contrário. Você consegue usar a refração cutânea para ficar invisível e espremer-se contra a parede, deixando-as passar sem ser notado. Ainda bem que não está usando o traje!",
    "escolhas": [
      { "texto": "Avançar", "destino": "07" }
    ]
  },
  {
    "id": "20",
    "texto": "Cavando por mais algum tempo, você entende que foi um plano idiota. Apenas desperdiçou tempo precioso. A incubadora Venny deve estar perigosamente próxima de um parto prematuro, e você não pode esperar mais.",
    "escolhas": [
      { "texto": "Retornar à nave", "destino": "08" }
    ]
  },
  {
    "id": "21",
    "texto": "A presença dos feixes de transporte parece ter chamado a atenção das criaturas. Elas abandonam seus postos de vigilância e espiam o interior da ponte de comando. Não conseguem enxergar sua forma invisível, apenas constatando que a prisioneira fugiu. Não mostram nenhuma frustração ou outro tipo de emoção. Luzes vermelhas piscam rapidamente em suas cabeças, e então as criaturas vão embora com movimentos mecânicos. Será simples segui-las de uma distância segura até seu esconderijo e encontrar Reila.",
    "escolhas": [
      { "texto": "Segui-las", "destino": "05" }
    ]
  },
  {
    "id": "22",
    "texto": "O túnel da esquerda leva você a uma câmara menor. Ali as paredes também estão cheias de células, mas desta vez elas não guardam comida. Os compartimentos são ocupados por larvas grandes e gordas, cada uma do tamanho de seu braço.",
    "escolhas": [
      { "texto": "Eu estou usando o traje isolante", "destino": "04" },
      { "texto": "Eu não estou usando o traje isolante", "destino": "32" }
    ]
  },
  {
    "id": "23",
    "texto": "Após eliminar a ameaça, você prossegue sua busca para encontrar o esconderijo. Você avança pelos destroços.",
    "escolhas": [
      { "texto": "Estou usando o traje isolante", "destino": "04" },
      { "texto": "Estou sem traje isolante", "destino": "32" }
    ]
  },
  {
    "id": "24",
    "texto": "Você começa a enfiar-se em uma roupa plástica transparente. Quando estiver na atmosfera, o vácuo dentro dela fará com que fique colada ao corpo como se fosse uma segunda pele. As peças do capacete de plástico denso encaixam-se à volta de sua cabeça. O traje é um recente modelo auto-reparável, resistente à corrosão: qualquer abertura vai fechar-se em frações de segundo, protegendo um eventual ferimento contra a atmosfera venenosa. Com este traje você não poderá tornar-se invisível, mas pelo menos não terá que preocupar-se com a água.",
    "escolhas": [
      { "texto": "Descer para o planeta", "destino": "36" }
    ]
  },
  {
    "id": "25",
    "texto": "À medida que você anda, a bocarra de uma enorme caverna revela-se na base de uma montanha. Criaturas como aquelas que você viu antes circulam pelo local - mas, estranhamente, não usam a caverna maior; entram e saem de vários túneis menores que circulam a abertura principal. -Reila - você grita, já que não pode ser ouvido pelos monstros-inseto. - Você está aí? Nenhuma resposta. Sua única certeza é que ela está lá dentro. Mas por onde entrar?",
    "escolhas": [
      { "texto": "Entrar pela caverna maior", "destino": "28" },
      { "texto": "Entrar por um dos túneis menores", "destino": "37" },
      { "texto": "Cavar meu próprio túnel com o laser", "destino": "02" }
    ]
  },
  {
    "id": "26",
    "texto": "Você apenas tem tempo de ativar a refração cutânea. Por pouco não é visto pelas duas gárgulas insectóides. -Ei, vocês dois! - você testa, visando descobrir se eles ouvem rádio. Como não encontra reação alguma, experimenta esgueirar-se pela porta. As criaturas apenas mexem-se um pouco quando você passa. Aliviado, você penetra no aposento e retorna à forma visível.",
    "escolhas": [
      { "texto": "Investigar o aposento", "destino": "29" }
    ]
  },
  {
    "id": "27",
    "texto": "Você espera que sua invisibilidade seja suficiente para penetrar no aposento sem ser notado, agarrar Reila e fugir correndo. Mas descarta essa ideia quando percebe o olhar do dragão-inseto acompanhando seus passos. Ela vê você! Ou então pode intuir sua presença, como faria uma incubadora. O controle de refração cutânea não vai ajudar.",
    "escolhas": [
      { "texto": "Me preparar para lutar", "destino": "14" }
    ]
  },
  {
    "id": "28",
    "texto": "Nenhuma daquelas coisas parece circular pela caverna maior, e a ausência de monstros parece-lhe um ótimo motivo para escolher aquele caminho. Quando não há ninguém à vista, você corre e penetra na escuridão cavernosa. Lá dentro a negritude é quase total. Você usa carga mínima de laser para iluminar o braço e prover alguma luz.",
    "escolhas": [
      { "texto": "Eu estou usando o traje plástico isolante", "destino": "33" },
      { "texto": "Eu não estou usando o traje", "destino": "09" }
    ]
  },
  {
    "id": "29",
    "texto": "Dentro do aposento está algo que você jamais esperou ver fora da Cidade Imperial. Uma metaliana. Incubadora. Você não é perito no assunto, mas a gravidez não parece muito avançada. Mas isso deve acontecer na Cidade Imperial. Não aqui. E um parto prematuro pode acontecer quando uma incubadora sofre qualquer tipo de trauma. Ela move-se no chão onde está caída, e olha direto em seu rosto. Mesmo a invisibilidade seria inútil. -Meu... bebê... -Você e o pequenininho vão ficar numa boa. Quem é você? -Doutora Venny... engenheira-médica... naufragamos aqui... vida nativa... aguardam o parto para levar-me e a meu bebê... -Não podemos ir ainda... havia outros comigo... capitão Keirst... Um olhar na direção da poltrona revela um cadáver. -Doutora Reila... outra engenheira-médica... foi levada por eles... Você ordena a Parsec que projete dois feixes de transporte. O tubo de luz verde desce pelas aberturas no teto, incidindo sobre Venny e o cadáver de Keirst, carregando ambos para o céu. E você, atolado em problemas. Precisa encontrar Reila e salvá-la dessas coisas.",
    "escolhas": [
      { "texto": "Eu matei os guardas monstros (Caminho A)", "destino": "23" },
      { "texto": "Eu matei os guardas monstros (Caminho B)", "destino": "38" },
      { "texto": "Eu matei os guardas monstros (Caminho C)", "destino": "13" },
      { "texto": "Passei por eles invisível, sem enfrentá-los", "destino": "21" }
    ]
  },
  {
    "id": "30",
    "texto": "Você está de volta à câmara de estocagem de alimentos.",
    "escolhas": [
      { "texto": "Entrar no túnel da esquerda", "destino": "22" },
      { "texto": "Entrar no túnel do meio", "destino": "06" },
      { "texto": "Entrar no túnel da direita", "destino": "35" },
      { "texto": "Usar os túneis que levam para fora e abandonar a busca", "destino": "08" }
    ]
  },
  {
    "id": "31",
    "texto": "Cavar túneis cegamente foi uma péssima ideia. Você percebe que não vai chegar a lugar nenhum a tempo. Vá para 20.",
    "escolhas": [
      { "texto": "Desistir da escavação", "destino": "20" }
    ]
  },
  {
    "id": "32",
    "texto": "Apesar de sua invisibilidade, as larvas agitam-se quando você entra. Olhando para baixo, você percebe que está pisando em uma membrana sensível ao toque. Você se vira para sair, só para descobrir uma grade espinhosa bloqueando a passagem. Quando ergue o braço para destruí-la, sente pontadas de dor lancinante atravessando seu corpo. Cai em espasmos. Quando consegue olhar, descobre que a dor foi provocada pelas larvas ou melhor, por seus disparos de ácido concentrado. São centenas, você não é capaz de destruir todas. Só consegue gritar enquanto os vermezinhos famintos tentam devorá-lo; seu único conforto é a dor de barriga que uma refeição de carne metálica certamente causará!",
    "escolhas": []
  },
  {
    "id": "33",
    "texto": "Depois de algum tempo avançando pelo túnel, você acha estranho como o solo é macio. Qualquer coisa viscosa goteja do teto e transforma o chão em um pântano pegajoso. Seu olhar recai casual sobre o próprio braço: buracos estão se abrindo no traje isolante, fechando-se logo em seguida, graças à ação regeneradora do tecido auto-reparador. O que estaria causando isso? Seria...? Sim! Você não está em uma caverna, e sim no tubo digestivo de alguma monstruosa forma de vida. O líquido que cai sobre você é suco gástrico, forte o suficiente para dissolver até mesmo sua carne biometálica. O traje resistiu até agora, mas não vai durar para sempre. Você consegue correr para fora da caverna. Foi salvo pelo traje isolante, mas o banho de ácido clorídrico foi demais para ele: está destruído.",
    "escolhas": [
      { "texto": "Tentar agora um dos túneis menores", "destino": "37" },
      { "texto": "Cavar seu próprio túnel com rajadas laser", "destino": "02" }
    ]
  },
  {
    "id": "34",
    "texto": "Você pede ao computador de bordo uma análise planetária. É demorado e chato, mas pelo menos você saberá onde está pisando. O resultado da análise surge na tela. A composição do planeta é basicamente de silicatos (rocha e areia). Quase nenhum metal. Tais mundos não apresentam chances de existência de vida biometálica, portanto não interessam ao Império. Trentor-1 é absolutamente igual a milhares de outros mundos catalogados.",
    "escolhas": [
      { "texto": "Sair de órbita e seguir para Trentor-2", "destino": "11" },
      { "texto": "Descer até a superfície assim mesmo", "destino": "15" }
    ]
  },
  {
    "id": "35",
    "texto": "O túnel da direita conduz a um estranho aposento. O teto lustroso pisca com milhares de luzes vermelhas, emitidas em feixes finos, como lasers. E são lasers, mas em uma potência baixa demais para provocar danos. Você não consegue deduzir sua utilidade até notar a presença de algumas criaturas operárias na câmara; as luzes em suas cabeças piscam da mesma maneira. Todo esse pisca-pisca está deixando você tonto. Tenta sair, mas tropeça e cai. O bombardeio escarlate prossegue impiedoso, fazendo com que você perceba um forte poder hipnótico nas luzes antes de perder os sentidos... Você desperta sentindo a cabeça rodar. Algo está diferente. Ideias absurdas dançam em sua mente. Surge um nome que você não consegue pronunciar. É o nome daquela raça. Tikktit... Pelo visto, os insectóides usam mesmo laser biológico como forma de comunicação. Tendo recebido parte do ensinamento, talvez você seja capaz de comunicar-se com eles.",
    "escolhas": [
      { "texto": "Voltar para o entroncamento", "destino": "30" }
    ]
  },
  {
    "id": "36",
    "texto": "Sua bionave projeta na direção do planeta um feixe de transporte, um raio de luz sólida e esverdeada com propriedades misteriosas; o feixe recolhe-se, deixando você na superfície de Trentor-1. A paisagem à volta é desoladora. Não parece haver aqui nenhuma forma de vida. -Tem alguém aí? - você pergunta, por brincadeira. Sabe que não receberá resposta. -S-socorro... Seus olhos verde-cobre arregalam-se. Ouviu mesmo uma voz metaliana? Feminina? -Quem disse isso? Quem está aí? -Socorro... ajude... por favor... Ao longe, muito longe, vê algo nas montanhas que parece ser o foco da transmissão. Você corre naquela direção. É uma carcaça metálica discóide, com centenas de metros de diâmetro. O cadáver de uma bionave da Frota. Você entra nos destroços. Logo aproxima-se do compartimento onde a sobrevivente deve estar... e encontra uma grande surpresa. Duas das criaturas mais feias que você já viu. O corpo é quase humanóide. A cabeça lembra vagamente a dos metalianos. Parecem revestidos de areia. Eles prostram-se nos lados da porta como gárgulas. Estão imóveis, bem camuflados nos destroços: por pouco você não deixa de notá-los.",
    "escolhas": [
      { "texto": "Estou usando o traje isolante", "destino": "03" },
      { "texto": "Estou invisível, sem o traje", "destino": "26" }
    ]
  },
  {
    "id": "37",
    "texto": "Você evita a abertura maior. Estuda por algum tempo como as coisas-inseto percorrem os túneis. Quando acha seguro, aproxima-se de uma das passagens e entra. Uma suave luminescência é irradiada das paredes, provendo iluminação suficiente.",
    "escolhas": [
      { "texto": "Estou usando o traje isolante", "destino": "12" },
      { "texto": "Estou sem traje", "destino": "19" }
    ]
  },
  {
    "id": "38",
    "texto": "Após vasculhar o local, você decide que o melhor é sair antes de ser descoberto novamente. Vá para 8.",
    "escolhas": [
      { "texto": "Sair", "destino": "08" }
    ]
  },
  {
    "id": "39",
    "texto": "Ainda na Academia de Exploração Espacial, você recebeu treinamento para dominar o controle de refração cutânea. Através de concentração, pode mudar o índice de refração de sua pele e realizar a torção seletiva da luz, tornando-se invisível. Um talento muito útil para um explorador espacial. Você opta por não abrir mão dessa vantagem, e resolve descer tendo como proteção apenas a pele prateada que a Mãe Galáxia lhe deu.",
    "escolhas": [
      { "texto": "Descer ao planeta", "destino": "36" }
    ]
  },
  {
    "id": "40",
    "texto": "Quando você se prepara para uma luta que não pode vencer, luzes pulsam na cabeça do dragão-inseto e assumem um significado espantosamente claro. A sessão de hipnose na sala piscante preparou seu cérebro para receber aquelas sequências luminosas. Você entende 'tikktitês'. -Quem é você, intruso? Ameace minha família, e receberá uma morte horrível. Você deseja responder. Uma ideia luminosa vem à sua cabeça: ora, eles se comunicam por biolaser, e você TEM um biolaser! Você ergue o braço e faz com que pisque. -Capitão Daion Dairax, madame. Vim buscar minha irmãzinha aqui, sequestrada por seus soldados. -Não culpe meus filhos. Eles não sequestraram a fêmea de prata. Apenas encontraram algo que não entenderam, e trouxeram até mim. A outra estava sendo mantida sob guarda até que sua gravidez findasse. -Ah, qual é? Seus filhinhos teriam me feito em trocentos pedaços se tivessem chance. -E com razão. Você raptou alguém cuja proteção havia sido ordenada por mim. Você invadiu nossa colônia. Não tentou comunicar-se. Nas circunstâncias, as mentes deles reagiram da melhor forma. -Ela não é presa. Não é tikktit. O lugar dela é entre os seus, e não aqui. Você recolhe Reila da piscina de gel. Não sabe onde enfiar a cara, você deixou-se influenciar pela apreensão da incubadora Venny, vendo monstros onde eles não existiam. -Ha... desculpe qualquer coisa, tá bem. -Também peço desculpas. Meus filhos não foram abençoados com a dádiva da inteligência, como você e eu. Nada disso teria acontecido se eles soubessem pensar. São apenas animais sem orientação e a condição deles me magoa. -Não será assim para sempre. Seus filhos vão mudar. Vão evoluir. -Por que diz isso? - pisca a rainha-mãe. -Ah, nós também éramos assim no passado. Não sabíamos pensar, apenas cumpríamos ordens. As luzes da rainha-mãe tikktit cintilam satisfeitas. -Você deu-me esperança, Daion Dairax. Você joga Reila sobre o ombro, lembrando-se que há uma incubadora nervosa a bordo de sua nave. Alcançando o air livre, chama Parsec e pede um feixe de transporte. Logo está a muitos milhões de quilômetros de Trentor-1. É... apesar de tudo, as coisas terminaram bem. Os tikktit vão se tornar uma civilização muito semelhante à metaliana, com cidadãos leais servindo sua rainha. Nada mau para um 'tolo irresponsável', não é mesmo?",
    "escolhas": []
  }
];
