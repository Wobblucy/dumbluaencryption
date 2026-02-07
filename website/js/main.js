const App = {
    stages: [
        'Validating license hash format...',
        'Extracting identity segments...',
        'Deriving environment key (Key A)...',
        'Applying character binding (Key B)...',
        'Computing temporal salt (Key C)...',
        'Splitting execution blocks...',
        'Flattening control flow...',
        'Erasing symbol table...',
        'Injecting decoy branches...',
        'Embedding integrity signatures...',
        'Binding to temporal window...',
        'Encrypting payload data...',
        'Generating decryption stub...',
        'Building self-modifying loader...',
        'Packaging addon structure...',
        'Compilation complete!'
    ],

    currentHash: null,
    obfuscatedResult: null
};

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function showError(message) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error-message').classList.add('hidden');
}

function updateProgress(percent) {
    document.getElementById('progress-bar').style.width = percent + '%';
}

function updateStatus(text) {
    document.getElementById('status-text').textContent = text;
}

function updateStageList(completedIndex) {
    const list = document.getElementById('stage-list');
    list.innerHTML = '';

    App.stages.forEach((stage, index) => {
        const li = document.createElement('li');
        li.textContent = stage;

        if (index < completedIndex) {
            li.classList.add('complete');
        } else if (index === completedIndex) {
            li.classList.add('active');
        } else {
            li.classList.add('pending');
        }

        list.appendChild(li);
    });

    const activeItem = list.querySelector('.active');
    if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startCompilation() {
    hideError();

    const hashInput = document.getElementById('hash-input').value;
    const validation = HashValidator.validate(hashInput);

    if (!validation.valid) {
        showError(validation.error);
        return;
    }

    App.currentHash = validation.normalized;

    document.getElementById('compile-btn').disabled = true;
    document.getElementById('hash-input').disabled = true;
    showSection('processing-section');

    for (let i = 0; i < App.stages.length; i++) {
        const progress = ((i + 1) / App.stages.length) * 100;
        updateProgress(progress);
        updateStatus(App.stages[i]);
        updateStageList(i);

        const baseDelay = 200;
        const variance = Math.random() * 300;
        await delay(baseDelay + variance);
    }

    try {
        App.obfuscatedResult = Obfuscator.obfuscate(App.currentHash);

        await delay(500);

        document.getElementById('final-hash').textContent = App.currentHash;
        document.getElementById('expiry-notice').textContent =
            'Expires: ' + App.obfuscatedResult.expiryDate + ' (15 minutes from generation)';

        showSection('download-section');

    } catch (error) {
        console.error('Compilation error:', error);
        showError('Compilation failed: ' + error.message);
        showSection('input-section');
    }

    document.getElementById('compile-btn').disabled = false;
    document.getElementById('hash-input').disabled = false;
}

function downloadPackage() {
    if (App.obfuscatedResult) {
        ZipBuilder.triggerDownload(App.obfuscatedResult);

        setTimeout(function() {
            showSection('steps-section');
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hashInput = document.getElementById('hash-input');
    const compileBtn = document.getElementById('compile-btn');
    const downloadBtn = document.getElementById('download-btn');

    hashInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.toUpperCase();
    });

    hashInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startCompilation();
        }
    });

    compileBtn.addEventListener('click', startCompilation);
    downloadBtn.addEventListener('click', downloadPackage);

    hashInput.focus();
});
