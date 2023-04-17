// 1. Напишіть простий модуль логування, який підтримує логування повідомлень, для яких
// рівень логування перевищує заданий поріг. Експортуйте функцію log, константи рівнів
// логування та функцію завдання рівня логування. 

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

let logLevelThreshold = logLevels.INFO;

function setLogLevelThreshold(logLevel) {
  logLevelThreshold = logLevel;
}

function log(logLevel, message) {
  if (logLevel <= logLevelThreshold) {
    console.log(`[${new Date().toISOString()}] [${logLevel}] ${message}`);
  }
}

module.exports = {
  logLevels,
  setLogLevelThreshold,
  log
};


// 2. Повторіть попереднє завдання але тепер експортуйте весь класс по замовчуванню.

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3
};

class Logger {
  constructor(logLevel) {
    this.logLevel = logLevel;
  }

  log(level, message) {
    if (LOG_LEVELS[level] >= LOG_LEVELS[this.logLevel]) {
      console.log(`[${level}] ${message}`);
    }
  }

  debug(message) {
    this.log('DEBUG', message);
  }

  info(message) {
    this.log('INFO', message);
  }

  warning(message) {
    this.log('WARNING', message);
  }

  error(message) {
    this.log('ERROR', message);
  }
}

export default Logger;

import Logger from './logger.js';

const logger = new Logger('INFO');
logger.debug('This message will not be logged because the log level is set to INFO.');
logger.info('This message will be logged because the log level is set to INFO.');
logger.warning('This message will also be logged.');
logger.error('This message will be logged as an error.');


// 3. Знайдіть JavaScript-бібліотеку для шифрування (наприклад, https://github.com/brix/cryptojs). Напишіть програму, яка імпортує цю бібліотеку у вигляді ECMAScript і шифрує, а потім
// дешифрує повідомлення.

// Для вирішення цього завдання ми можемо використати бібліотеку CryptoJS. Для початку необхідно встановити бібліотеку за допомогою npm:

npm install crypto-js

import CryptoJS from 'crypto-js';

// Задаємо ключ шифрування
const key = 'my secret key';

// Повідомлення, яке будемо шифрувати
const message = 'Hello, world!';

// Шифруємо повідомлення
const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();

// Дешифруємо повідомлення
const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);

console.log('Encrypted message:', encryptedMessage);
console.log('Decrypted message:', decryptedMessage);


// 4. Напишіть простий модуль шифрування, в якому використовується шифр Цезаря
// (додавання константи до кожної кодової точки). Використайте модуль логування із
// попередніх вправ, щоб протоколювати всі звернення до decrypt.

const { log, LogLevel } = require('./log');

class CaesarCipher {
  #key = 0;

  constructor(key) {
    this.#key = key;
  }

  encrypt(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        result += String.fromCharCode(((code - 65 + this.#key) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(((code - 97 + this.#key) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }

  decrypt(text) {
    log(LogLevel.INFO, 'decrypt', `Decrypting message: ${text}`);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        result += String.fromCharCode(((code - 65 - this.#key + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(((code - 97 - this.#key + 26) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }
}

module.exports = CaesarCipher;


const CaesarCipher = require('./caesar-cipher');
const { log, LogLevel } = require('./log');

const cipher = new CaesarCipher(3);

const originalText = 'Hello, world!';
const encryptedText = cipher.encrypt(originalText);
log(LogLevel.INFO, 'encrypt', `Original: ${originalText}, Encrypted: ${encryptedText}`);

const decryptedText = cipher.decrypt(encryptedText);
log(LogLevel.INFO, 'decrypt', `Encrypted: ${encryptedText}, Decrypted: ${decryptedText}`);


// 5. Напишіть простий модуль, який включає функції як повертають: випадкові цілі числа,
// масиви цілих випадкових чисел і випадкові текстові фрагменти. Використовуйте
// якнайбільше синтаксичних форм export.

// Функція для генерації випадкового цілого числа в діапазоні від min до max (включно)
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функція для генерації масиву з n цілих випадкових чисел в діапазоні від min до max (включно)
export const getRandomIntArray = (n, min, max) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(getRandomInt(min, max));
  }
  return arr;
};

// Функція для генерації випадкового текстового фрагменту довжиною n
export default function getRandomText(n) {
  let text = "";
  let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < n; i++) {
    text += possibleChars.charAt(getRandomInt(0, possibleChars.length - 1));
  }
  return text;
}


import { getRandomInt, getRandomIntArray } from './randomUtils.js';
import getRandomText from './randomUtils.js';

const randomNumber = getRandomInt(1, 10);
const randomIntArray = getRandomIntArray(5, 1, 100);
const randomText = getRandomText(10);

console.log(randomNumber); // виведе випадкове ціле число від 1 до 10
console.log(randomIntArray); // виведе масив з 5 цілих випадкових чисел в діапазоні від 1 до 100
console.log(randomText); // виведе випадковий текстовий фрагмент довжиною 10 символів