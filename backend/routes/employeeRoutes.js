const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// get all
router.get("/", (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) return res.json({ error: err });
        res.json(result);
    });
});

// get one
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM employee WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.json({ error: err });
        res.json(result[0]);
    });
});

// add
router.post("/", upload.single("image"), (req, res) => {

    const sql = `
        INSERT INTO employee
        (employee_id, name, department, designation, project, type, status, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        req.body.employee_id,
        req.body.name,
        req.body.department,
        req.body.designation,
        req.body.project,
        req.body.type,
        req.body.status,
        req.file ? req.file.filename : null
    ];

    db.query(sql, values, (err) => {
        if (err) return res.json({ error: err });
        res.json({ message: "Employee added successfully" });
    });
});

// update
router.put("/:id", upload.single("image"), (req, res) => {

    let sql, values;

    if (req.file) {
        sql = `
            UPDATE employee
            SET employee_id=?, name=?, department=?, designation=?, project=?, type=?, status=?, image=?
            WHERE id=?
        `;

        values = [
            req.body.employee_id,
            req.body.name,
            req.body.department,
            req.body.designation,
            req.body.project,
            req.body.type,
            req.body.status,
            req.file.filename,
            req.params.id
        ];
    } else {
        sql = `
            UPDATE employee
            SET employee_id=?, name=?, department=?, designation=?, project=?, type=?, status=?
            WHERE id=?
        `;

        values = [
            req.body.employee_id,
            req.body.name,
            req.body.department,
            req.body.designation,
            req.body.project,
            req.body.type,
            req.body.status,
            req.params.id
        ];
    }

    db.query(sql, values, (err) => {
        if (err) return res.json({ error: err });
        res.json({ message: "Employee updated successfully" });
    });
});

// delete
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM employee WHERE id=?", [req.params.id], (err) => {
        if (err) return res.json({ error: err });
        res.json({ message: "Employee deleted successfully" });
    });
});

module.exports = router;