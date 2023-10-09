const quizData = [
    {
      question: 'Quais são os componentes de um sistema de comunicação?',
      options: ['Impressora, mouse, teclado', 'Emissores, receptores, canal de comunicação', 'Banda larga, CPU, RAM', 'Tela sensível ao toque, alto-falantes, disco rígido'],
      answer: 'Emissores, receptores, canal de comunicação',
    },
    {
      question: 'Quais são as vantagens das redes de computadores?',
      options: ['Aumento da velocidade da luz, viagem no tempo, telepatia', 'Compartilhamento de receitas de cozinha, troca de histórias de fantasmas, comunicação com alienígenas', 'Partilha de recursos de hardware, partilha de recursos de software, comunicação eficiente', 'Compartilhamento de segredos de estado, espionagem internacional, invasões de privacidade'],
      answer: 'Partilha de recursos de hardware, partilha de recursos de software, comunicação eficiente',
    },
    {
      question: 'Quais são os objetivos da utilização de redes de computadores?',
      options: ['Encontrar tesouros enterrados, explorar o espaço sideral, prever o futuro', 'Otimização dos recursos humanos, financeiros, de hardware e de software existentes', 'Aprender a voar, dominar a telecinese, viajar no tempo', 'Tornar-se invisível, teletransportar-se, controlar o clima'],
      answer: 'Otimização dos recursos humanos, financeiros, de hardware e de software existentes',
    },
    {
      question: 'Quais são os tipos de redes de computadores quanto à sua distribuição geográfica?',
      options: ['Redes de televisão, redes de rádio, redes sociais', 'LAN, USB, Bluetooth', 'WAN, LAN, MAN', 'Internet, intranet, extranet'],
      answer: 'WAN, LAN, MAN',
    },
    {
      question: 'O que é uma LAN?',
      options: [
        'Lanche ao meio-dia','Local Area Network','lama na estrada','Los Angeles'
      ],
      answer: 'Local Area Network',
    },
    {
      question: 'Quais são os tipos de redes de computadores quanto à relação entre nós?',
      options: ['Pão de forma, Ponto de Ônibus, Ponto de Exclamação', 'Ponte suspensa, Ponto de interrogação, Ponto de encontro', 'Ponto a ponto (peer-to-peer), Cliente-servidor (client-server)', 'Ponto de partida, Ponto de chegada, Ponto final'],
      answer: 'Ponto a ponto (peer-to-peer), Cliente-servidor (client-server)',
    },
    {
      question: 'O que é uma rede ponto a ponto (peer-to-peer)?',
      options: [
        'Uma rede em que todas as informações são trocadas por meio de mensagens de voz', 'Uma rede em que todos os dispositivos têm funções semelhantes e compartilham recursos diretamente', 'Uma rede em que os dispositivos são conectados por linhas de trem', 'Uma rede em que apenas os dispositivos mais poderosos têm acesso à internet'
      ],
      answer: 'Uma rede em que todos os dispositivos têm funções semelhantes e compartilham recursos diretamente',
    },
    {
      question: 'O que é uma rede cliente-servidor (client-server)?',
      options: ['Uma rede onde todos os dispositivos são controlados por um servidor, que também atua como chef', 'Uma rede onde os dispositivos podem se comunicar diretamente uns com os outros, sem necessidade de um servidor', 'Uma rede onde apenas os clientes têm controle sobre o servidor', 'Uma rede onde todos os dispositivos têm funções semelhantes e compartilham recursos diretamente'],
      answer: 'Uma rede onde todos os dispositivos são controlados por um servidor, que também atua como chef',
    },
    {
      question: 'O que é uma WAN?',
      options: [
        'Wide Area Networking',
        'Arco-íris',
        'Wall Street',
        'Nenhum destes',
      ],
      answer: 'Nenhum destes',
    },
    {
      question: 'O que é uma MAN?',
      options: ['Marte', 'Máquina de café', 'Mensagem de texto', 'Metropolitan Area Network'],
      answer: 'Metropolitan Area Network',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Tu pontuaste ${score} de ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Pergunta:</strong> ${incorrectAnswers[i].question}<br>
          <strong>A tua resposta:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Resposta correta:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Tu pontuaste ${score} de ${quizData.length}!</p>
      <p>Respostas incorretas</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();

  function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
 document.body.style.background = bgColor;
    }

random_bg_color();
