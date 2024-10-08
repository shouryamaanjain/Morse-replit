document.addEventListener('DOMContentLoaded', () => {
    const inputTextarea = document.getElementById('input-text');
    const outputTextarea = document.getElementById('output-text');
    const englishToMorseBtn = document.getElementById('english-to-morse');
    const morseToEnglishBtn = document.getElementById('morse-to-english');

    let currentDirection = 'english_to_morse';

    function setDirection(direction) {
        currentDirection = direction;
        if (direction === 'english_to_morse') {
            englishToMorseBtn.classList.add('active');
            morseToEnglishBtn.classList.remove('active');
        } else {
            englishToMorseBtn.classList.remove('active');
            morseToEnglishBtn.classList.add('active');
        }
        translate();
    }

    englishToMorseBtn.addEventListener('click', () => setDirection('english_to_morse'));
    morseToEnglishBtn.addEventListener('click', () => setDirection('morse_to_english'));

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    async function translate() {
        const inputText = inputTextarea.value;

        try {
            const response = await fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    direction: currentDirection,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            outputTextarea.value = data.result;
        } catch (error) {
            console.error('Error:', error);
            outputTextarea.value = 'An error occurred during translation.';
        }
    }

    const debouncedTranslate = debounce(translate, 300);

    inputTextarea.addEventListener('input', debouncedTranslate);

    // Initial translation
    setDirection('english_to_morse');
});
