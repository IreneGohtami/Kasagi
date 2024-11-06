const { writeFile } = require('./write');
const { readFile } = require('./read');

async function main() {
  try {
    const mode = process.argv[2] ? parseInt(process.argv[2]) : 0; // 0 = both, 1 = write, 2 = read
    const fileSize = process.argv[3] ? parseFloat(process.argv[3]) : 10; // Default 10MB
    const filename = 'files/output.txt';

    if (mode === 1 || mode === 0) {
      await writeFile(fileSize, filename);
    }

    if (mode === 2 || mode === 0) {
      await readFile(filename);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();