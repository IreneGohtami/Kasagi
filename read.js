/**********************************************************
 * Challenge B
 **********************************************************/

const fs = require('fs');

function printObject(object) {
  const trimmedObject = object.trim();
  const stdout = process.stdout;

  // Helper function to write content in chunks to avoid memory issues
  const writeInChunks = (type, content) => {
    stdout.write(`${type}\n`);

    const chunkSize = 1024 * 16; // 16KB chunks
    for (let i = 0; i < content.length; i += chunkSize) {
      stdout.write(content.slice(i, i + chunkSize));
    }
    stdout.write('\n\n');
  };

  if (/^[A-Za-z]+$/.test(trimmedObject)) {
    writeInChunks('Alphabetical String', trimmedObject);
  } else if (/^-?\d+\.\d+$/.test(trimmedObject)) {
    writeInChunks('Real Number', trimmedObject);
  } else if (/^-?\d+$/.test(trimmedObject)) {
    writeInChunks('Integer', trimmedObject);
  } else if (/^[A-Za-z0-9]+$/.test(trimmedObject)) {
    writeInChunks('Alphanumeric', trimmedObject);
  } else {
    writeInChunks('Others', trimmedObject);
  }
}

async function readFile(inputFile) {
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(inputFile, {
      encoding: 'utf8',
      highWaterMark: 1024 * 1024
    });

    let buffer = '';

    reader.on('data', chunk => {
      buffer += chunk;

      let divider;
      while ((divider = buffer.indexOf(',')) !== -1) { // Print object when we find comma
        const object = buffer.slice(0, divider);
        buffer = buffer.slice(divider + 1);
        printObject(object);
      }
    });

    reader.on('end', () => {
      if (buffer.length > 0) {
        printObject(buffer); // Print the last object
      }
      resolve();
    });

    reader.on('error', reject);
  });
}

module.exports = { readFile };