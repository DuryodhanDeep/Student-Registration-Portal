DROP TABLE IF EXISTS student;

CREATE TABLE student(
	roll_no int primary key,
	name varchar(50),
	email varchar(50),
	department varchar (50),
	batch int,
	mobileNo char(15),
	address varchar(200),
	password varchar(200)
);

SELECT * FROM student;
SELECT * FROM student WHERE email = 'duryodhandeep123@gmail.com';

DROP TABLE IF EXISTS instructor;

CREATE TABLE instructor(
	ID int primary key,
	name varchar(50),
	email varchar(50),
	department varchar (50),
	mobileNo char(15),
	address varchar(200),
	password varchar(200)
);

SELECT * FROM instructor;

select * from instructor where email='duryodhandeep123@gmai.com';

DROP TABLE IF EXISTS admin;

CREATE TABLE admin(
	ID int primary key,
	name varchar(50),
	email varchar(50),
	mobileNo char(15),
	address varchar(200),
	password varchar(200)
);


DROP TABLE IF EXISTS course;

CREATE TABLE course(
	course_ID varchar(10) ,
	course_name varchar (50),
	department varchar(50),
	instructor_ID int
);


DROP TABLE IF EXISTS takes;

CREATE TABLE takes(
	roll_no int,
	course_ID varchar(10) ,
	semester int,
	grade varchar(10)
);