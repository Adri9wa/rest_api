create TABLE persons(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    nickname VARCHAR(255),
    created_at DATE NOT NULL,
);

create TABLE orders(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    created_at DATE NOT NULL,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES persons (id),
);

create TABLE notes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    text VARCHAR(255),
    created_at DATE NOT NULL,
    person_id INTEGER,
    order_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES persons (id),
    FOREIGN KEY (order_id) REFERENCES orders (id),
);