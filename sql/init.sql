drop table if exists user_category_preference;
drop table if exists compliment_user;
drop table if exists compliment_information;
drop table if exists category;
drop table if exists personality_type;
drop user if exists app_user;
create user app_user with password 'app_password';
\c postgres app_user;


create table personality_type(
    id serial primary key,
    sensing varchar(3),
    introversion varchar(3),
    feeling varchar(3),
    judging varchar(3)
);

create table category (
    id serial primary key,
    name text unique
);

create table compliment_information(
    id serial primary key,
    compliment_text text unique not null,
    category_id integer references category(id),
    personality_type_id integer references personality_type(id)
);

create table compliment_user (
    id serial primary key,
    username text unique,
    given_name text,
    family_name text,
    email text unique,
    phone_number char(11) unique, --needs to be refactored for proper verification
    gender char(1), -- needs to be refactored for proper verification
    ethnicity text, -- needs to be refactored for proper verification
    dob date,
    locale char(6) default('EN-US'),
    personality_type_id integer references personality_type(id)
);

create table user_category_preference(
    user_id integer references compliment_user(id),
    category_id integer references category(id),
    primary key(user_id, category_id)
);

insert into personality_type(sensing, introversion, feeling, judging) values 
    ('yes','yes','yes','yes'),
    ('yes','yes','yes','no'),
    ('yes','yes','yes','any'),
    ('yes','yes','no','yes'),
    ('yes','yes','no','no'),
    ('yes','yes','no','any'),
    ('yes','yes','any','yes'),
    ('yes','yes','any', 'no'),
    ('yes','yes','any','any'),

    ('yes','no','yes','yes'),
    ('yes','no','yes','no'),
    ('yes','no','yes','any'),
    ('yes','no','no','yes'),
    ('yes','no','no','no'),
    ('yes','no','no','any'),
    ('yes','no','any','yes'),
    ('yes','no','any', 'no'),
    ('yes','no','any','any'),

    ('yes','any','yes','yes'),
    ('yes','any','yes','no'),
    ('yes','any','yes','any'),
    ('yes','any','no','yes'),
    ('yes','any','no','no'),
    ('yes','any','no','any'),
    ('yes','any','any','yes'),
    ('yes','any','any', 'no'),
    ('yes','any','any','any'),

    ('no','yes','yes','yes'),
    ('no','yes','yes','no'),
    ('no','yes','yes','any'),
    ('no','yes','no','yes'),
    ('no','yes','no','no'),
    ('no','yes','no','any'),
    ('no','yes','any','yes'),
    ('no','yes','any', 'no'),
    ('no','yes','any','any'),

    ('no','no','yes','yes'),
    ('no','no','yes','no'),
    ('no','no','yes','any'),
    ('no','no','no','yes'),
    ('no','no','no','no'),
    ('no','no','no','any'),
    ('no','no','any','yes'),
    ('no','no','any', 'no'),
    ('no','no','any','any'),

    ('no','any','yes','yes'),
    ('no','any','yes','no'),
    ('no','any','yes','any'),
    ('no','any','no','yes'),
    ('no','any','no','no'),
    ('no','any','no','any'),
    ('no','any','any','yes'),
    ('no','any','any', 'no'),
    ('no','any','any','any'),

    ('any','yes','yes','yes'),
    ('any','yes','yes','no'),
    ('any','yes','yes','any'),
    ('any','yes','no','yes'),
    ('any','yes','no','no'),
    ('any','yes','no','any'),
    ('any','yes','any','yes'),
    ('any','yes','any', 'no'),
    ('any','yes','any','any'),

    ('any','no','yes','yes'),
    ('any','no','yes','no'),
    ('any','no','yes','any'),
    ('any','no','no','yes'),
    ('any','no','no','no'),
    ('any','no','no','any'),
    ('any','no','any','yes'),
    ('any','no','any', 'no'),
    ('any','no','any','any'),

    ('any','any','yes','yes'),
    ('any','any','yes','no'),
    ('any','any','yes','any'),
    ('any','any','no','yes'),
    ('any','any','no','no'),
    ('any','any','no','any'),
    ('any','any','any','yes'),
    ('any','any','any', 'no'),
    ('any','any','any','any');



----------------------------------------------
create function updateUserByUsername(input_username text, input_given_name text, input_family_name text, input_email text, input_phone_number char(11), input_gender char(1), input_ethnicity text, input_dob date, input_locale varchar(6)) returns compliment_user as $update$
DECLARE
    intro compliment_user;
BEGIN
    update compliment_user a set 
        given_name = (select coalesce(input_given_name, a.given_name)), 
        family_name = (select coalesce(input_family_name, a.family_name)),
        email = (select coalesce(input_email, a.email)),
        phone_number = (select coalesce(input_phone_number, a.phone_number)),
        gender = (select coalesce(input_gender, a.gender)),
        ethnicity = (select coalesce(input_ethnicity, a.ethnicity)),
        dob = (select coalesce(input_dob, a.dob)),
        locale = (select coalesce(input_locale, a.locale))
        where a.username = input_username;
    select * into intro from compliment_user where username = input_username;
    return intro;
end;
$update$ language plpgsql;

-----------------------------------------------+
create or replace function getAllCategoryByUsername(input_username text) returns table(category_name text) as $getAllByUserId$
BEGIN
    return query select name as category_name from category where id in (select category_id from user_category_preference where user_id = (select id from compliment_user where username = $1));
END; 
$getAllByUserId$ language plpgsql;

-----------------------------------------------+
create function addCategoryToUserPreferences(input_username text, input_category text) returns table(category_name text) as $updateUserCategory$
DECLARE 
    res_user_id integer;
    res_category_id integer;
BEGIN
    select id into res_user_id from compliment_user where username = $1;
    select id into res_category_id from category where name = $2;
    insert into user_category_preference values (res_user_id, res_category_id);
    return query select getAllCategoryByUsername(input_username);
END;
$updateUserCategory$ language plpgsql;

------------------------------------------------
create function removeCategoryFromUserPreferences(input_username text, input_category text) returns table(category_name text) as $removeCategory$
DECLARE
    res_user_id integer;
    res_category_id integer;
BEGIN
    select id into res_user_id from compliment_user where username = $1;
    select id into res_category_id from category where name = $2;
    delete from user_category_preference where user_id = res_user_id and category_id = res_category_id;
    return query select getAllCategoryByUsername($1);
END;
$removeCategory$ language plpgsql;

-------------------------------------------------
create or replace function getComplimentByUsername(input_username text) returns text as $getCompliment$
DECLARE
    output_compliment_text text;
    user_info compliment_user;

BEGIN
    select * into user_info from compliment_user where username = $1;
    select c.compliment_text into output_compliment_text from compliment_information c where c.category_id in (
        select u.category_id from user_category_preference u where u.user_id = user_info.id)
        and c.personality_type_id = user_info.personality_type_id order by random() limit 1;
    return output_compliment_text as compliment;
END;
$getCompliment$ LANGUAGE plpgsql;

-------------------------------------------------
create function getComplimentByInformation(input_sensing text, input_introversion text, input_feeling text, input_judging text, input_category text) returns table(compliment text) as $getCompliment$
BEGIN
    return query select c.compliment_text from compliment_information c where c.personality_type_id = (
        select p.id from personality_type p where p.sensing = input_sensing and p.feeling = input_feeling
            and p.introversion = input_introversion and p.judging = input_judging) and c.category_id = (
                select t.id from category t where t.name = input_category
            ) order by random() limit 1;
END
$getCompliment$ LANGUAGE plpgsql;

------------------------------------------------



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

set search_path to '$user','public','compliments';