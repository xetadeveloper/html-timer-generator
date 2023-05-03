import { getTemplate } from './template.js';

let savedGeneratedCode = '';

let dateStartTypeElem;
let timeRunToElem;
let providedDateElem;
let dateEndElem;

// Time run options
let daysElem;
let hoursElem;
let minutesElem;
let secondsElem;

window.onload = () => {
    const generateButton = document.getElementById('generate-button');
    const copyButton = document.getElementById('copy-button');
    const form = document.getElementById('form-container');

    // Labels to toggle hide/show based on values in select element
    const providedDateLabel = document.getElementById('provided-date-label');
    const timeCountLabel = document.getElementById('time-count-label');
    const dateCountLabel = document.getElementById('date-count-label');

    dateStartTypeElem = document.getElementById('date-start-type');
    timeRunToElem = document.getElementById('run-to-type');
    providedDateElem = document.getElementById('provided-date');
    dateEndElem = document.getElementById('date-end-selected');

    // Time run options
    daysElem = document.getElementById('days');
    hoursElem = document.getElementById('hours');
    minutesElem = document.getElementById('minutes');
    secondsElem = document.getElementById('seconds');

    daysElem.defaultValue = 5;
    hoursElem.defaultValue = 0;
    minutesElem.defaultValue = 0;
    secondsElem.defaultValue = 0;

    // Event listeners
    if (dateStartTypeElem) {
        dateStartTypeElem.addEventListener('change', ev => {
            const value = ev.target.value;

            if (value === 'now') {
                providedDateLabel.classList.add('hide-item');
                providedDateElem.removeAttribute('required');
            } else {
                providedDateLabel.classList.remove('hide-item');
                providedDateElem.setAttribute('required', '');
            }
        });
    }

    if (timeRunToElem) {
        timeRunToElem.addEventListener('change', ev => {
            const value = ev.target.value;

            if (value === 'time') {
                timeCountLabel.classList.remove('hide-item');
                dateCountLabel.classList.add('hide-item');
                dateEndElem.removeAttribute('required');
            } else if (value === 'date') {
                timeCountLabel.classList.add('hide-item');
                dateCountLabel.classList.remove('hide-item');
                dateEndElem.setAttribute('required', '');
            }
        });
    }

    if (copyButton) {
        copyButton.addEventListener('click', () => {
            if (savedGeneratedCode) {
                navigator.clipboard.writeText(savedGeneratedCode).then(() => {
                    alert('Your code has been copied to your clipboard!');
                });
            } else {
                alert('You have to generate the code first!');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', ev => {
            ev.preventDefault();

            const code = generateCode();
            if (code) {
                const generated = document.getElementById('generated-code');
                generated.textContent = code;
                savedGeneratedCode = code;
                generated.scrollIntoView({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (generateButton) {
        generateButton.addEventListener('click', ev => {
            const generated = document.getElementById('generated-code');
            generated.textContent = '';
            savedGeneratedCode = '';
        });
    }
};

function generateCode() {
    const options = {
        dateStartType: dateStartTypeElem.value,
        runTo: timeRunToElem.value,
    };

    // Date start
    if (options.dateStartType === 'provided' && providedDateElem.value) {
        options.providedDateStart = providedDateElem.value;
    }

    // Run to type
    if (options.runTo === 'time') {
        options.timeRun = {};
        options.timeRun.days = daysElem.value;
        options.timeRun.hours = hoursElem.value;
        options.timeRun.minutes = minutesElem.value;
        options.timeRun.seconds = secondsElem.value;
    } else if (options.runTo === 'date') {
        options.dateEndInText = dateEndElem.value;
    }

    if (options.dateEndInText) {
        const dateEnd = Date.parse(options.dateEndInText);
        const dateStart = Date.parse(options.providedDateStart ?? new Date());
        if (dateEnd <= dateStart) {
            alert('Error: End date cannot be before the start/current date.');
            return null;
        }
    }

    return getTemplate(options);
}
