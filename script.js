let currentQuestion = 1;
const totalQuestions = 4; // Количество вопросов

const questions = [
    { text: "Виберіть твердження, які відповідають вам", options: ["Красный", "Синий", "Зеленый"] },
		{ text: "Виберіть твердження, які відповідають вам", options: ["Я дуже мінливий і непередбачуваний. Постійно ризикую і завжди націлений(а) тільки на перемогу", "Я дуже люблю спілкуватися. У колі друзів я вважаюся душею компанії", "Для мене важлива стабільність і безпека", "Я вважаю себе мислячою людиною, яка постійно перебуває в духовному пошуку"] },
    { text: "В якому місті знаходитися ваш об'єкт", options: ["Київ", "Дніпро", "Інший"] },
    { text: "Коли можемо організувати зустріч у вас на об'єкті, щоб зробити точні розрахунки і підготувати для вас точну вартість, а також подарувати вам персональну підбірку для натхнення.", options: ["Протягом тижня", "Ще немає обєктаг", "Протягом місяця"] },
    { text: "Какой ваш любимый фильм?", options: ["Титаник", "Матрица", "Интерстеллар"] },
    { text: "Какой ваш любимый композитор?", options: ["Бах", "Моцарт", "Бетховен"] },
    { text: "Какой ваш любимый животный?", options: ["Кошка", "Собака", "Птица"] }
];

function startQuiz() {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.quiz-screen').style.display = 'block';
    document.getElementById('question-1').style.display = 'block';
    document.querySelector('.welcome-text').style.display = 'block';
}

function nextQuestion(questionNumber, userAnswer) {
    if (questionNumber !== currentQuestion) {
        return; // Если номер вопроса не совпадает с текущим, ничего не делаем
    }

    // Скрываем текст приветствия после ответа на первый вопрос
    if (currentQuestion === 1) {
        document.querySelector('.welcome-text').style.display = 'none';
        document.querySelector('.call-button').style.display = 'block'; // Показываем кнопку "Позвонить"
    }

    // Добавляем ответ пользователя в чат
    const userAnswerMessage = document.createElement("div");
    userAnswerMessage.classList.add("chat-message", "user-answer");

    const userAvatar = document.createElement("div");
    userAvatar.classList.add("avatar");
    userAvatar.style.backgroundColor = "#007bff"; // Цвет аватара пользователя

    const userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.textContent = userAnswer;

    userAnswerMessage.appendChild(userAvatar);
    userAnswerMessage.appendChild(userMessage);
    document.querySelector(".chat").appendChild(userAnswerMessage);

    // Появляется следующий вопрос
    if (currentQuestion < totalQuestions) {
        const nextQuestionData = questions[currentQuestion];

        const nextQuestion = document.createElement("div");
        nextQuestion.classList.add("chat-message", "operator");
        nextQuestion.innerHTML = `
            <div class="avatar operator-avatar">
						<img src="./img/olga.gif" alt="avatar"></div>
            <div class="message">${nextQuestionData.text}</div>
            <div class="options">
                ${nextQuestionData.options.map(option => 
                    `<button class="option" onclick="nextQuestion(${currentQuestion + 1}, '${option}')">${option}</button>`
                ).join('')}
            </div>
        `;
        document.querySelector(".chat").appendChild(nextQuestion);
        currentQuestion++;
    } else {
        // После последнего вопроса форма для имени и телефона
        const endMessage = document.createElement("div");
        endMessage.classList.add("chat-message", "operator");
        endMessage.innerHTML = `
            <div class="avatar operator-avatar">
						<img src="./img/olga.gif" alt="avatar"></div>
            <div class="message">Залиште номер телефону, щоб ми могли з вами організувати зустріч.</div>
        `;
        document.querySelector(".chat").appendChild(endMessage);

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("placeholder", "Ваше ім'я");
        document.querySelector(".chat").appendChild(nameInput);

        const phoneMessage = document.createElement("div");
        phoneMessage.classList.add("chat-message", "operator");
        phoneMessage.innerHTML = `
            <div class="avatar operator-avatar">
						<img src="./img/olga.gif" alt="avatar"></div>
            <div class="message">номер телефону:</div>
        `;
        document.querySelector(".chat").appendChild(phoneMessage);

        const phoneInput = document.createElement("input");
        phoneInput.setAttribute("type", "tel");
        phoneInput.setAttribute("placeholder", "Ваш телефон");
        document.querySelector(".chat").appendChild(phoneInput);

        const submitButton = document.createElement("button");
        submitButton.classList.add("submit-button");
        submitButton.textContent = "Відправити";
        submitButton.onclick = submitForm;
        document.querySelector(".chat").appendChild(submitButton);
    }

    // Обновляем прогресс-бар
    const progress = (currentQuestion) * (100 / totalQuestions);
    document.querySelector('.progress').style.width = `${progress}%`;

    // Скролл вниз
    window.scrollTo(0, document.body.scrollHeight);
}

function submitForm() {
    const name = document.querySelector("input[type='text']").value;
    const phone = document.querySelector("input[type='tel']").value;

    // Отображаем благодарность
    document.querySelector('.quiz-screen').style.display = 'none';
    document.querySelector('.final-screen').style.display = 'block';
    document.getElementById('final-message').textContent = `Дякую, ${name}! Дані успішно відправлені.`;
}
