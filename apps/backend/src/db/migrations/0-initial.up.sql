CREATE TABLE notes (
  x smallint NOT NULL CHECK (x BETWEEN -256 AND 255),
  y smallint NOT NULL CHECK(y BETWEEN -256 AND 255),
  note varchar(255) NOT NULL,
  -- meta
  createdAt timestamp default current_timestamp,
  PRIMARY KEY (x,y) 
);
