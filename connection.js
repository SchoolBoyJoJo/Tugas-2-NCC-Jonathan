const mysql = require('mysql2');
// buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: 'localhost', //127.0.0.1
    user: 'root',
    password: '',
    database: 'testapi',
    multipleStatements: true
});
// koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;