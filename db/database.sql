create TABLE user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
)

create TABLE note(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    text VARCHAR(255),
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES user (id)
)