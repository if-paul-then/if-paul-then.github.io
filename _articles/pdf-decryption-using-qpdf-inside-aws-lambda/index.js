// File system access is required to save the received pdf binary data to
// a file for QPDF to access and to read the decrypted file back.
const fs = require('fs');
// child_process enables invoking of the QPDF executable
const childProcess = require('child_process');
// When invoking QPDF, the /bin and /sharedlib directories must be on the relevant
// path environment variables to ensure QPDF and its dependencies can be found.
process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
process.env.LD_LIBRARY_PATH = `${process.env.LAMBDA_TASK_ROOT}/sharedlib`;

exports.handler = async(event, context) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    const password = event.headers.password; // the decryption password is passed in the "password" header field
    if (!isDefined(password)) throw new Error("Password not set. Set it in header 'password'.");
    if (!event.isBase64Encoded) throw new Error("Binary body expected."); // pdf data is binary and should be base64 encoded
    //TODO: add some max lenghts checks for in and out data
    const inputData = Buffer.from(event.body, 'base64'); // pdf binary data is base64 encoded
    const inputPath = "/tmp/input.pdf"; // the encrypted pdf file is stored here for QPDF to access
    const outputPath = "/tmp/output.pdf"; // QPDF will save the decrypted pdf file here
    
    //TODO: consider converting to base64 stream processing - fs.createWriteStream()
    fs.writeFileSync(inputPath, inputData); // write the encrypted pdf's data to a file for QPDF to access
    
    // invoke QPDF to decrypt the pdf file
    const spawnResult = childProcess.spawnSync("qpdf", ["--decrypt", "--password=" + password, inputPath, outputPath]); //TODO: escape password
    console.log('qpdf result:' + spawnResult.status + ' - ' + spawnResult.stdout + " " + spawnResult.stderr);
    // error handling - see QPDF user manual for possible exit codes
    if (spawnResult.status == 2) { // Errors were found. qpdf was not able to fully process the file.
      throw new Error("Error decrypting file: " + spawnResult.stderr);
    }

    const outputData = fs.readFileSync(outputPath); // read the decrypted pdf file's data to be returned

    return {
      "isBase64Encoded": true, // pdf data is binary and API Gateway expects it to be base64 encoded
      "statusCode": "200",
      "body": outputData.toString('base64'), // set the decrypted pdf data using base64 encoding
      "headers": event.headers["content-type"] // return the same content type that was received since both are pdf files
    };
  }
  catch (err) {
    console.error(err);
    return {
      "statusCode": "500",
      "body": JSON.stringify(err.message),
      "headers": {"content-type": "text/plain"}
    };
  }
};

function isDefined(value) {
  return typeof value !== 'undefined';
}
