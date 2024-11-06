/**********************************************************
 * Challenge A
 **********************************************************/

const fs = require('fs');

// Predefine constant character sets to avoid recreating them
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const ALPHANUMERIC = LETTERS + '0123456789';

function generateAlphabeticalObject(length) {
  return Array.from({ length }, () => LETTERS.charAt(Math.floor(Math.random() * LETTERS.length))).join('');
}

function generateRealNumberObject(totalDigits) {
  const integerPartLength = Math.floor(Math.random() * (totalDigits - 1)) + 1;
  const decimalPartLength = totalDigits - integerPartLength;

  // Generate both parts in one loop to reduce iterations
  let number = '';
  for (let i = 0; i < totalDigits - 1; i++) {
    number += Math.floor(Math.random() * 10).toString();
    if (i === integerPartLength - 1) number += '.';
  }

  return (Math.random() < 0.5 ? '-' : '') + number; // Allow negative numbers randomly
}

function generateIntegerObject(totalDigits) {
  const chunkSize = 15; // Max digits per Math.random()
  let intVal = '';

  while (intVal.length < totalDigits) {
    intVal += Math.floor(Math.random() * Math.pow(10, chunkSize)).toString();
  }

  return intVal.slice(0, totalDigits);
}

function generateAlphanumericObject(length) {
  const maxSpaces = 10;
  const spacesBefore = ' '.repeat(Math.floor(Math.random() * (maxSpaces + 1)));
  const spacesAfter = ' '.repeat(Math.floor(Math.random() * (maxSpaces + 1)));

  const remainingLength = length - spacesBefore.length - spacesAfter.length;
  const alphanumeric = Array.from({ length: remainingLength },
    () => ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length))
  ).join('');

  return spacesBefore + alphanumeric + spacesAfter;
}

async function writeFile(fileSize, filename) {
  return new Promise((resolve, reject) => {
    // To create a 10MB text file, it would take approximately 10,485,760 characters
    // 1 character = 1 byte
    // 10MB file size in bytes is equal to 10*1024*1024 = 10,485,760 bytes

    const totalNoOfChar = fileSize * 1024 * 1024;
    const noOfCharPerObject = Math.floor(totalNoOfChar / 4) - 1; // -1 to account for the comma

    // Create write stream with optimized buffer size
    const writer = fs.createWriteStream(filename, {
      highWaterMark: 64 * 1024 // 64KB buffer
    });

    writer.write(generateAlphabeticalObject(noOfCharPerObject) + ',');
    writer.write(generateRealNumberObject(noOfCharPerObject) + ',');
    writer.write(generateIntegerObject(noOfCharPerObject) + ',');
    writer.write(generateAlphanumericObject(noOfCharPerObject));
    writer.end();

    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

module.exports = { writeFile };