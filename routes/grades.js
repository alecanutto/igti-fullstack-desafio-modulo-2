import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

let apiResponse = [];
let grade = [];

function validFields() {
  if (grade.student == null || grade.student === '') {
    apiResponse.push({ method: "validFields", field: "student", message: "Student é obrigatório" });
  }
  if (grade.subject == null || grade.subject === '') {
    apiResponse.push({ method: "validFields", field: "subject", message: "Subject é obrigatório" });
  }
  if (grade.type == null || grade.type === '') {
    apiResponse.push({ method: "validFields", field: "type", message: "Type é obrigatório" });
  }
  if (!grade.value) {
    apiResponse.push({ method: "validFields", field: "value", message: "Value é obrigatório" });
  }
  if (apiResponse.length > 0) {
    throw new Error(apiResponse.map(err => err.message).join(";"));
  }
}

router.post('/', async (req, res, next) => {
  try {
    grade = req.body;

    validFields();
    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++, student: grade.student, subject: grade.subject,
      type: grade.type, value: grade.value, timestamp: new Date()
    };

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data));

    res.send(grade);
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    grade = req.body;

    validFields();
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(a => a.id == parseInt(req.params.id));

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    await writeFile(global.fileName, JSON.stringify(data));

    res.send(data.grades[index]);
    logger.info(`PUT /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
    logger.info("GET /grades");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(grade => grade.id === parseInt(req.params.id));
    res.send(grade);
    logger.info("GET /grade/:id");
  } catch (error) {
    next(error);
  }
});

router.get("/gradesTotal/:student/:subject", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter(grade => grade.student === req.params.student
      && grade.subject === req.params.subject);

    if (grades.length == 0) {
      res.end();
      return;
    }
    const total = grades.reduce((accum, current) => accum + current.value, 0);
    const result = {
      student: grades[0].student,
      subject: grades[0].subject,
      sumTotal: total
    }
    res.send(result);
    logger.info("GET /gradesTotal/:student/:subject");
  } catch (error) {
    next(error);
  }
});

router.get("/gradesAvg/:subject/:type", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter(grade => grade.subject === req.params.subject && grade.type === req.params.type);

    if (grades.length == 0) {
      res.end();
      return;
    }
    const avg = grades.reduce((accum, current) => accum + current.value, 0) / grades.length;
    const result = {
      subject: grades[0].subject,
      type: grades[0].type,
      average: avg
    }
    res.send(result);
    logger.info("GET /gradesAvg/:subject/:type");

  } catch (error) {
    next(error);
  }
});

router.get("/bestGrades/:subject/:type", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter(grade => grade.subject === req.params.subject && grade.type === req.params.type);

    if (grades.length == 0) {
      res.end();
      return;
    }
    grades.sort((a, b) => b.value - a.value);
    const result = grades.slice(0, 3);
    res.send(result);
    logger.info("GET /bestGrades/:subject/:type");

  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id));
    await writeFile(global.fileName, JSON.stringify(data));

    res.end();
    logger.info(`DELETE / grade /: id - ${req.params.id}`);

  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send(apiResponse);
});

export default router;