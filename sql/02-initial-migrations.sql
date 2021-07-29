

insert into compliment_user (username, email, gender, personality_type_id) values
    ('testUser1','user1@email.com', 'm', 19),
    ('testUser2','user2@email.com','f',30),
    ('testUser3','user3@email.com','m',77);

insert into category (name) values ('sad'),('mad'),('glad');

insert into compliment_information (compliment_text, category_id, personality_type_id) values
    ('you are good',1,19),
    ('youre a good person',2,30),
    ('say something',3,77);

insert into user_category_preference values 
    (1,1),
    (1,2),
    (1,3),
    (2,1),
    (3,2);
