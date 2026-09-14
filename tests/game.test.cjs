const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = ['assets/questions.js', 'assets/game.js']
    .map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');

// A small view/clock harness: checks game behavior without browser dependencies.
// It does not replace a visual or accessibility review in a real browser.
function createGame(reduceMotion = false) {
    const pending = [];
    const app = {
        innerHTML: '', style: {}, attributes: {}, buttons: [],
        setAttribute(name, value) { this.attributes[name] = value; },
        querySelectorAll() { return this.buttons; },
        focus() {},
    };
    const context = vm.createContext({
        document: { getElementById: () => app, querySelector: () => null },
        window: { matchMedia: () => ({ matches: reduceMotion }), scrollTo() {} },
        setTimeout(callback, delay) { pending.push({ callback, delay }); },
    });
    vm.runInContext(source, context);
    const run = expression => vm.runInContext(expression, context);
    const flush = () => {
        while (pending.length) pending.shift().callback();
        app.buttons = [...app.innerHTML.matchAll(/<button\b/g)].map(() => ({ disabled: false }));
    };
    flush();
    const answer = index => run(`handleAnswer(${index}, state.currentQIndex)`);
    const correct = () => answer(run('questionsData[state.currentQIndex].options.findIndex(option => option.isCorrect)'));
    return { app, pending, run, flush, answer, correct };
}

test('all 20 questions have four choices, one safe path and complete death explanations', () => {
    const game = createGame();
    const data = JSON.parse(game.run('JSON.stringify(questionsData)'));
    assert.equal(data.length, 20);
    for (const question of data) {
        assert.ok(question.desc && question.time && question.label);
        assert.equal(question.options.length, 4);
        assert.equal(question.options.filter(option => option.isCorrect).length, 1);
        for (const option of question.options) {
            assert.ok(option.text);
            if (!option.isCorrect) assert.ok(option.reason);
        }
    }
    const covered = JSON.parse(game.run('JSON.stringify(timelineStages.flatMap(stage => Array.from({length: stage.range[1] - stage.range[0] + 1}, (_, i) => stage.range[0] + i)))'));
    assert.deepEqual(covered, data.map((_, index) => index));
});

test('a double click advances once and an old question button cannot answer the next question', () => {
    const game = createGame();
    assert.match(game.app.innerHTML, /开始挑战/);
    game.run('startGame()');
    game.flush();
    const index = game.run('questionsData[0].options.findIndex(option => option.isCorrect)');
    game.run(`handleAnswer(${index}, 0); handleAnswer(${index}, 0);`);
    assert.ok(game.app.buttons.every(button => button.disabled));
    assert.equal(game.app.attributes['aria-busy'], 'true');
    game.flush();
    assert.match(game.app.innerHTML, /第 2\/20 题/);
    const view = game.app.innerHTML;
    game.run(`handleAnswer(${index}, 0)`);
    game.flush();
    assert.equal(game.app.innerHTML, view);
    assert.equal(game.app.attributes['aria-busy'], 'false');
});

test('every wrong choice shows its death reason; revival stays on the same question', () => {
    const data = JSON.parse(createGame().run('JSON.stringify(questionsData)'));
    for (let question = 0; question < data.length; question++) {
        for (let choice = 0; choice < 4; choice++) {
            const option = data[question].options[choice];
            if (option.isCorrect) continue;
            const game = createGame();
            game.run('startGame()');
            game.flush();
            for (let passed = 0; passed < question; passed++) {
                game.correct();
                game.flush();
            }
            game.answer(choice);
            game.flush();
            assert.match(game.app.innerHTML, /你死了/);
            assert.ok(game.app.innerHTML.includes(option.reason));
            if (option.achievement) assert.ok(game.app.innerHTML.includes(option.achievement.name));
            game.run('retryCurrent()');
            game.flush();
            assert.ok(game.app.innerHTML.includes(`第 ${question + 1}/20 题`));
            game.correct();
            game.flush();
            assert.match(game.app.innerHTML, question === 19 ? /恭喜存活/ : new RegExp(`第 ${question + 2}/20 题`));
        }
    }
});

test('all correct choices reach victory and restart returns to a clean home screen', () => {
    const game = createGame();
    game.run('startGame()');
    game.flush();
    for (let question = 0; question < 20; question++) {
        assert.ok(game.app.innerHTML.includes(`第 ${question + 1}/20 题`));
        game.correct();
        game.flush();
    }
    assert.match(game.app.innerHTML, /恭喜存活/);
    assert.match(game.app.innerHTML, /赞美愚者/);
    assert.match(game.app.innerHTML, /⭐/);
    game.run('goHome()');
    game.flush();
    assert.match(game.app.innerHTML, /开始挑战/);
    game.run('startGame()');
    game.flush();
    assert.match(game.app.innerHTML, /第 1\/20 题/);
});

test('reduced motion preserves the answer lock until the next view renders', () => {
    const game = createGame(true);
    game.run('startGame()');
    assert.equal(game.pending[0].delay, 0);
    game.flush();
    game.run('handleAnswer(1, 0); handleAnswer(1, 0)');
    game.flush();
    assert.match(game.app.innerHTML, /第 2\/20 题/);
});

test('the published entry uses existing relative assets and needs no network dependency', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
        assert.ok(asset.startsWith('./'), `Asset must work under a Pages repository subpath: ${asset}`);
        assert.ok(fs.existsSync(path.join(root, asset)), `Missing asset: ${asset}`);
    }
    assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
    const runtime = html + source + fs.readFileSync(path.join(root, 'assets/styles.css'), 'utf8');
    assert.doesNotMatch(runtime, /(?:cdn\.tailwindcss\.com|fonts\.googleapis\.com|@import\s+url)/);
});
