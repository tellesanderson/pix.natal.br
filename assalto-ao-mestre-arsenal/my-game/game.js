export const credits = {
  title: "Assalto ao Mestre Arsenal",
  author: "Anderson Telles",
  description: "Jogue como um ladrão invadindo a torre do temido Mestre Arsenal em busca de artefatos mágicos para obter o controle da Guilda de Ladrões."
};

export const textNodes = [
  {
    "id": "intro",
    "texto": "Seu nome é Andrus, \"o Aranha\", um renomado ladrão profissional. Depois de de uma vida errante de aventuras e grandes assaltos, você decidiu estabelecer-se na metrópole de Kristophania-um lugar calmo para pessoas de seu ramo. Você associa-se à Guilda de Ladrões local, uma espécie de sindicato do crime, que detém o monopólio das atividades criminais na cidade. Associar-se à Guilda traz muitas vantagens; garante informações valiosas e proteção contra a polícia em troca de uma porcentagem do produto dos assaltos, sem falar que todos os ladrões agindo fora da guilda são caçados tanto pela polícia como por outros ladrões! Participar da Guilda, contudo, está mostrando-se mais tedioso do que esperava. Acabaram-se os desafios, as coisas estão fáceis demais. Você chegou mesmo a realizar alguns assaltos \"não-autorizados\", enriquecendo seu tesouro pessoal sem que a diretoria da Guilda ficasse sabendo. Talvez seja hora de almejar planos mais elevados: a chefia da Guilda! Sim, essa poderia ser uma coroação digna de sua carreira. Mas como? O chefão atual é fraco e descuidado mas mesmo você não se atreveria a enfrentar seus guarda-costas, assassinos mais perigosos que muitos guardas do palácio do Rei. Seria loucura tentar isso sem... mágica. Mágica... isso the recorda algo sobre suas antigas aventuras, quando você atuava na companhia de um grupo de heróis: um bárbaro com um grifo, um monge mascarado, uma donzela gladiadora, um anão malcheiroso e outros tipos bem estranhos, mas ótimos quando músculos se faziam necessários. Naquela época vocês invadiram a fortaleza do vilão conhecido como Mestre Arsenal-un famigerado colecionador de armas e armaduras mágicas. Lá você conseguiu a capa mágica que rendeu-the seu apelido: a capa permite ao usuário subir pelas paredes como uma aranha, e disparar teias pelas mãos. Um artefato útil em sua atividade, sem dúvida, mas que não ajudaria muito na conquista da chefia da Guilda. Talvez seja hora de fazer outra visita ao velho Arsenal... Comece lendo o trecho 1.",
    "escolhas": [
      { "texto": "Iniciar Aventura", "destino": "01" }
    ]
  },
  {
    "id": "01",
    "texto": "Decidido a penetrar no castelo de de Arsenal, você reúne suas \"ferramentas\" de ladrão: as fiéis gazuas para forçar fechaduras, a lanterna feita com uma pedra iluminada por magia, e a adaga que já cortou tantas gargantas. Cordas e ganchos de escalada não são necessários há muito tempo afinal, você é o Aranha! Há ainda um último \"equipamento\" que você gostaria de ter consigo. e custará apenas algumas canecas de cerveja: indo ao setor de animais treinados da Guilda, você \"convence\" o adestrador a emprestar-lhe um de seus macacos bichinhos muito úteis para bater carteiras ou penetrar em lugares protegidos para destrancar portas por dentro. Agora, com o mico sobre seu ombro, você acredita estar pronto para o desafio. Pronto? Bem. talvez nem tanto. Quando invadiram o castelo de Arsenal, você contava com a ajuda de magos poderosos e guerreiros embrutecidos para enfrentar o vilão. Ir sozinho seria uma grande imprudência. Quem poderia ajudá-lo? Há tempos não tem notícias de seus antigos colegas, mas... ainda resta na cidade alguém do grupo original. Parx Methralian, um sacerdote dos Deuses da Trapaça. Por trás da aparência inofensiva de clérigo, era um assaltante quase tão habilidoso quanto você e seus poderes mágicos ajudariam bastante. Se você deseja convidar Parx para participar do roubo, vá para 24. Se não confia no clérigo trapaceiro e prefere agir sozinho, vá para 37.",
    "escolhas": [
      { "texto": "Convidar Parx para participar do roubo", "destino": "24" },
      { "texto": "Agir sozinho", "destino": "37" }
    ]
  },
  {
    "id": "02",
    "texto": "Vocês seguem viagem sem maiores incidentes. Então, por entre as montanhas, surge a torre que serve de habitação ao colecionador de armas mágicas. Você recorda a apavorante experiência de lutar com seus guardas zumbis, que caíram facilmente diante da investida dos heróis. Desta vez, contudo, vocês não contam com bárbaros e gladiadores musculosos in seu time. A situação requer uma aproximação mais furtiva. Parx sugere um plano; vocês podem disfarçar-se e entrar no castelo para verificar o interior, antes de realizar o assalto. Você acha arriscado demais, e prefere esperar o cair da noite para a invasão. Se quiser seguir o conselho de Parx, vá para 32. Prefere usar sua estratégia costumeira, protegido pela escuridão? Vá para 26.",
    "escolhas": [
      { "texto": "Seguir o conselho de Parx e disfarçar-se", "destino": "32" },
      { "texto": "Esperar o cair da noite (estratégia costumeira)", "destino": "26" }
    ]
  },
  {
    "id": "03",
    "texto": "A estatueta é de ouro, com quase trinta centímetros de altura. É belíssima, representando as formas delicadas de uma fada com precisão impecável. Pasmo, você reconhece no pedestal a assinatura do mestre escultor elfo Lorens Lorian. Se for um trabalho original, vale uma fortuna; e, se for uma falsificação, você gostaria de conhecer esse gênio da arte e contratá-lo para a Guilda. Você coloca a estatueta na mochila. Se ainda não investigou o cetro e quer fazê-lo agora, vá para 8. Se prefere abandonar a sala, vá para 20.",
    "escolhas": [
      { "texto": "Investigar o cetro", "destino": "08" },
      { "texto": "Abandonar a sala", "destino": "20" }
    ]
  },
  {
    "id": "04",
    "texto": "Por mais tentadora que seja a idéia de voltar aos velhos tempos, a prudência recomenda que deixem o viajante seguir. Afinal, ele usa armadura da guarda real de Thormy e você já teve encrencas com aquele rei. Vocês passam pelo cavaleiro murmurando cumprimentos e cobrindo os rostos. Quando ele está longe, Parx avisa que desperdiçar essa chance vai desagradar os deuses mas você prefere contrariar a fé de Parx a enfrentar os exércitos do rei Thormy. Vá para 2.",
    "escolhas": [
      { "texto": "Seguir viagem", "destino": "02" }
    ]
  },
  {
    "id": "05",
    "texto": "Escutando com atenção, você abre a porta no instante em que o cão está trotando no sentido oposto ao de vocês. Ele é ainda maior do que você pensava, e por pouco a surpresa não trai seus movimentos; com os gestos apropriados, você estende as mãos e invoca o poder da capa: uma massa de fios pegajosos dispara de seus dedos, indo grudar nas paredes do corredor e prendendo o cão no meio dela. Você acha estranho como o cão não late. Então, quando a luta parece vencida, o horror salta a seus olhos: a pele putrefata do animal começa a descolar-se da carne, livrando-o da teia. Ele estará livre em segundos. -Um morto-vivo!-diz Parx. Arsenal invocou um cão zumbi para proteger sua torre. Agora que o clérigo conhece a real natureza da ameaça, pode agir de acordo: ele empunha seu símbolo sagrado, mostrando-e à criatura, que parece apavorar-se com esse gesto. Sem som, o monstro debate-se na teia e tenta fugir. Sua carne começa a fumegar, sua pele esfarela em cinzas... e logo a abominação cadavérica deixa de existir. Bendito seja o poder dos deuses de Parx, você pensa, Vocês tiveram sorte até agora. Não fizeram nenhum barulho que pudesse chamar a atenção de Arsenal, já que o cão era um morto-vivo criaturas naturalmente silenciosas. Só produziu ruído suficiente para que você escutasse através da porta. Há uma porta no lado oposto do corredor, e vocês atravessam os restos de teia e cinzas para chegar até ela. É uma grande e sólida porta metálica. Pode conter armadilhas, de modo que seria melhor dar uma checada- mas, em compensação, o ruído das ferramentas poderia denunciá-los. Você deve decidir qual risco tomar: Se quer procurar armadilhas, vá para 39. Se quiser ignorar armadilhas e apenas abrir a porta, 30.",
    "escolhas": [
      { "texto": "Procurar armadilhas na porta", "destino": "39" },
      { "texto": "Ignorar armadilhas e apenas abrir a porta", "destino": "30" }
    ]
  },
  {
    "id": "06",
    "texto": "Vocês se decidem pelo caminho da direita. O corredor segue alguns metros, vira novamente à direita e termina em uma porta de madeira. Uma porta bem simples, que não admite a presença de armadilhas, de modo que você descarta essa hipótese. Uma olhada no ferrolho revela que está trancada. Se quiser dar uma escutadela na porta antes de tentar arrombá-la, leia o 25. Se quiser voltar e pegar o caminho da esquerda, vá para 34. Se quiser poupar tempo e meter o pé na porta, vá para 31.",
    "escolhas": [
      { "texto": "Escutar atrás da porta", "destino": "25" },
      { "texto": "Voltar e pegar o caminho da esquerda", "destino": "34" },
      { "texto": "Meter o pé na porta", "destino": "31" }
    ]
  },
  {
    "id": "07",
    "texto": "Arsenal é recluso, mas dificilmente resistiria a uma conversa com negociantes de objetos mágicos. Ocultos sob seus disfarces, vocês aproximam-se da torre e batem à porta. São recebidos por um \"mordomo\" bem peculiar: parece um guerreiro usando uma couraça completa-mas um olhar atento revela que não existe ninguém por trás das fendas do elmo. - Quem deseja falar com meu senhor? - diz a armadura vazia, com arrepiante voz metálica. - Ouvimos falar da magnífica coleção de Arsenal-você declara - e viemos negociar artefatos com ele. Por um instante a armadura fica inerte, como se pensar fosse um esforço grande demais. Então ela coloca-se de lado e, com um gesto, convida-os a entrar. - Meu senhor irá recebê-los. Vocês são instruídos a aguardar em um saguão de entrada, luxuosamente decorado-um contraste violento com o desgaste das paredes externas. Há várias armaduras perfiladas junto às paredes (inanimadas, você espera) e uma grande lareira ao norte. Então um arrepio pavoroso percorre seus ossos: sobre a lareira você reconhece um tridente mágico, aquele que havia sido levado por Silvius Marithimus, um gladiador que fazia parte do grupo original de heróis. Se Arsenal recuperou o tridente, então... Silvius está morto! Seus ouvidos percebem passos pesados descendo uma escada próxima. Em repentino desespero, você olha para a própria capa mágica e para o cajado de Parx: por certo Arsenal irá reconhecer seus pertences roubados! - Vamos cair fora daqui - você diz a Parx, enquanto corre para a porta. Movidos por pura adrenalina, vocês conseguem abrir a pesada porta e sumir nas montanhas. Escondidos entre as rochas, ficam aliviados quando percebem que não foram seguidos mas agora será duas vezes mais perigoso penetrar na torre, pois Arsenal estará desconfiado. Isso ensina você a escutar Parx e suas idéias idiotas! Enquanto espera a noite cair, vá para 26.",
    "escolhas": [
      { "texto": "Esperar a noite cair", "destino": "26" }
    ]
  },
  {
    "id": "08",
    "texto": "O cetro está na parede, suspenso na horizontal por dois suportes, como as demais armas. Olhando mais de perto, você percebe que o cristal está preso por uma peça metálica em forma de mão. - É uma arma mágica - avisa Parx, ainda em sua forma de macaco. Já vi magos utilizando cajados assim para lançar relâmpagos. Mas acautele-se antes de tocá-lo, amigo Andrus: o cajado pode ser uma arma formidável nas mãos da pessoa certa, mas pode matar a pessoa errada. - Como assim? - É como o cão influenciado pela personalidade do dono. Se o construtor desta arma era maligno, uma pessoa bondosa não poderá tocá-la sem sofrer dano, se era bom, queimará as mãos de uma pessoa má. Você nunca considerou a si mesmo bom ou mau são apenas estados de espírito. Além disso, não há como saber qual seria a tendência moral do fabricante da arma. Se quiser correr o risco e tocar o cajado, vá para 11. Se ainda não investigou a estatueta e quer fazê-lo agora, vá para 3. Se quer sair da sala sem tocar em mais nada, vá para 20.",
    "escolhas": [
      { "texto": "Correr o risco e tocar o cajado", "destino": "11" },
      { "texto": "Investigar a estatueta", "destino": "03" },
      { "texto": "Sair da sala", "destino": "20" }
    ]
  },
  {
    "id": "09",
    "texto": "Você saca suas ferramentas e tenta forçar a fechadura, mas de nada adianta: ela é de excelente qualidade, à prova de arrombadores, e mesmo sua técnica mostra-se inútil. Depois de mais alguns minutos de tentativas, você desiste. Agora só resta pegar o corredor da direita. Vá para 6.",
    "escolhas": [
      { "texto": "Pegar o corredor da direita", "destino": "06" }
    ]
  },
  {
    "id": "10",
    "texto": "Depois de comprar uma carroça e dois bons cavalos (usando disfarces para não deixar pistas, claro), vocês partem para as montanhas onde a fortaleza de Arsenal está escondida. O caminho é complicado, e jamais conseguiriam encontrá-lo se já não tivessem estado lá antes. Então, uma surpresa: pela estrada que singra as montanhas, in sentido contrário, surge um viajante. Um cavaleiro de armadura, sobre o dorso de um majestoso cavalo branco. Suas vestes são luxuosas, e fazem com que você e Parx troquem olhares de soslaio. - O amigo Andrus gostaria de fazer uma oferenda aos Deuses da Trapaça? - propõe Parx. Apesar de seus poderes, Parx às vezes age como criança: assaltar ou matar esse cavaleiro seria um ato que chegaria aos ouvidos da Guilda. e isso seria considerado traição. Um risco elevado. Mas, por outro lado, suas jóias parecem muito valiosas... Se você aceita o convite de Parx para um assalto, vá para 21. Se prefere deixar o homem seguir em paz, vá para 4.",
    "escolhas": [
      { "texto": "Aceitar o convite para um assalto", "destino": "21" },
      { "texto": "Deixar o homem seguir em paz", "destino": "04" }
    ]
  },
  {
    "id": "11",
    "texto": "Uma arma capaz de disparar relâmpagos... com ela você poderia fulminar a diretoria da Guilda, e facilmente assumir seu lugar. É exatamente o que procurava. Sua mão aproxima-se do cetro, vacila um pouco... e fecha-se à volta dele. Seus dedos parecem dormentes, mas pode ser apenas o nervosismo. Abrindo os olhos, para seu horror, você vê faíscas azuis crepitando sobre seu pulso. Elas ficam maiores e maiores, queimando os pêlos de seu braço, deixando manchas negras na pele, calcinando sua carne... e matando você. Diante do punhado de carvão que havia se chamado Andrus, o Aranha, Parx meneia a cabeça e lamenta: - Sinto muito, amigo Andrus. Os Deuses da Trapaça não estavam com você. Uma pena. E o macaquinho foge pela janela, de volta à cidade.",
    "escolhas": []
  },
  {
    "id": "12",
    "texto": "Você imagina que uma proposta de adesão à Guilda dos Ladrões possa interessar a Arsenal. Não haveria problemas em apresentar-se como membro da Guilda, porque você o é de fato. Claro que a atual diretoria não sabe que Arsenal está sendo convidado, mas isso não será problema quando você tornar-se chefe. Ocultos sob seus disfarces, vocês aproximam-se da torre e batem à porta. São recebidos por um \"mordomo\" bem peculiar parece um guerreiro usando uma couraça completa mas um olhar atento revela que não existe ninguém por trás das fendas do elmo. - Quem deseja falar com meu senhor? - diz a armadura vazia, com arrepiante voz metálica. Você usa sua lábia para tentar convencer aquela coisa de que tem uma proposta interessante para seu patrão, ao mesmo tempo em que tenta espiar o interior. Parece que pouco mudou desde sua última visita: há novas armaduras perfiladas junto às paredes, e uma lareira ao norte. - Meu senhor não negocia com ladrões - diz a armadura, encerrando a conversa e levando a mão à espada na cintura. Vocês fogem correndo e, aliviados, percebem que o guarda de Arsenal não os perseguiu; apenas fechou a porta novamente. - Você e seus disfarces idiotas! - você reclama. - Agora Arsenal sabe que há ladrões rondando seu castelo. Vamos precisar de cuidado redobrado. - Não olhe pra mim. Foi sua essa idéia nada sábia de convidar Arsenal para a Guilda. Resmungando, você espera o anoitecer. Vá para 26.",
    "escolhas": [
      { "texto": "Esperar o anoitecer", "destino": "26" }
    ]
  },
  {
    "id": "13",
    "texto": "Você cria coragem e puxa a tocha. Ela move-se feito alavanca, e a parede começa a se mover, revelando uma porta secreta que dá acesso ao porão da torre. Vocês sobem as escadas sorrateiramente, e chegam ao andar térreo. Atravessam o saguão de entrada e alcançam mais escadas, rumando para o pavimento superior, de onde vieram. Logo alcançam a sala principal da coleção de Arsenal. Desta vez tomando cuidado para evitar o tapete traiçoeiro, vocês examinam a coleção. Descobrem sua capa e o cajado de Parx, tratam de pegá-los de volta, e começam a procurar o que vieram buscar. Mas não têm chance de procurar por muito tempo. A porta explode em lascas, e por trás dela surge Mestre Arsenal-desta vez armado com seu destruidor martelo de guerra. -Malditos ladrões! - ele grita furioso, rodopiando a arma. - Vocês querem minhas armas. Todos querem minhas armas. Mas não vou permitir que me roubem novamente. Eu terei todas as armas mágicas do mundo! Desta vez o homem está mesmo possesso! Arsenal avança disposto a esmagar vocês dois, e a espada que você tem em mãos não será nada contra sua armadura encantada. Você olha à volta, desesperado para encontrar algo que possa usar contra ele. Três objetos estão ao seu alcance: Uma espada recurvada dos salteadores do deserto. Se quiser pegá-la, vá para 15. Uma lança prateada, com dragões esculpidos no cabo. Se quiser agarrá-la, vá para 19. Um elmo dourado com a forma de uma concha. Se quiser colocá-lo, vá para 27. Um colar de contas vermelhas. Para pegá-lo, vá para 33.",
    "escolhas": [
      { "texto": "Pegar a espada recurvada", "destino": "15" },
      { "texto": "Agarrar a lança prateada", "destino": "19" },
      { "texto": "Colocar o elmo dourado", "destino": "27" },
      { "texto": "Pegar o colar de contas vermelhas", "destino": "33" }
    ]
  },
  {
    "id": "14",
    "texto": "Depois de procurar um pouco, você chega à conclusão de que não há armadilhas na porta. Se quiser tentar abri-la, vá para 28. Se quiser tentar o outro corredor, vá para 6.",
    "escolhas": [
      { "texto": "Tentar abrir a porta", "destino": "28" },
      { "texto": "Tentar o outro corredor", "destino": "06" }
    ]
  },
  {
    "id": "15",
    "texto": "Agarrando a espada, você descobre que sua lâmina desprende faíscas quando corta o ar. É uma arma mágica poderosa, e você poderia derrotar muitos inimigos com ela mas não Mestre Arsenal. Em segundos você e Parx são reduzidos a dois punhados de carne moída...",
    "escolhas": []
  },
  {
    "id": "16",
    "texto": "Pelo que você se lembra da disposição dos quartos na torre de Arsenal, aquela porta deve levar a um corredor. Colando à madeira seu ouvido treinado, você tenta perceber os sons do outro lado. A princípio o silêncio parece total, mas logo percebe um familiar clique-clique que só poderia ser o roçar de garras sobre pedra: há um cão de guarda no outro lado. E bem grande. Será questão de tempo até que o animal ouça ou fareje vocês. Precisam dar um jeito nele o quanto antes. - Posso solicitar aos deuses que lancem sobre a fera um feitiço paralisante - sussurra Parx. É uma boa idéia, mas você tem seus próprios métodos para imobilizar os inimigos: a magia de sua capa permite que você dispare pelas mãos uma teia mágica, com fios viscosos que prenderão o mais forte guerreiro. Se quiser deixar a tarefa para Parx, vá para 38. Se quiser usar seu próprio poder, vá para 5.",
    "escolhas": [
      { "texto": "Deixar a tarefa para Parx", "destino": "38" },
      { "texto": "Usar o poder da capa (teia mágica)", "destino": "05" }
    ]
  },
  {
    "id": "17",
    "texto": "Sua mão desliza na direção do cabo da adaga. No exato momento em que ia tocá-la, um punho fecha-se veloz sobre seu pulso e aperta com a força de um gigante. -Ah, larápio! - esbraveja o cavaleiro, enquanto desembainha a espada com a mão livre. - Agora percebo, sua descrição combina com a do famigerado Aranha. Pagará por seus crimes, bandido. A lâmina desce com força, e você sucumbe à explosão de dor. Só volta a abrir os olhos no dia seguinte, e descobre-se em um acampamento, aquecido por uma fogueira. Parx está ao seu lado, entoando as preces de cura que você viu-o usar tantas vezes. - Que aconteceu? - você consegue dizer. -Você abusou da providência dos deuses, foi o que aconteceu. Meu cajado esmigalhou o crânio do ignóbil pecador antes que o pior acontecesse, mas o estrago já está feito. Acho que é o fim de seus dias como o Aranha, velho amigo. - De que você está falando...? Você entende a terrível verdade quando tenta segurar o braço de Parx- e descobre um toco enrolado em ataduras onde antes havia uma mão. Sim, sua carreira está mesmo terminada...",
    "escolhas": []
  },
  {
    "id": "18",
    "texto": "Você acha mais prudente não abusar da sorte tentando roubar a adaga. Pode ser que desta vez ele perceba. Afastando-se com discrição, você deixa que Parx continue distraindo o cavaleiro até que ele resolva partir. Quando ele está longe, você investiga o conteúdo da bolsa, um generoso punhado de peças de ouro, uma pérola valiosa, e um pergaminho com o selo real contendo ordens do rei Thormy para que \"o Aranha\" seja capturado vivo ou morto (preferencialmente morto). Você gargalha, imaginando os problemas que o cavaleiro terá se propor às autoridades de Kristophania uma caçada ao Aranha, sem aquele documento. Parx aceita as moedas como \"donativo para os deuses\", e você fica com a pérola. Vá para 2.",
    "escolhas": [
      { "texto": "Prosseguir viagem", "destino": "02" }
    ]
  },
  {
    "id": "19",
    "texto": "A lança, infelizmente, não foi uma escolha sábia: é uma arma mágica especialmente criada para matar dragões, e mostra-se desajeitada contra Arsenal. Ele vence a luta, e esmaga vocês com seu martelo...",
    "escolhas": []
  },
  {
    "id": "20",
    "texto": "Você volta sua atenção para a única porta do aposento. perguntando-se o que haverá além dela. Se você quiser colar o ouvido à porta e escutar, vá para 16. Se acha que pode haver uma armadilha na porta, vá para 29.",
    "escolhas": [
      { "texto": "Colar o ouvido à porta e escutar", "destino": "16" },
      { "texto": "Procurar armadilhas na porta", "destino": "29" }
    ]
  },
  {
    "id": "21",
    "texto": "Vocês descem da carroça para falar com o homem. Agora reparam que sua armadura o identifica como oficial da guarda real. - Que os deuses o abençoem, viajante - cumprimenta Parx. - O que faz um oficial real tão distante do palácio? - Salve, sacerdote - responde ele, que sem dúvida teria uma reação diferente se reconhecesse os Deuses da Trapaça no medalhão usado por Parx. - Venho à procura de um famigerado gatuno, procurado por invadir o quarto da bela princesa Rhana. O rei Thormy oferece uma grande recompensa por informações sobre o vilão. Por acaso conhece a criatura pérfida conhecida como \"o Aranha\"? - Nunca ouvi falar de tal facínora - diz Parx, lutando para disfarçar o sorriso, enquanto você se recorda da agradável visão da princesa em seus transparentes trajes noturnos. Foi há bastante tempo; pelo visto, o rei Thormy ainda estava zangado. A conversa entre Parx e o cavaleiro prossegue, enquanto a bolsa de moedas do oficial desliza com facilidade para o interior de sua capa. Então você nota no cinto dele uma adaga cravejada de jóias, e com símbolos estranhos gravados na bainha: talvez seja mágica! Valeria o risco de uma segunda tentativa? Se quiser roubar a adaga, vá para 17. Se está satisfeito com a bolsa de moedas, vá para 18.",
    "escolhas": [
      { "texto": "Tentar roubar a adaga", "destino": "17" },
      { "texto": "Contentar-se com as moedas da bolsa", "destino": "18" }
    ]
  },
  {
    "id": "22",
    "texto": "Convencido de que não há ninguém no aposento, você começa a trabalhar com suas ferramentas. Mas não consegue dedicar-se à fechadura por muito tempo: a porta abre-se de repente - pelo lado de dentro! Infelizmente, seus ouvidos o traíram. Havia alguém no aposento, um zumbi descarnado que aguardava ordens de seu mestre. O silêncio dos mortos-vivos enganou-o, e você paga com a vida quando as garras do monstro enterram-se em sua garganta antes que Parx consiga esconjurá-lo...",
    "escolhas": []
  },
  {
    "id": "23",
    "texto": "Abrindo a porta, vocês entram in uma pequena sala vazia, com outra porta na parede oposta exatamente igual à anterior, mas desta vez destrancada. A nova porta conduz a um corredor que segue em frente até terminar em uma parede, com uma tocha sobre um suporte. Aparentemente não há saída deste pequeno labirinto. Ou há? Tochas costumam servir de alavancas para salas secretas-mas também podem ativar armadilhas para espertinhos que pensarem nisso. Se quiser mexer na tocha, vá para 13. Se acha melhor procurar armadilhas antes de mexer na tocha, vá para 36.",
    "escolhas": [
      { "texto": "Puxar a tocha", "destino": "13" },
      { "texto": "Procurar armadilhas na tocha", "destino": "36" }
    ]
  },
  {
    "id": "24",
    "texto": "Você ruma para o templo escondido onde Parx realiza seus cultos ao Deuses da Trapaça, certo de que vai encontrá-lo tentando convencer seus seguidores a livrarem-se dos \"bens materiais\", doando-os à igreja. Chegando lá, contudo, não encontra ninguém. - Procurando por mim, Andrus? - diz uma voz sobre seu ombro. Você vira-se veloz, e descobre o clérigo bem atrás de você. Como o maldito era matreiro! Apenas um ladrão muito experiente podia aproximar-se daquele jeito, pelas costas, de um outro ladrão. Você olha para seu cajado de aparência inofensiva, mas sabe que é só aparência mesmo: também foi roubado da coleção de Arsenal, e é uma arma mágica poderosa-podendo transformar-se in uma destruidora maça de duas mãos. Você já viu-a em ação, transformando crânios de ogres em purê. Você explica seus planos a Parx. Ele sorri e afaga o símbolo sagrado, dizendo: - Certamente os deuses vão nos ajudar nessa empreitada, amigo Andrus. Mas tenho plena certeza de que a ajuda seria maior se o futuro chefe da Guilda fizesse certos votos de devoção à causa da Trapaça... Entendendo o que o matreiro Parx tenta dizer, você garante que o culto de Parx ganhará um novo templo e maiores contribuições da Guilda quando a chefia mudar de mãos. Ele aceita o trato e vocês partem em viagem. Então você percebe que seu mico fugiu. Que diabos! Sob os efeitos da cerveja, o maldito adestrador deve ter escolhido um animal ainda sem treinamento. Você saberá o que fazer com ele quando tornar-se o chefe. Mas, pensando bem, talvez o macaco não tenha fugido. Uma possibilidade atravessa sua mente, mas é tão assustadora que você acha melhor nem pensar nela. Vá para 10.",
    "escolhas": [
      { "texto": "Partir em viagem", "destino": "10" }
    ]
  },
  {
    "id": "25",
    "texto": "No estilo dos ladrões, você aproxima o ouvido da porta e concentra-se. Não consegue ouvir absolutamente nada. Você não tem dúvidas de que o aposento está vazio. Se quer forçar a fechadura com suas ferramentas, vá para 22. Se quiser voltar e pegar o caminho da esquerda, vá para 34.",
    "escolhas": [
      { "texto": "Forçar a fechadura com ferramentas", "destino": "22" },
      { "texto": "Pegar o caminho da esquerda", "destino": "34" }
    ]
  },
  {
    "id": "26",
    "texto": "Ocultos entre as rochas, vocês esperam a chegada da noite. Com a perícia dos ladrões, protegidos pela escuridão, aproximam-se da torre de Arsenal. Decidem que a melhor maneira de entrar é por uma das janelas do segundo pavimento. Você vai primeiro. A capa mágica permite que suas mãos e pés grudem à pedra, e você escala como se fosse uma aranha. Parx faz uso de seu próprio e incomum método de escalada, transformando-se em macaco e subindo facilmente pela parede. Chegando à janela, vocês se desanimam ao descobrir que é protegida por grossas barras de ferro: seria necessária a força de um poderoso guerreiro para dobrá-las. Ou magia. - E então, Parx? Tem aí algum feitiço que possa ajudar? - Não sou um mago, amigo Andrus - retruca o macaquinho. - Meus poderes são um presente dos deuses por minha devoção. Mas sim, creio que posso ajudar... É engraçado ver o mico unindo as mãos e rezando, até que o resultado de suas preces comece a surgir: as barras brilham com uma luz fantasmagórica, e você assiste o metal se desmanchar diante de seus olhos! - Como fez isso? - você pergunta. - Nada fiz, amigo. Foram os deuses que, a meu pedido, envelheceram as grades mil anos. Contente por ter aquele clérigo do seu lado, você entra no aposento, Tira da mochila sua pequena pedra mágica luminosa, que lhe serve de lanterna, e dirige seu facho à volta: parece que parte da coleção de Arsenal está guardada aqui. As paredes estão forradas com lanças, alabardas, tridentes e outras armas de grande porte. Devem ser destruidoras nas mãos de um guerreiro, mas não interessam a você ou a Parx. Procurando algo que valha a pena levar, sua atenção volta-se para dois objetos: Uma estatueta metálica sobre uma mesinha, no canto do quarto e um cetro, suspenso na parede, tendo em sua ponta um cristal transparente. O que você pretende fazer?",
    "escolhas": [
      { "texto": "Pegar a estatueta", "destino": "03" },
      { "texto": "Pegar o cetro", "destino": "08" },
      { "texto": "Deixar tudo onde está e prosseguir", "destino": "20" }
    ]
  },
  {
    "id": "27",
    "texto": "Você coloca o elmo, e nada acontece. Esse elmo seria bem útil debaixo d'água, pois sua magia permite ao usuário respirar como se fosse um peixe-mas de nada adianta agora. Serve apenas para que Arsenal esmague suas pernas com o martelo, esperando poupar o precioso elmo...",
    "escolhas": []
  },
  {
    "id": "28",
    "texto": "Aporta está bem trancada. Se quiser usar suas ferramentas para destrancá-la, vá para 9. Se quiser tentar o outro corredor, vá para 6.",
    "escolhas": [
      { "texto": "Usar ferramentas para destrancá-la", "destino": "09" },
      { "texto": "Tentar o outro corredor", "destino": "06" }
    ]
  },
  {
    "id": "29",
    "texto": "Você examina a fechadura e começa a cutucá-la com seu estojo de ferramentas. Ao seu lado, Parx retorna à forma humana com um desabafo: - Não acredito em meus olhos! Por onde anda sua antiga astúcia, amigo Andrus? Por que está procurando armadilhas no lado de dentro de uma porta? Francamente... Irritado com sua momentânea incompetência para o ramo, Parx avança e mete o pé na porta, escancarando-a, sem preocupar-se com o que há no outro lado. E logo se arrepende. A porta leva para um corredor, que a princípio parece vazio. Apenas a princípio, porque da escuridão surge um cão enorme, um mastim realmente assustador, com presas demoníacas curvando-se para fora da boca. Um cão estranhamente silencioso. Você saca o punhal e prepara-se para a luta, mas... seria sua imaginação, ou as costelas da criatura estavam expostas? Infelizmente, não era imaginação. Aquilo não era um cão de guarda comum, mas sim um cadáver animado certamente invocado por Arsenal para proteger sua torre nesta noite tão suspeita. Despreparados para uma batalha contra um morto-vivo, você e Parx não conseguem sobreviver ao toque pestilento das garras da fera...",
    "escolhas": []
  },
  {
    "id": "30",
    "texto": "Decidindo que as ferramentas para procurar armadilhas fariam barulho demais, você resolve arriscar. Segura a maça- neta, prende a respiração e começa a puxar a porta. Um calafrio percorre suas costas quando você vê um arame esticando-se da porta ao batente, e ouve um \"clique\". Você e Parx nem têm tempo de gritar quando dúzias de lanças mergulham do teto, perfurando seus corpos...",
    "escolhas": []
  },
  {
    "id": "31",
    "texto": "Cansado de sutilezas, você se arma com a espada que pegou dos guardas e derruba a porta com um chute. A visão do interior é aterradora: um cadáver ossudo que parece jogado em um canto olha para você e levanta-se, avançando para lutar. Parx segura seu medalhão e prepara-se para esconjurar a criatura, mas você o detém: está farto desses monstros, e quer destruir pelo menos um deles com as próprias mãos. Veloz em suas mãos, a espada decepa a cabeça do morto-vivo, e depois um braço, e outro... até que restem apenas pedaços. Você examina a sala em busca de algo importante, e encontra: uma chave pendurada na parede oposta. Com certeza o zumbi estava ali para guardá-la. Pegando a chave, você e Parx decidem que não há mais nada a fazer aqui e retornam à bifurcação, pegando o corredor da esquerda. O corredor leva a uma porta trancada. Você experimenta a chave, e ela funciona: a porta se abre. Vá para 23.",
    "escolhas": [
      { "texto": "Abrir a porta trancada com a chave", "destino": "23" }
    ]
  },
  {
    "id": "32",
    "texto": "As idéias de Parx são divertidas, e ele é bom com disfarces. Caberá a você inventar uma história convincente antes de bater à porta de Arsenal. Se quiser apresentar-se como negociante de artefatos mágicos, vá para 7. Se prefere agir sob o disfarce de emissário da Guilda, vá para 12.",
    "escolhas": [
      { "texto": "Apresentar-se como negociante de artefatos mágicos", "destino": "07" },
      { "texto": "Apresentar-se como emissário da Guilda", "destino": "12" }
    ]
  },
  {
    "id": "33",
    "texto": "Você agarra o colar de contas, reconhecendo-o como sendo parecido com aquele usado por um ranger amigo seu. As contas do colar são explosivas. Você arranca a maior delas e arremessa contra Arsenal, cobrindo os olhos para proteger-se da explosão. Quando olha novamente, descobre Arsenal ainda de pé, com o peito fumegando. - Pobre tolo! - diz ele. - É preciso muito mais do que isso para acabar comigo. - Será mesmo? - você pergunta, sorrindo, quando uma idéia traiçoeira atravessa sua mente. Você toma outra conta do colar e arremessa... mas não contra Arsenal. Desta vez você faz pontaria no chão, entre seus pés. Como você planejou, o chão não resiste e desaba - levando Arsenal consigo. - Muito engenhoso, amigo Andrus - diz Parx, aproximando-se da beirada do buraco e olhando lá embaixo. - Isso provavelmente não vai matar Arsenal, mas irá detê-lo até que estejamos longe. É melhor irmos logo, contudo. Ele está certo. Vá para 35.",
    "escolhas": [
      { "texto": "Fugir dali rapidamente", "destino": "35" }
    ]
  },
  {
    "id": "34",
    "texto": "O caminho da esquerda conduz vocês por um corredor que, mais adiante, termina em uma pesada porta metálica. Parece grossa demais, e não adiantaria tentar ouvir algo atrás dela. Se quiser procurar armadilhas na porta, vá para 14. Se quiser tentar abrir a porta, vá para 28. Se quiser tentar o outro corredor, vá para 6.",
    "escolhas": [
      { "texto": "Procurar armadilhas na porta", "destino": "14" },
      { "texto": "Tentar abrir a porta", "destino": "28" },
      { "texto": "Tentar o outro corredor", "destino": "06" }
    ]
  },
  {
    "id": "35",
    "texto": "Tendo vencido Arsenal, você pode examinar sua coleção com mais calma. Dentre uma infinidade de itens, você encontra o que parece ser um chapéu vulgar, mas é exatamente o que procurava... Vá para 40.",
    "escolhas": [
      { "texto": "Pegar o chapéu de disfarce e fugir", "destino": "40" }
    ]
  },
  {
    "id": "36",
    "texto": "A torre de Arsenal está mesmo deixando você paranóico- mas cuidado nunca é demais neste lugar. Com suas ferramentas, você fuça a base da tocha. Descobre de fato um mecanismo, mas não sabe dizer se vai ativar uma armadilha ou uma porta secreta. Você terá que arriscar. Vá para 13.",
    "escolhas": [
      { "texto": "Puxar a tocha", "destino": "13" }
    ]
  },
  {
    "id": "37",
    "texto": "Talvez não seja uma boa idéia confiar em Methralian. Ele tem uma posição de prestígio dentro da Guilda, e uma mudança de diretoria pode não ser de seu agrado. Achando mais prudente agir sem o clérigo, você parte na direção do castelo de Arsenal. Quando você começa sua viagem, uma vozinha soa perto de seu ouvido: - Partindo para uma aventura sem seu colega, Aranha? À menção de seu apelido no submundo, você se vira com a adaga em punho mas não encontra ninguém. Olha à volta, confuso, e descobre que está mesmo sozinho. Sozinho, exceto por... Você olha para o mico em seu ombro. Ele traz um sorriso no pequeno rosto. - Parx! - você grita, tentando acertar um tabefe no bicho. Ele se esquiva e pula para o chão, sendo logo envolvido por uma luz mágica e distorcida; aos poucos, as formas do macaco desaparecem para dar lugar ao sacerdote Parx Methralian. Agora você se lembra: seus deuses concedem a ele o poder de transformar-se em macaco. - Seu trapaceiro dos infernos! Quantas vezes tive você sobre meu ombro, pensando tratar-se de um mico comum? - Muitas, garanto. Mas não se enfureça tanto, velho amigo; se eu realmente quisesse atraiçoá-lo, já teria denunciado à diretoria suas atividades clandestinas. Acalmando-se, você percebe que aquilo pode muito bem ser verdade. Parx era assim mesmo: trapaceava por simples devoção aos deuses, sem grandes ambições materiais ou sociais. Se quisesse trair você para conquistar mais prestígio dentro da Guilda, já o teria feito. Você resolve que pode confiar nele, afinal. Revela seu plano, e assiste-o acariciar o cajado mágico que conseguiu no castelo de Arsenal. - Um convite tentador, amigo Andrus. Este sacerdote anda um pouco saudoso dos bons tempos de batalha. E será bom ter um velho amigo como chefe da Guilda. Vamos, pois, à procura do bom Mestre Arsenal. Vá para 10.",
    "escolhas": [
      { "texto": "Partir rumo à torre", "destino": "10" }
    ]
  },
  {
    "id": "38",
    "texto": "Escutando com atenção, você abre a porta no instante em que o cão está trotando no sentido oposto ao de vocês. Ele é imenso, e silencioso demais para uma criatura do seu tamanho. Parx faz suas preces silenciosas. Você já viu seu feitiço de paralisia em ação: a vítima fica espremida contra o solo, como se prensada por uma mão gigante e invisível, incapaz de mover-se ou falar. Contra aquele mastim, devia ser mais que suficiente. O feitiço, entretanto, não surtiu efeito. Seria sua imaginação, ou as costelas da criatura estavam expostas? Infelizmente, não era imaginação. Aquilo não era um cão de guarda comum, mas sim um cadáver animado certamente invocado por Arsenal para proteger sua torre nesta noite tão suspeita. Despreparados para uma batalha contra um morto-vivo, você e Parx não conseguem conservar-se vivos e sucumbem ao toque pestilento das garras da fera...",
    "escolhas": []
  },
  {
    "id": "39",
    "texto": "Com o máximo cuidado para não fazer ruído, você usa suas ferramentas para tentar localizar armadilhas. Procura pelas costumeiras agulhas envenenadas que saltam das maçanetas, mas não encontra nenhuma. Depois de longos minutos, quando você está quase acreditando que a porta é inofensiva, percebe a existência de um mecanismo que seria ativado pelo abrir da porta; não há como saber exatamente o que ele faria, mas é claramente uma armadilha. Com uma tesoura apropriada, você corta o arame que serviria de gatilho e agora a porta é segura. A porta leva a um grande aposento, que você e Parx reconhecem de imediato: é a sala onde Arsenal guarda as peças principais de sua coleção e ela cresceu desde quando estiveram aqui. Espadas magníficas adornam as paredes, armaduras reluzentes descansam em seus pedestais, escudos exibem seus brasões orgulhosos... mas nada disso interessa a você. Precisa de alguma coisa especial, alguma coisa diferente... - Tudo nesta sala é mágico - comenta Parx, maravilhado. - Até mesmo aquele tapete. Vocês voltam a atenção para um grande tapete, finamente trabalhado, bem no centro da sala. Seria um dos tais tapetes voadores? Vale a pena investigar: você e Parx se aproximam para sentar-se no tapete... e caem. A consciência retorna dolorosa. Você acorda em uma cela no calabouço da torre de Arsenal. Parx está ajoelhado ao seu lado, entoando cânticos para curar os ferimentos causados pela queda. - O que foi desta vez? - você pergunta. - Uma armadilha. O tapete nunca existiu. Era uma ilusão que escondia um alçapão. Você olha para o teto e vê o alçapão por onde devem ter caído, agora fechado. Malditas armadilhas mágicas! Passos denunciam a aproximação de alguém. A porta da cela se abre, e por ela entram o que parecem ser dois guardas com armaduras completas. Mas basta um olhar mais cuidadoso para notar que não há seres humanos ali: são armaduras mágicas. Elas posicionam-se nos lados da porta, espadas in punho, e abrem passagem para... Arsenal. Sim. Mestre Arsenal em pessoa. O habilidoso guerreiro, cujo nome verdadeiro foi esquecido há muito tempo, e que passou grande parte de sua vida percorrendo o mundo em busca de armas e armaduras encantadas. Aquele cuja torre você e seus companheiros invadiram para recuperar um artefato roubado, aproveitando para levar consigo muitas peças de sua coleção. Será que ele ainda está zangado? Arsenal usa suas peças favoritas: a couraça completa, a capa orgulhosa e o rosto oculto pelo elmo de aspecto ameaçador. Desta vez não traz consigo o escudo imenso, grande como uma porta, e o descomunal martelo de guerra capaz de derrubar paredes, pelo que você se lembra. Tem nas mãos sua capa mágica e o cajado de Parx. - Surpreendem-me com sua audácia, seus ratos ladrões - diz a voz abafada pelo elmo. - Invadir minha torre no passado foi, por si só, um atrevimento desmedido. Retornar aqui, então, é algo que só posso classificar como pura loucura. Ele agita a capa e o cajado diante de vocês, talvez esperando que tentem recuperá-los. Nem você e nem Parx são tolos o bastante para tentar: Arsenal usa objetos mágicos que ampliam sua força, e mesmo sem armas poderia matá-los sem esforço. - A recompensa por sua tolice será a morte - anuncia ele. - Mas não agora. Vocês interromperam meu sono, e desejo estar descansado para saborear seu sofrimento. Aproveitem seu último alvorecer. Arsenal deixa a cela, instruindo as armaduras para montar guarda do lado de fora. Você e Parx entreolham-se: - Reparou como os vilões sempre dão uma chance para a gente escapar? - Não alimente falsas esperanças, amigo Andrus. Como a maioria dos usuários de feitiços, Arsenal precisa estar plenamente descansado para renovar seus poderes pela manhã. Por certo ele planeja matar-nos com magia, de maneiras tão horríveis que eu mal poderia descrever... Diante dessa perspectiva nada agradável, você saca o estojo de ferramentas que, felizmente, escapou à revista de Arsenal. - Como vamos sair daqui? Posso cuidar da fechadura, mas e os guardas? - Apenas abra a porta, e deixe o resto comigo. Você lida com a fechadura da cela, ofendido com sua simplicidade. Destranca-a em poucos momentos. Então, de posse de seu símbolo sagrado, Parx salta para o corredor e enfrenta os guardas. - Voltem para o reino dos mortos, criaturas das trevas! Parece que Parx perdeu o juízo. Ele pode esconjurar mortos-vivos, mas como espera fazer o mesmo com armaduras mágicas? Para sua surpresa, entretanto, você assiste uma cena impossível: as armaduras estremecem e caem em pedaços. - Não eram armaduras encantadas - explica Parx, - e sim fantasmas invisíveis, invocados por Arsenal. - É bom ver você mostrar um pouco de esperteza, para variar! Rindo baixo, você agarra uma das espadas caídas no chão e oferece outra a Parx. Ele recusa, afirmando que seus deuses não aprovam o uso de armas daquele tipo. Meneando a cabeça, vocês seguem por um corredor mal iluminado e chegam a uma bifurcação. Se quiser pegar o caminho da direita, vá para 6. Se prefere o da esquerda, vá para 34.",
    "escolhas": [
      { "texto": "Pegar o caminho da direita", "destino": "06" },
      { "texto": "Pegar o caminho da esquerda", "destino": "34" }
    ]
  },
  {
    "id": "40",
    "texto": "Dias depois, os grandes chefes de quadrilha de Kristophania foram convocados para uma reunião extraordinária pelo chefão da Guilda. Ele tem um anúncio surpreendente a fazer. - Estou cansando de estar no comando - declara ele. - Convoquei esta reunião para anunciar o novo chefe geral da Guilda de Kristophania. Andrus, o Aranha, será o novo diretor. Os chefes agitam-se, indignados, com a entrada de Andrus no recinto. Cada um esperava ser indicado para o cargo supremo... mas não estavam preparados para aquilo! - Muito obrigado, chefe - você diz. - Vou cuidar bem das coisas por aqui. - Conto com você, Andrus. Estarei me retirando para meu esconderijo, onde vou gozar de uma aposentadoria merecida, longe das autoridades. Adeus. E a reunião termina com a saída dos chefes furiosos. Andrus terá alguns problemas para impor sua autoridade a eles, mas não será nada difícil demais. Com a autorização pessoal do chefão, e os assassinos da Guilda ao seu lado, ninguém irá se opor à sua liderança. - Muito bom este chapéu de disfarce - revela Parx, sob o disfarce mágico de chefe da Guilda. Suas lesões poderiam enganar qualquer um. - Não precisam enganar mais ninguém - você explica. - Se o corpo do chefe for encontrado, não fará mais diferença. Agora \"ele\" já passou o cargo para mim, certo? Sim, foi um bom plano: matar o chefe e usar o chapéu mágico de Arsenal para criar a ilusão de que Parx era ele, transferindo toda a autoridade para você. Parabéns, você conseguiu. É o novo chefão da Guilda dos Ladrões - pelo menos até que alguém apareça com um plano mais matreiro que o seu.",
    "escolhas": []
  }
];
