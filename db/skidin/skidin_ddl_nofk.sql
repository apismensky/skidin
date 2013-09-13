DROP TABLE DiagramParts;
DROP TABLE Diagram;
DROP TABLE ProdCodeDate;
DROP TABLE ProdCode;
DROP TABLE Model;
DROP TABLE Body;
DROP TABLE Series;
DROP TABLE Subgroups;
DROP TABLE Groups;

CREATE TABLE Series (
	ID	char(4)	PRIMARY KEY,
	Name	varchar(30) NOT NULL
);

CREATE TABLE Body (
	ID	char(3)	PRIMARY KEY,
	Name	varchar(10) NOT NULL
);

CREATE TABLE Model (
	ID	char(10) PRIMARY KEY,
	SID	char(4) NOT NULL,
	BID	char(3)	NOT NULL,
	Name	varchar(40) NOT NULL,
	Region	char(3) NOT NULL
);

CREATE TABLE Groups (
	ID	integer PRIMARY KEY,
	Name	varchar(100) NOT NULL
);

CREATE TABLE Subgroups (
	ID	char(5) PRIMARY KEY,
	GID	integer REFERENCES Groups(ID),
	SID	integer NOT NULL,
	Name	varchar(100) NOT NULL
);

CREATE TABLE ProdCode (
	ID	char(10) PRIMARY KEY,
	MID	char(10) NOT NULL,
	BID	char(3) NOT NULL,
	SID	char(4) NOT NULL,
	Region  char(3) CHECK (Region = 'US' OR Region = 'ECE'),
	Engine	varchar(10) NOT NULL,
	Steering char(1) CHECK (Steering = 'L' OR Steering = 'R'),
	Description varchar(200)
);

CREATE TABLE ProdCodeDate (
	ID	char(20) PRIMARY KEY,
	PID	char(10) NOT NULL,
	ProdMonth Date NOT NULL
);

CREATE TABLE Diagram (
	ID	char(15) PRIMARY KEY,
	PID	char(20) NOT NULL,
	SGID	char(5) NOT NULL,
	Name	varchar(200) NOT NULL,
	Image	varchar(100)
);

CREATE TABLE DiagramParts (
	ID	char(20) PRIMARY KEY,
	DID	char(15) NOT NULL,
	DNO	integer,
	Description varchar(200),
	Supplement  varchar(50),
	QTY	integer,
	FromDate Date,
	UpToDate Date,
	PartNo	char(11) NOT NULL,
	Price	money,
	Notes	varchar(100), 
	Photo	boolean default false
);

commit;

	
