CREATE TABLE Pharmacist (
    Pharm_id char(12) not null unique,
    Pharm_name varchar(50) not null,
    Pharm_email varchar(50) not null unique,
    Pharm_address varchar(250) not null,
    Pharm_mobile varchar(12) not null,
    Pharm_gender char(1) not null,
    User_name varchar(20) not null unique,
    Password char(60) not null,
    PRIMARY KEY (Pharm_id)
);

CREATE TABLE Customer (
    Cust_id char(12) not null,
    Cust_name varchar(50) not null,
    Cust_age int not null,
    Cust_gender char(1) not null,
    Cust_address varchar(250) not null,
    Cust_mobileno varchar(12) not null,
    PRIMARY KEY (Cust_id)
);

CREATE TABLE Medicine (
    Med_id SERIAL,
    Med_name varchar(50) not null,
    Med_price int not null,
    Purch_date date not null,
    Pharm_id char(12),
    Cust_id char(12),
    PRIMARY KEY (Med_id),
    FOREIGN KEY (Pharm_id) REFERENCES Pharmacist(Pharm_id) on delete cascade,
    FOREIGN KEY (Cust_id) REFERENCES Customer(Cust_id) on delete cascade
);

CREATE VIEW PURCHASES AS SELECT Med_price, Purch_date FROM Medicine;
