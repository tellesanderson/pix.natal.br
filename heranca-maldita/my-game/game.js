export const credits = {
  title: "Herança Maldita",
  author: "Silvio Schatner / Anderson Telles",
  description: "Você consegue escapar de uma cidade assombrada e livrá-la de sua maldição?"
};

export const textNodes = [
  {
    "id": "intro",
    "texto": "Você é Carlos Alexandre Bueno, um funcionário público. Trabalha no Banco do Brasil, não tem muitos amigos e nem visita os parentes com frequência sendo que seus pais faleceram no último ano. É com surpresa, portanto, que recebe de um advogado uma carta informando que está prestes a receber uma herança. Você deverá comparecer ao escritório do advogado antes do próximo sábado, para acertar os detalhes. A herança foi deixada por Silvio Schatner. O nome não lhe parece completamente estranho; você acaba lembrando-se de sua infância, quando às vezes seus pais recebiam a visita de um tio esquisito, que contava histórias sobre \"coisas inexplicáveis\", religiões antigas e culturas bizarras. Essas histórias davam-lhe arrepios e por muitas vezes não conseguia dormir, mas gostava de ouvi-las. Há muito tempo não ouvia falar em Silvio, e não fosse por esta carta dificilmente iria se recordar dele. Estranho... não eram parentes próximos. Por que Silvio lhe deixaria uma herança? Seria realmente o mesmo Silvio que conheceu? Curioso, você decide ver o advogado para verificar a veracidade da carta e descobrir o que se passa. No escritório o advogado confirma suas lembranças, mostrando fotos que eram realmente do estranho tio Silvio. Você fica sabendo também que, pouco antes de morrer, Silvio achava-se internado em um sanatório - mas o testamento foi escrito anos antes, quando ainda estava são, e portanto era válido. Mais curioso ainda era que a leitura do testamento deveria ser feita na antiga casa de Silvio, em uma cidadezinha de interior chamada Guardudo, no próximo sábado, às 23:00.",
    "escolhas": [
      { "texto": "Iniciar Aventura", "destino": "01" }
    ]
  },
  {
    "id": "01",
    "texto": "Você decide ir à leitura do testamento, curioso com as condições e também para saber o que Silvio teria lhe deixado. Sábado, logo após o almoço, você ruma para o escritório do advogado. Chegando lá, encontra-o à sua espera, bem como outros dois herdeiros - um homem e uma mulher. Nenhum deles é familiar. Mais tarde você descobre tratarem-se de Bóris, um antigo colega de faculdade de Silvio; e Kátia, outra parente distante que também não o via há anos. Foram todos no carro do advogado. A viagem para Guardudo leva algumas horas; talvez não demorassem tanto se não errassem o caminho duas vezes. Afinal, não havia placa alguma indicando a pequena estrada de terra que leva até a cidade. Guardudo parece uma cidade saída do começo do século, cercada por uma imensa mata virgem. A população talvez não chegasse a mil habitantes, e as poucas pessoas nas ruas trajam roupas extremamente fora de época - literais peças de museu. Na rua principal (de onde podem ser vistas as fronteiras norte e sul de Guardudo, com um simples giro de cabeça) vocês decidem informar-se sobre a localização da casa de Silvio. Como viaja no banco da frente, você desce do carro para pedir a informação. Há apenas duas pessoas por perto: um senhor de idade sentado nos degraus de entrada de uma casa, e um garotinho brincando na rua.",
    "escolhas": [
      { "texto": "Perguntar ao velho", "destino": "27" },
      { "texto": "Perguntar ao garoto", "destino": "09" }
    ]
  },
  {
    "id": "02",
    "texto": "Você não pretende confiar nas leis desta cidade de loucos. Caminha na direção da saída e, quando o guarda segura seu braço para detê-lo, o nervosismo faz com que você o derrube com um soco no estômago. O delegado puxa a arma, dando-lhe a certeza de que você está lidando com lunáticos. Felizmente consegue chegar até o carro e dirigir de volta para a casa. Para sua surpresa, ninguém o segue. Chegando lá, você descobre que Bóris não está. Foi à cidade para descobrir o que estava acontecendo. Depois de ouvir o que aconteceu, o advogado pede calma a todos e sugere que esperem pela volta de Bóris antes de tomar qualquer atitude.",
    "escolhas": [
      { "texto": "Esperar pela volta de Bóris", "destino": "31" }
    ]
  },
  {
    "id": "03",
    "texto": "Você se atraca com a mulher e começam uma luta feroz. Ela é muito mais forte do que parece; você não consegue deter suas mãos quando elas fecham-se à volta de seu pescoço. Seus olhos enchem-se de sangue, e em poucos instantes o ar não chega mais a seus pulmões. Pouco depois, você não precisa mais de ar - mortos não respiram.",
    "escolhas": []
  },
  {
    "id": "04",
    "texto": "Você abre a porta do porão e desce cuidadosamente, com cuidado para que a vela não apague. Chegando lá embaixo, nota que tudo à volta parece destruído. Aquele que deve ser o prisioneiro vem em sua direção. Quem o teria trancado aqui? O homem usa roupas rasgadas e apodrecidas, que exalam um forte cheiro de carniça. A aparência dele parece estranha sob a luz da vela. Seus olhos estão perdidos no vazio, e sua pele é muito pálida. Quando prepara-se para falar com ele, uma mão veloz fecha-se à volta de seu pescoço e começa a apertar. Você está tão surpreso que não consegue reagir. Sua garganta é esmagada. Sua última visão antes que a vela caia são aqueles olhos esbranquiçados, fixos, desejosos de morte...",
    "escolhas": []
  },
  {
    "id": "05",
    "texto": "A madeira parece uma boa arma. Você a segura e bate com força nas costas da mulher, mas ela nem parece se incomodar: continua despedaçando a garganta do advogado, como se as violentas pauladas em seu dorso não fossem nada.",
    "escolhas": [
      { "texto": "Tentar o lampião", "destino": "15" },
      { "texto": "Agarrar a mulher para afastá-la do advogado", "destino": "03" },
      { "texto": "Fugir", "destino": "12" }
    ]
  },
  {
    "id": "06",
    "texto": "Você resolve acabar de vez com o mal que assola esta região, antes que ele se espalhe. Coloca o medalhão no pescoço, pega os potes e papéis, e segue na direção da floresta. Seguindo as indicações de Silvio, você encontra uma trilha que não parece usada há anos. Entrando na trilha, você percebe uma luminosidade azul irradiando do medalhão. Ao mesmo tempo sente uma opressão indefinida, uma sensação de horror; as árvores parecem fechar-se à sua volta, mas se afastam quando você avança. Quanto mais você penetra na floresta, mais intensamente brilha o medalhão e maior é a sensação de que os galhos tentam agarrá-lo. Ao final da trilha você encontra uma grande pedra negra. No centro dela há um buraco de onde saem labaredas. É o local onde deve se realizar o ritual. Você lê as instruções, mas parte delas está borrada pelo tempo e, apesar da lua cheia, a luz aqui é fraca demais para garantir uma boa leitura. Apesar disso, acha que ainda é possível realizar o ritual.",
    "escolhas": [
      { "texto": "Tentar realizar o ritual", "destino": "26" },
      { "texto": "Ir embora", "destino": "24" }
    ]
  },
  {
    "id": "07",
    "texto": "Dentro do quarto você se sente mais seguro. Parece uma antiga biblioteca, mas os livros estão todos podres e espalhados pelo chão. Enquanto seus nervos recuperam-se do susto e você pondera sobre o que fazer, uma luz chama sua atenção do lado de fora da casa. Abaixo da colina, andando pela estrada e portando tochas, muitas pessoas caminham em procissão. Vestem túnicas e cantam em uma língua que soa como latim ou coisa parecida. Pela quantidade de pessoas, toda a população da cidade deve estar ali. Observando mais atentamente, você percebe que estão levando um estandarte. Mas, em vez de bandeira, o mastro traz o que parece ser um corpo humano! A procissão segue e penetra na floresta perto da encosta da colina. Será que Silvio estava certo? Estariam eles indo à tumba onde as anotações sobre o ritual estão escondidas? Ou essa tumba estaria no cemitério da cidade?",
    "escolhas": [
      { "texto": "Seguir a procissão", "destino": "10" },
      { "texto": "Ficar na casa e procurar por Kátia", "destino": "22" },
      { "texto": "Ir à cidade", "destino": "17" }
    ]
  },
  {
    "id": "08",
    "texto": "Para evitar um encontro com outro daqueles seres malditos, você sai pela janela disposto a fugir para a cidade mas, depois de uma rápida olhada, percebe que o carro sumiu. Terá que ir à pé. Pulando de sombra em sombra, você consegue chegar à cidade sem ser notado. Avista um grupo de pessoas conversando na rua. Nenhuma delas viu você, ou não lhe dão atenção.",
    "escolhas": [
      { "texto": "Falar com eles", "destino": "39" },
      { "texto": "Procurar um carro para sair da cidade", "destino": "19" },
      { "texto": "Procurar pelo cemitério", "destino": "29" }
    ]
  },
  {
    "id": "09",
    "texto": "A criança não parece ligar para sua aproximação e continua com o que estava fazendo. Chegando mais perto, você percebe que o moleque está enterrando um rato vivo, deixando apenas a cabeça para fora. Ele não sabe nada sobre nenhum Silvio - mas você se lembra que o advogado mencionou \"a casa da colina\", e pergunta sobre ela. - A casa da colina eu sei onde é - responde ele. - É a casa do homi mau. Ele ia cabá com todo mundo, mas papai deu um jeito nele e ele foi'mbora. Meu pai é quase tão forte quanto o Gererê. Você é um homi mau? Depois de algum trabalho para convencer o garoto de que você não é um \"homi mau\", ele indica o caminho até a casa. Você agradece e reflete sobre a imaginação fértil das crianças e suas brincadeiras estranhas...",
    "escolhas": [
      { "texto": "Ir para a casa na colina", "destino": "37" }
    ]
  },
  {
    "id": "10",
    "texto": "Sorrateiramente você sai pela janela e parte na direção da mata. É fácil achar o caminho que tomaram, pois há uma grande trilha aberta. Logo você começa a escutar os cânticos novamente e chega a uma clareira. Para sua surpresa, todos estão em volta do grande mastro que você viu - e a pessoa morta espetada nele é Bóris! O pânico domina seu corpo, e você tenta fugir. Quando está prestes a disparar em corrida, choca-se com uma árvore. Estranho, não parecia haver nada ali antes. Você tenta dar a volta, mas acaba se enroscando em um punhado de cipós. Parece loucura, coisa de pesadelo, mas quanto mais você se debate mais os cipós apertam. Você finalmente se dá conta de que não é apenas seu pânico: os cipós estão realmente amarrando-o. Quando está totalmente preso, sem conseguir mover um músculo, a última coisa que você vê em vida é uma monstruosa bocarra abrindo-se no tronco da árvore...",
    "escolhas": []
  },
  {
    "id": "11",
    "texto": "Você se lembra do testamento, que mencionava algo sobre uma criatura presa no porão. Não acreditou a princípio, mas agora a idéia já não parece tão absurda. Você evita o porão, entra no quarto e tranca a porta por dentro. Depois de algum tempo, não há mais barulho lá fora. Talvez aquele monstro tenha ido embora.",
    "escolhas": [
      { "texto": "Sair do quarto", "destino": "07" }
    ]
  },
  {
    "id": "12",
    "texto": "Temendo que as histórias de Silvio sejam reais, você decide fugir. Mas o lampião ficou na entrada, e você se encontra na mais completa escuridão. Ultrapassa, sem perceber, a escada que leva ao andar de cima. Meio tateando e meio tropeçando, você encontra a porta de um quarto e a escada que desce até o porão.",
    "escolhas": [
      { "texto": "Entrar no quarto e trancar-se lá dentro", "destino": "11" },
      { "texto": "Ir para o porão", "destino": "35" }
    ]
  },
  {
    "id": "13",
    "texto": "Resignado, você aceita ficar na cela. Deita-se na cama estreita e fica esperando para ver o que acontece. Com o tempo acostuma-se ao silêncio, e consegue ouvir a conversa distante entre o guarda e o delegado. Não pode distinguir muita coisa, apenas algumas palavras... \"o forasteiro\"... \"sacrificio\"... \"deus árvore...\" Nada que deixe você mais tranquilo. Quando acaba de roer todas as suas unhas, você arrisca uma espiada fora da cela. O delegado não está, e o guarda cochila em uma cadeira logo ao lado. A chave é bem visível em seu bolso. Você poderia pegá-la - mas, se falhar, certamente vai acordá-lo.",
    "escolhas": [
      { "texto": "Pegar a chave", "destino": "38" },
      { "texto": "Esperar mais", "destino": "23" }
    ]
  },
  {
    "id": "14",
    "texto": "Essa cidade é louca! Que se dane a herança! Você decide que é melhor não ficar aqui nem mais um minuto, e liga o carro. Essa gente quer matá-lo, e dinheiro nenhum no mundo vale isso. Quando tenta passar, as pessoas tentam pará-lo. Algumas jogam-se contra o carro. O pânico faz com que você pise fundo no acelerador, sumindo na estrada de terra que sai da cidade - mesmo sem a certeza de que atropelou alguém ou não.",
    "escolhas": [
      { "texto": "Continuar dirigindo", "destino": "33" }
    ]
  },
  {
    "id": "15",
    "texto": "Você imagina que existe alguma verdade no bilhete de Silvio. Agarra o lampião e atira contra a mulher. O querosene se espalha e transforma-a em uma tocha humana. Um grito hediondo escapa de sua garganta. Ela queima como papel amassado, muito mais rápido que um ser humano normal queimaria; em poucos segundos está reduzida a pó. É tarde para salvar o advogado, que está bem morto. Chocado com a cena funesta, você cambaleia sem rumo até entrar em um quarto.",
    "escolhas": [
      { "texto": "Investigar o quarto", "destino": "07" }
    ]
  },
  {
    "id": "16",
    "texto": "Você atira o medalhão contra uma pedra, fazendo-o em pedaços, rezando para que isso complete o ritual. Olha em volta, e respira aliviado quando percebe que a agonia da floresta parece terminada. Os espíritos foram embora. Ou talvez não, você pensa, quando vê um galho mover-se. O pânico apodera-se de seu corpo enquanto as árvores arrastam-se em sua direção. Os demônios ainda estão ali! Você tenta gritar, mas os cipós enroscam-se em seu pescoço e sufocam seus gritos, enquanto é arrastado na direção da bocarra que se abre no tronco de uma árvore. Seus lamentos jamais serão ouvidos novamente por alguém deste mundo...",
    "escolhas": []
  },
  {
    "id": "17",
    "texto": "Você decide que a melhor idéia é rumar para a cidade, quando nota algumas pessoas abandonando a mata. Elas se espalham em diversas direções, andando de forma capenga, e parecem estar procurando alguma coisa ou alguém! Algumas delas aproximam-se da casa, e é melhor você sair daqui antes que cheguem.",
    "escolhas": [
      { "texto": "Fugir para longe da casa", "destino": "08" }
    ]
  },
  {
    "id": "18",
    "texto": "Você corre pela casa, chamando por Kátia e Bóris. Quase desesperado, cruzando os corredores aos berros, você vê alguém saindo de um dos quartos. A onda de alívio que o envolve não dura muito: é uma mulher, nua, inteiramente banhada em sangue. Ela avança em sua direção e agarra sua garganta com uma força incrível. Você tenta soltar-se, mas é como lutar com uma estátua sólida. Não consegue fazer nada quando ela começa a arrancar pedaços seus com mordidas selvagens. Não há mais escapatória. É o seu fim.",
    "escolhas": []
  },
  {
    "id": "19",
    "texto": "Você decide que é melhor procurar um carro para fugir desta cidade de loucos o quanto antes. Essas pessoas provavelmente são tão insanas quanto aquelas que participavam da procissão, e não parece boa idéia expor-se assim. Você vasculha a cidade, e acaba encontrando o carro do advogado diante da delegacia. As luzes da delegacia estão acesas, mas não há ninguém na rua.",
    "escolhas": [
      { "texto": "Ir até o carro", "destino": "36" }
    ]
  },
  {
    "id": "20",
    "texto": "Você decide que é melhor não participar do plano de Silvio; mesmo que ele esteja certo, a melhor coisa a fazer é escapar daqui. Você guarda tudo que pegou e sai do cemitério em busca de um carro que possa usar para sair da cidade. Chegando à rua principal, você encontra o carro do advogado estacionado diante da delegacia.",
    "escolhas": [
      { "texto": "Ir até o carro", "destino": "36" }
    ]
  },
  {
    "id": "21",
    "texto": "É melhor que você os acompanhe. Se ninguém fizer isso, eles não os deixarão em paz. Você pega as chaves do carro do advogado e segue-os até a cidade. Vocês estacionam diante da delegacia e entram. A atitude dos dois fica ainda pior: eles dizem que, entrando na casa, você desacatou as leis locais e deverá ficar detido até o dia de seu julgamento. Você protesta, alegando que tudo isso é inconstitucional - mas, antes mesmo que você termine essa palavra, um dos guardas abre a porta de uma cela e ordena que entre.",
    "escolhas": [
      { "texto": "Tentar fugir desses loucos e voltar à casa", "destino": "02" },
      { "texto": "Aguardar para ver até onde chega essa palhaçada", "destino": "13" }
    ]
  },
  {
    "id": "22",
    "texto": "Você decide que vai continuar na casa e procurar por Kátia, que deve estar mais apavorada que você (ainda que isso pareça bastante difícil). Tenta deduzir para onde ela teria ido, mas não consegue. Minutos depois, ao passar pela janela, você percebe várias figuras abandonando a mata. Elas têm o mesmo andar desengonçado da mulher que matou o advogado, e emitem horríveis sons inumanos. Algumas delas estão vindo nesta direção e continuar aqui já não parece uma idéia tão boa.",
    "escolhas": [
      { "texto": "Ir à floresta investigar a estranha procissão", "destino": "10" },
      { "texto": "Ir à cidade", "destino": "08" }
    ]
  },
  {
    "id": "23",
    "texto": "Você aguarda na cela até pouco antes da meia-noite, conformado com a idéia de que perderá a leitura do testamento. Quando já começava a dormir, é acordado pelo som de cânticos estranhos: \"Comida para o deus-árvore... comida para o deus-árvore...\" Uma pequena multidão entra na delegacia. Todos usam mantos negros e seguram facas. O guarda desperta e pula da cadeira mas, em vez de enfrentar os estranhos, tudo que ele faz é destrancar a porta da cela. As pessoas de manto entram. Com suas facas. Você se desespera e tenta reagir, mas eles são muitos. Quando a primeira lâmina penetra em seu corpo, percebe que é o fim...",
    "escolhas": []
  },
  {
    "id": "24",
    "texto": "Depois de tudo que aconteceu, você pensa que não quer correr mais riscos; o medalhão parecer ser a única coisa que o protege neste lugar maldito - e, como dizia a carta, se o ritual falhar a proteção do medalhão termina. Você tenta encontrar a trilha para retornar à cidade, mas não vê nada. É como se a mata houvesse crescido de novo, em poucos instantes. Se os espíritos realmente controlam a vegetação, você poderia vagar durante dias sem encontrar coisa alguma. Pelo jeito, sua única esperança agora é completar o ritual.",
    "escolhas": [
      { "texto": "Retomar o ritual", "destino": "26" }
    ]
  },
  {
    "id": "25",
    "texto": "Você pisa fundo no acelerador e ruma para a casa. \"Essa droga de herança terá que ser muito boa para compensar tudo isso\", você pensa. Chegando à casa, você acha estranho quando encontra a porta aberta. Derrubada, na verdade. Corre para o escritório e cai de joelhos quando encontra o corpo mutilado do advogado. Feito em pedaços! Aqueles loucos da cidade devem ter feito isso! Onde estão os outros? Talvez ainda estejam na casa.",
    "escolhas": [
      { "texto": "Procurar pelos outros na casa", "destino": "18" },
      { "texto": "Voltar para o carro e escapar deste pesadelo", "destino": "33" }
    ]
  },
  {
    "id": "26",
    "texto": "Você começa a realizar o ritual seguindo as instruções dos papéis. Faz movimentos estranhos com as mãos, pronuncia palavras sem sentido... coisas que acharia absurdas em outra situação. Com o avanço do ritual, a floresta começa a agir de forma estranha. Arbustos farfalham com força, galhos entram em convulsão. A vegetação parece em desespero contra o ritual que está sendo realizado. Tudo corre bem até perto do final, que está quase ilegível. Pelo que você pode perceber, falta a parte que fala sobre a destruição do medalhão. Você não sabe exatamente como ela deve ser feita.",
    "escolhas": [
      { "texto": "Quebrar o medalhão", "destino": "16" },
      { "texto": "Jogá-lo no buraco flamejante", "destino": "40" }
    ]
  },
  {
    "id": "27",
    "texto": "Por ser uma cidade pequena, o velho senhor deve ter conhecido Silvio e provavelmente sabe onde fica sua casa. Ele olha de maneira estranha quando você se aproxima, um olhar fixo que de alguma maneira faz você gelar. - A casa do Silvio? - resmunga o velho, depois de uma longa pausa. - Ocê tá vendo aquela colina no fim da rua? A casa fica lá em cima. Mas vô logo avisando, aqui é lugar mal-assombrado. Se ocêis ficá, pode nunca mais vortá prá cidade grande. É, pode nunca mais vortá... he, he, he... Você se afasta, enquanto o velho prossegue com sua risada histérica. Melhor ficar longe desse maluco e suas crendices idiotas.",
    "escolhas": [
      { "texto": "Ir para a casa na colina", "destino": "37" }
    ]
  },
  {
    "id": "28",
    "texto": "Levando uma vela, você decide dar uma espiada na casa que poderá vir a ser sua herança. É uma grande mansão, mas parece velha e acabada. Se alguém quiser viver nela deverá pensar em uma boa reforma. Quando você se prepara para subir até o andar de cima, escuta alguma coisa. O som vem de uma pequena porta sob a escada. Prestando mais atenção, você percebe que alguém está quebrando alguma coisa lá embaixo. Alguém está trancado no porão?",
    "escolhas": [
      { "texto": "Abrir a porta e ir ao porão", "destino": "04" },
      { "texto": "Voltar ao escritório e esperar pela leitura", "destino": "30" }
    ]
  },
  {
    "id": "29",
    "texto": "No princípio não parecia possível acreditar nas histórias de Silvio, mas como continuar incrédulo depois desses acontecimentos? O testamento dizia que as instruções para expulsar os demônios estão no túmulo do tal João Sebastião Ferreira. O cemitério da cidade pode ser visto ao longe. Você pula a janela e, rezando para não ser visto por nenhum daqueles loucos, chega até lá. Consegue pular o muro com certa facilidade. Você começa a procurar pelo túmulo correto. Olhando para as tumbas, um arrepio começa a percorrer seu corpo: todas estão abertas e vazias! Você não encontra nenhuma tumba com o nome João Sebastião Ferreira: talvez ele esteja enterrado no mausoléu no centro do cemitério, mas mesmo assim é fácil supor que seu túmulo esteja aberto como todos os outros. Entrando no mausoléu, você sente um cheiro fétido, próprio de lugares fechados há anos. Logo você percebe a engenhosidade de Silvio: este lugar era reservado apenas a cinzas de corpos cremados (como podia haver crematório em uma cidade deste tamanho, você não faz a mínima idéia). Ladrões de cemitério não se interessariam por cinzas e qual o melhor lugar para esconder algo deles senão bem debaixo de suas barbas? Você acende algumas velas e, rapidamente, encontra a urna que guarda as cinzas de João. Dentro, além de cinzas, estão um medalhão, dois frascos e alguns papéis em estado péssimo. Com muito cuidado para não estragar os papéis, você começa a lê-los: \"Se você está lendo isto é porque consegui alguém para fazer aquilo que eu mesmo não tive coragem de executar. As pessoas da cidade são insanas, e seus rituais macabros parecem persistir por várias gerações; os loucos acreditam em deuses-árvores e oferecem sacrifícios a eles em troca de vida eterna. De certo modo, seus mortos realmente se levantam da morte, como seres sem vida e sem mente, com sede de sangue: longe de ser uma pessoa com vida eterna... Depois de muitos estudos, consegui achar um ritual para esconjurar os espíritos horrendos que se apossaram da floresta. O medalhão irá proteger o portador contra eles, mas ao final do ritual, a peça deverá ser destruída. Se o ritual não for executado corretamente, o medalhão também se tornará inútil. As instruções para executar o ritual estão anexadas a esta carta, e você pode ser a última esperança de expulsar estes seres antes que eles espalhem sua influência a lugares mais distantes.\" A carta aponta ainda o local onde o ritual deve ser realizado - bem no meio da floresta. Ei, é onde os loucos estão reunidos!",
    "escolhas": [
      { "texto": "Arriscar-se a ir à floresta para realizar o ritual", "destino": "06" },
      { "texto": "Fugir da cidade", "destino": "20" }
    ]
  },
  {
    "id": "30",
    "texto": "Você espera pacientemente no escritório pela leitura do testamento. Está conversando com o advogado para passar o tempo até que alguém bate à porta. Vocês vão ver quem é. Dois homens, um deles trajado como policial, apresentam-se como o prefeito e o delegado de Guardudo. Dizem que vocês não poderiam estar nesta casa sem permissão do Conselho Municipal. O advogado explica sobre o testamento, mas eles não parecem se importar. - Só há uma maneira de acertar tudo - diz o delegado. - Um de vocês deve ir à delegacia para explicar tudinho. Caso contrário, não podem ficar aqui. Você acha tudo isso um absurdo. Não importa quem sejam eles, não têm direito nenhum de dizer se vocês podem ou não ficar na cidade. Mas parece que não vão deixá-los em paz se alguém não for com eles.",
    "escolhas": [
      { "texto": "Acompanhá-los", "destino": "21" },
      { "texto": "Ficar na casa", "destino": "32" }
    ]
  },
  {
    "id": "31",
    "texto": "O tempo passa vagaroso, e finalmente chega a hora. Bóris não retornou, mas não é possível esperar por ele; o testamento deve ser lido agora. O advogado abre o envelope lacrado e começa a leitura em voz alta. No documento, Silvio diz que sempre foi um incansável admirador do desconhecido. Suas pesquisas trouxeram-no até esta pequena cidade. Comprou uma casa no alto de uma colina e começou a investigar as redondezas. Descobriu que um grande mal rondava por aqui, criaturas hediondas escondiam-se nas matas. Teriam sido invocadas por um ritual profano, séculos atrás. Silvio encontrou, em livros antigos, um feitiço capaz de expulsar as criaturas demoníacas que habitavam estas matas mas descobriu, apenas tarde demais, que os habitantes da cidade eram aliados das entidades malignas. Acreditavam que servindo aos monstros, seriam recompensadas com poder e vida eterna, mas estavam enganadas. Os mortos da cidade realmente voltavam do túmulo, mas como zumbis sem mente e provavelmente sem alma. Isso seria vida? O testamento diz ainda que Silvio conseguiu prender um desses mortos-vivos em seu porão. É muito perigoso, de modo que o melhor é deixá-lo lá. Diz ainda que suas anotações estão escondidas no túmulo de João Sebastião Ferreira, e que sua herança é composta de dois apartamentos no Rio de Janeiro, esta casa e R$ 200.000,00 depositados em uma caderneta de poupança. Tudo será dividido entre os herdeiros que conseguirem executar o ritual de esconjuração dos demônios. O advogado mostra ainda um bilhete que deveria ser entregue aos herdeiros - mas ele foi escrito quando Silvio já estava internado no sanatório: \"Morto-vivo * Ser maldito - Fogo Fogofogo um dia outro no caixão destrói vermelho veste colar\" O homem estava realmente maluco. Enquanto você pensa no que fazer diante da absurda proposta do testamento, alguém bate à porta. O advogado pega o lampião e vocês vão atender. A porta aberta revela uma mulher maltrapilha, com roupas rasgadas e apodrecidas, que exala um inacreditável fedor nauseante. Tudo acontece muito rápido: ela grita como um animal, pula para dentro e ataca o advogado, que derruba o lampião. Agarra seu pescoço com as mãos, e morde sua garganta. Kátia grita em pânico e foge, sumindo dentro da casa. Um grande e pesado pedaço de madeira está no seu alcance.",
    "escolhas": [
      { "texto": "Agarrar lampião e atacar com fogo", "destino": "15" },
      { "texto": "Usar pedaço de madeira para golpear", "destino": "05" },
      { "texto": "Não fazer nada disso", "destino": "34" }
    ]
  },
  {
    "id": "32",
    "texto": "Você acha que esses dois não têm o direito de incomodá-los e quer ficar na casa para a leitura do testamento. Como eles insistem com que alguém os acompanhe, Bóris decide ir.",
    "escolhas": [
      { "texto": "Aguardar a leitura", "destino": "31" }
    ]
  },
  {
    "id": "33",
    "texto": "A estrada de terra parece não ter fim. Você está quase acreditando que nunca mais voltará para casa, até encontrar o alívio da estrada asfaltada. Agora, mesmo longe daquele lugar, você sente que o nervosismo não deixará que você durma tranquilo tão cedo. O remorso por abandonar os outros no meio dos loucos também não vai ajudar. Ah, você mal pode esperar para denunciar os habitantes daquele lugar insano à Polícia Federal...",
    "escolhas": []
  },
  {
    "id": "34",
    "texto": "Com horror, você ouve a cartilagem da traqueia do homem se partir. A mulher parece estar devorando pedaços dele! Paralisado de medo, você não consegue fazer nada até o instante em que ela perde o interesse no advogado morto e avança em sua direção.",
    "escolhas": [
      { "texto": "Pegar o lampião aceso e atacá-la", "destino": "15" },
      { "texto": "Fugir", "destino": "12" },
      { "texto": "Esperar para lutar com ela", "destino": "03" }
    ]
  },
  {
    "id": "35",
    "texto": "A porta do porão é a mais próxima e você pode se esconder lá enquanto não chega ajuda. Você destranca a porta e entra. A escuridão é total, e você tateia enquanto desce as escadas. Um forte odor de carne putrefata invade suas narinas, no exato instante em que você se lembra de algo sobre... Você grita de susto quando algo puxa sua perna, fazendo com que caia. Mal pode se recuperar da queda quando sente algo sobre você, apertando seu pescoço. Você tenta escapar, mas é tarde... seus olhos nunca mais verão a luz do sol novamente.",
    "escolhas": []
  },
  {
    "id": "36",
    "texto": "Esse carro é sua única chance de fuga. Você dispara em corrida e entra. As chaves estão no contato, felizmente - mas o movimento chama a atenção de alguém dentro da delegacia. Você liga o carro e parte fritando pneus, bem a tempo de ver pelo retrovisor o delegado que corre para a rua e tenta alguns tiros em sua direção. Um deles chega a atingir o vidro traseiro, mas apenas isso. Logo você está longe, penetrando na estrada de terra que leva para fora da cidade.",
    "escolhas": [
      { "texto": "Continuar fugindo", "destino": "33" }
    ]
  },
  {
    "id": "37",
    "texto": "Seguindo até o fim da rua, vocês logo percebem uma alta colina com uma casa em seu topo. A casa de Silvio, com certeza. A colina é cercada de mato fechado, e mesmo a trilha que leva até a casa está um pouco tomada pela vegetação. Enquanto vocês rumam para lá, as pessoas na rua param para observá-los; uma mulher atira pedras no carro, mas não acerta nenhuma. A casa parece abandonada. A porta da frente está fechada com um cadeado enfeitiçado ou enferrujado, que por pouco não abre com a chave em poder do advogado. Um forte cheiro de mofo toma conta do ar. O interior é escuro, e a luz do poente não deixa ver muita coisa. Sabendo que a casa certamente não teria luz elétrica, o advogado trouxe um lampião a querosene e algumas velas. O advogado leva-os até um escritório, onde vocês devem aguardar até a hora marcada. Ele diz que vocês podem olhar a casa se quiserem, mas Silvio deixou recomendações para que o porão não seja visitado antes da leitura do testamento.",
    "escolhas": [
      { "texto": "Ficar aqui quietinho e esperar", "destino": "30" },
      { "texto": "Ver a casa", "destino": "28" }
    ]
  },
  {
    "id": "38",
    "texto": "Devagar, com cuidado, você consegue puxar a chave do bolso do guarda. Destranca a fechadura e abre a porta, que range um pouco - mas o guarda apenas ronca mais alto. Grande carcereiro, esse! Quando sai da delegacia e chega ao carro, você mal pode acreditar nos próprios olhos: uma pequena multidão de pessoas trajando mantos negros vem em sua direção. Estão empunhando facas e entoando cânticos estranhos. Parece uma boa hora para cair fora!",
    "escolhas": [
      { "texto": "Fugir desta cidade insana", "destino": "14" },
      { "texto": "Voltar para a casa de Silvio", "destino": "25" }
    ]
  },
  {
    "id": "39",
    "texto": "Talvez essas pessoas saibam algo sobre o que está acontecendo aqui. Você se aproxima e percebe que, aos poucos, todos os olhares voltam-se na sua direção. Um olhar mais atento faz com que você perceba algo horrível; todos eles estão com as roupas manchadas de vermelho! Tarde demais, você chega à conclusão de que todos nesta cidade são loucos assassinos e que foi tolice aproximar-se. Arrepender-se de sua estupidez é a última coisa que você consegue fazer antes que um deles aponte uma arma e atire. A bala tira sua vida no mesmo instante...",
    "escolhas": []
  },
  {
    "id": "40",
    "texto": "Você joga o medalhão no fogo com o coração aos pulos. Imediatamente uma luz começa a jorrar do buraco, e você escuta gritos à sua volta. Árvores começam a pegar fogo e tombar. Parece que o ritual funcionou! Você começa a correr, pois em breve toda a floresta deverá estar em chamas. Chegando à cidade, percebe uma grande agitação e confusão por todos os lados. As pessoas agarram as próprias cabeças e correm sem destino. Uma a uma, como a mata, também começam a pegar fogo. Em meio ao caos, alguém acaba chocando-se com você. É Kátia! Está apavorada, mas parece bem - pelo menos não é um zumbi em chamas. Você segura-a pela mão e, juntos, conseguem chegar até o carro do advogado, estacionado diante da delegacia. Você encontra as chaves no contato e dá partida no motor. Quando sai da cidade, você ainda pode ver pelo retrovisor as chamas que consomem a cidade. Quase pode sentir o fogo purificando o lugar, incinerando todo o mal. Não sabe se conseguirá receber sua herança por ter cumprido as condições do testamento, mas isso já não parece tão importante. Kátia entrega-se a um choro restaurador, e uma paz sem igual toma conta de você enquanto dirige de volta para casa...",
    "escolhas": []
  }
];
