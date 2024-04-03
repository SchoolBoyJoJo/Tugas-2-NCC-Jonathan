const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./connection');
const app = express();
const PORT = process.env.PORT || 5000;
// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create data / insert data
app.post('/api/bootcamp', (req, res) => {
    const data = { ...req.body };
    const querySql = 'INSERT INTO bootcamp SET ?';

    // Validasi: Pastikan semua field terisi sebelum melakukan insert
    const requiredFields = ['name', 'description', 'website', 'phone', 'email', 'address'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ message: 'Semua field harus diisi!', missingFields, success: false });
    }

    koneksi.query(querySql, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data!', error: err });
        }

        res.status(201).json({ success: true, message: 'Berhasil insert data!' });
    });
});


// read data / get data
app.get('/api/bootcamp/:id', (req, res) => {
    const id = req.params.id; // Ambil ID dari parameter URL

    // Buat query SQL dengan kondisi WHERE berdasarkan ID
    const querySql = `SELECT * FROM bootcamp WHERE id = ${id}`;

    // Jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // Error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // Jika request berhasil
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }

        res.status(200).json({ success: true, data: rows[0] });
    });
});

// update data
app.put('/api/bootcamp/:id', (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryUpdate = 'UPDATE bootcamp SET ? WHERE id = ?';

    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query update
            koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika update berhasil
                res.status(200).json({ success: true, message: 'Berhasil update data!' });
            });
        } else {
            return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
});

// delete data
app.delete('/api/bootcamp/:id', (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryDelete = 'DELETE FROM bootcamp WHERE id = ?';

    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query delete
            koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika delete berhasil
                res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
            });
        } else {
            return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
});

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
