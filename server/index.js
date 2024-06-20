import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: "RegistrationPortal",
  password: `${process.env.DATABASE_PASSWORD}`,
  port: 5432,
});

db.connect()
.then(() => console.log("Connected to PostgreSQL"))
.catch(err => console.error("Error connecting to PostgreSQL:", err));
 
app.post('/submit-signup', async (req, res) => {
    const { userType, email, password, name, mobileNo, userID } = req.body;

    const dbUserType = userType.toLowerCase();

    try {
        
        const checkResult = await db.query(`SELECT * FROM ${dbUserType} WHERE email = $1`, [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send("Email already exists. Try logging in.");
        }

        
        const hash = await bcrypt.hash(password, saltRounds);

        
        const insertQuery = userType === 'Student' ?
            `INSERT INTO ${dbUserType} (roll_no, name, email, mobileNo, password) VALUES ($1, $2, $3, $4, $5)` :
            `INSERT INTO ${dbUserType} (ID, name, email, mobileNo, password) VALUES ($1, $2, $3, $4, $5)`;

        const insertParams = [userID, name, email, mobileNo, hash];

        await db.query(insertQuery, insertParams);

        res.status(201).send('Signup successful! You can login now.');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send('Internal Server Error');
    }
});





app.post('/submit-login', async (req, res) => {
    const { userType, email, password } = req.body;
    const dbUserType = userType.toLowerCase();
  
    console.log("req.body : ", req.body);
  
    try {
      const result = await db.query(`SELECT * FROM ${dbUserType} WHERE email = $1`, [email]);
      console.log("DB query result: ", result.rows);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        console.log("User found: ", user);
  
        const storedHashedPassword = user.password;
  
        bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            res.status(500).send('Internal Server Error');
          } else {
            if (isMatch) {
              res.status(200).send({
                message: 'Login successful!',
                userID: userType === 'Student' ? user.roll_no : user.ID,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileno
              });
            } else {
              res.status(401).send("Incorrect Password");
            }
          }
        });
      } else {
        res.status(404).send("User not found....");
      }
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});