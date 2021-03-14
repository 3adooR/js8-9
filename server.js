const express = require('express');
const app = express(), bodyParser = require('body-parser');
const dictionatry = require('./dictionatry.json');
port = 3000;

/**
 * Get translation of the word
 * @param word
 * @param lang
 * @param langTo
 * @returns {string}
 */
const getTranslate = (word, lang, langTo) => {
    let result = '';
    for (let i = 0; i < dictionatry.length; i++) {
        if (dictionatry[i][lang].indexOf(word) !== -1) {
            result = dictionatry[i][langTo];
        }
    }
    return result;
}

// Run server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(process.cwd() + '/app/dist/app/'));
app.get('/', (req, res) => {
    res.status(200).sendFile(process.cwd() + `/app/dist/app/index.html`);
});
app.get(`/api/dictionaty`, (req, res) => {
    res.status(200).json(dictionatry);
});
app.post(`/api/translate`, (req, res) => {
    let success = true;
    let message = '';
    let word = req.body.word;
    let lang = req.body.lang;
    let translate = '';
    if (!word.length || !lang.length) {
        success = false;
        message = 'need more parameters';
    } else {
        translate = getTranslate(word, lang, 'rus');
        message = 'ok';
    }
    if (!translate.length) {
        success = false;
        message = 'unknown word';
    }
    res.status(200).json({
        success: success,
        message: message,
        word: word,
        lang: lang,
        translate: translate,
    });
});
app.listen(port, () => console.log(`Server listening on the port::${port}`));