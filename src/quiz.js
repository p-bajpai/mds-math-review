function generateQuiz(containerId, title, question, options, correctAnswer) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const questionTitle = document.createElement('p');
    questionTitle.textContent = title;
    questionTitle.style.fontWeight = 'bold';
    questionTitle.style.color = '#283791';
    questionTitle.style.marginBottom = '0px';
    container.appendChild(questionTitle);

    const questionElement = document.createElement('p');
    questionElement.innerHTML = question;
    questionElement.style.marginBottom = '5px';
    container.appendChild(questionElement);

    const form = document.createElement('form');
    form.id = `form-${containerId}`;

    const messageElement = document.createElement('div');
    messageElement.style.opacity = 0;
    messageElement.style.transition = 'opacity 0.2s ease-in-out';
    messageElement.style.display = 'none';
    messageElement.style.color = 'black';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.marginTop = '10px';
    messageElement.style.fontSize = '15px';

    const messageBody = document.createElement('div');
    messageElement.appendChild(messageBody);

    Object.entries(options).forEach(([option, explanation], index) => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.style.display = 'grid';
        div.style.gridTemplateColumns = 'auto 1fr';
        div.style.alignItems = 'center';
        div.style.marginBottom = '5px';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `quiz-${containerId}`;
        input.value = option;
        input.className = 'form-check-input me-2';
        input.id = `option-${containerId}-${index}`;
        input.style.borderColor = '#4853A4';
        input.style.boxShadow = 'none';
        input.style.outline = 'none';

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', input.id);
        label.innerHTML = option;

        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    });

    container.appendChild(form);

    // ✅ NEW: Check Answer button
    const checkButton = document.createElement('button');
    checkButton.type = 'button';
    checkButton.textContent = 'Check Answer';
    checkButton.className = 'btn btn-primary';
    checkButton.style.marginTop = '10px';
    checkButton.style.backgroundColor = '#283791';
    checkButton.style.borderColor = '#283791';

    container.appendChild(checkButton);
    container.appendChild(messageElement);

    checkButton.addEventListener('click', function () {
        const selected = form.querySelector('input:checked');

        if (!selected) {
            messageBody.innerHTML = `<strong>Please select an answer.</strong>`;
            messageElement.style.backgroundColor = '#FFF3CD';
            messageElement.style.borderLeft = '5px solid #FFCC00';
        } else if (selected.value === correctAnswer) {
            const emojis = ["🍀", "🎉", "🌈", "🚀", "🌟", "✨", "💯"];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];

            messageBody.innerHTML =
                `<strong style="color:#0BB5D4 !important; font-size:16px">
                    Correct! &nbsp;${emoji}
                </strong><br>` +
                options[selected.value];

            messageElement.style.backgroundColor = '#E8FAFD';
            messageElement.style.borderLeft = '5px solid #0BB5D4';
        } else {
            messageBody.innerHTML =
                `<strong style="color:#283791 !important; font-size:16px">
                    Incorrect
                </strong><br>` +
                options[selected.value];

            messageElement.style.backgroundColor = '#EAEDFA';
            messageElement.style.borderLeft = '5px solid #283791';
        }

        messageElement.style.display = 'block';
        setTimeout(() => messageElement.style.opacity = 1, 10);
    });

    const spacing = document.createElement('div');
    spacing.style.marginBottom = '30px';
    container.appendChild(spacing);
}



function generateMultiQuiz(containerId, title, question, options, correctAnswers) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const questionTitle = document.createElement('p');
    questionTitle.textContent = title;
    questionTitle.style.fontWeight = 'bold';
    questionTitle.style.color = '#283791';
    questionTitle.style.marginBottom = '0px';
    container.appendChild(questionTitle);

    const questionElement = document.createElement('p');
    questionElement.innerHTML = question;
    questionElement.style.marginBottom = '5px';
    container.appendChild(questionElement);

    const form = document.createElement('form');
    form.id = `form-${containerId}`;

    Object.entries(options).forEach(([option, explanation], index) => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.style.display = 'grid';
        div.style.gridTemplateColumns = 'auto 1fr';
        div.style.alignItems = 'center';
        div.style.marginBottom = '5px';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = `quiz-${containerId}`;
        input.value = option;
        input.dataset.explanation = explanation;
        input.className = 'form-check-input me-2';
        input.id = `option-${containerId}-${index}`;
        input.style.borderColor = '#4853A4';
        input.style.boxShadow = 'none';
        input.style.outline = 'none';

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', input.id);
        label.innerHTML = option;

        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    });

    container.appendChild(form);

    const checkButton = document.createElement('button');
    checkButton.type = 'button';
    checkButton.textContent = 'Check Answer';
    checkButton.className = 'btn btn-primary';
    checkButton.style.marginTop = '10px';
    checkButton.style.backgroundColor = '#283791';
    checkButton.style.borderColor = '#283791';

    container.appendChild(checkButton);

    const messageElement = document.createElement('div');
    messageElement.style.opacity = 0;
    messageElement.style.transition = 'opacity 0.2s ease-in-out';
    messageElement.style.display = 'none';
    messageElement.style.color = 'black';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.marginTop = '10px';
    messageElement.style.fontSize = '15px';

    const messageBody = document.createElement('div');
    messageElement.appendChild(messageBody);

    container.appendChild(messageElement);

    checkButton.addEventListener('click', function () {

        const selected = Array.from(
            form.querySelectorAll('input:checked')
        ).map(input => input.value);

        const isCorrect =
            selected.length === correctAnswers.length &&
            selected.every(answer => correctAnswers.includes(answer));

        let feedback = '';

        selected.forEach(answer => {
            const explanation = options[answer];
            if (explanation && explanation.trim() !== '') {
                feedback += `<p><strong>${answer}</strong><br>${explanation}</p>`;
            }
        });

        if (isCorrect) {
            const emojis = ["🍀", "🎉", "🌈", "🚀", "🌟", "✨", "💯"];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];

            messageBody.innerHTML =
                `<strong style="color:#0BB5D4 !important; font-size:16px">
                    All correct! &nbsp;${emoji}
                </strong><br>` +
                feedback;

            messageElement.style.backgroundColor = '#E8FAFD';
            messageElement.style.borderLeft = '5px solid #0BB5D4';
        } else {

            messageBody.innerHTML =
                `<strong style="color:#283791 !important; font-size:16px">
                    At least one selection is incorrect.
                </strong><br>` +
                feedback;

            messageElement.style.backgroundColor = '#EAEDFA';
            messageElement.style.borderLeft = '5px solid #283791';
        }

        messageElement.style.display = 'block';
        setTimeout(() => messageElement.style.opacity = 1, 10);
    });

    const spacing = document.createElement('div');
    spacing.style.marginBottom = '30px';
    container.appendChild(spacing);
}