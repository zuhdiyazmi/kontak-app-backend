const db = require("./database/conn");
const express = require("express");
const { v4 } = require("uuid");

const app = express();

app.use(express.json());

app.get("/tbKontak", (req, res) => {
  db.query("SELECT * FROM kontak", (err, rows) => {
    if (err)
      return res.json({
        ok: false,
        message: err,
      });
    return res.json({
      ok: true,
      data: rows,
    });
  });
});

app.post("/tbKontak", (req, res) => {
  db.query(
    "SELECT * FROM kontak WHERE id = ?",
    req.body.id,
    (err, listKontak) => {
      console.log(listKontak);
      if (listKontak.length >= 1) {
        return res.json({
          ok: false,
          message: "id: " + req.body.id + " telah digunakan",
        });
      } else if (err) {
        return res.json({
          ok: false,
          message: err,
        });
      } else {
        db.query("INSERT INTO kontak SET ?", req.body, (err, rows) => {
          if (err)
            return res.json({
              ok: false,
              message: "gagal",
            });
          return res.json("add berhasil");
        });
      }
    }
  );
});

app.get("/tbKontak/:id", (req, res) => {
  console.log(req.params);
  db.query("SELECT * FROM kontak WHERE id = ?", req.params.id, (err, rows) => {
    console.log(rows);
    if (err) {
      return res.json({
        ok: false,
        message: err,
      });
    } else if (rows.length === 0) {
      return res.json({
        ok: false,
        message: "id: " + req.params.id + " tidak ditemukan",
      });
    }
    return res.json({
      ok: true,
      data: rows,
    });
  });
});

app.put("/tbKontak/:id", (req, res) => {
  db.query("SELECT * FROM kontak WHERE id = ?", req.params.id, (err, rows) => {
    console.log(rows);
    if (err) {
      return res.json({
        ok: false,
        message: err,
      });
    } else if (rows.length === 0) {
      return res.json({
        ok: false,
        message: "id: " + req.params.id + " tidak ditemukan",
      });
    } else {
      db.query(
        "SELECT * FROM kontak WHERE id = ?",
        req.body.id,
        (err, rows) => {
          console.log(rows);
          if (err) {
            return res.json({
              ok: false,
              message: err,
            });
          } else if (rows.length >= 1) {
            return res.json({
              ok: false,
              message:
                "gagal edit id: " +
                req.params.id +
                " karena id: " +
                req.body.id +
                " telah digunakan",
            });
          } else
            db.query(
              "UPDATE kontak SET ? WHERE id = ?",
              [req.body, req.params.id],
              (err, rows) => {
                if (err)
                  return res.json({
                    ok: false,
                    message: "edit gagal untuk id: " + req.params.id,
                  });
                return res.json("edit berhasil");
              }
            );
        }
      );
    }
  });
});

app.delete("/tbKontak/:id", (req, res) => {
  db.query("SELECT * FROM kontak WHERE id = ?", req.params.id, (err, rows) => {
    console.log(rows);
    if (err) {
      return res.json({
        ok: false,
        message: err,
      });
    } else if (rows.length === 0) {
      return res.json({
        ok: false,
        message: "id: " + req.params.id + " tidak ditemukan",
      });
    } else {
      db.query(
        "DELETE FROM kontak WHERE id = ?",
        req.params.id,
        (err, rows) => {
          if (err)
            return res.json({
              ok: false,
              message: "delete gagal untuk id: " + req.params.id,
            });
          return res.json("delete berhasil");
        }
      );
    }
  });
});

let port = 3000;

app.listen(port, () => {
  console.log("started at ", port);
});
