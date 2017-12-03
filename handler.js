const ssh2 = require('ssh2');
const Client = ssh2.Client;
const fs = require('fs');

exports.sshExec = (params) => {

  return new Promise(function(resolve, reject) {

    // Set Private Key
    let privateKey = params.PRIVATE_KEY || null;
    if (privateKey && fs.lstatSync(privateKey).isFile()) {
      privateKey = fs.readFileSync(privateKey)  ;
    }

    const cmd = params.CMD;
    const connectionOptions = {
      host: params.HOST,
      port: params.PORT || '22',
      username: params.USER_NAME,
      passphrase: params.PASSPHRASE || null,
      password: params.PASSWORD || null,
      privateKey,
    };

    const conn = new Client();
    conn.on('ready', function() {
      conn.exec(cmd, {'pty': true}, function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
          reject({
            close: 'Stream :: close :: code: ' + code + ', signal: ' + signal
          });
          conn.end();
        }).on('data', function(data) {
          conn.end();
          resolve({
            stdout: data.toString()
          })
        }).stderr.on('data', function(data) {
          reject({
            stderr: data.toString()
          });
        });
      });
    }).connect(connectionOptions);
  });
}
