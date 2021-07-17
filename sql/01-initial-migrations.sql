create user app_user with password 'app_password';
create schema compliments;
grant all PRIVILEGES on schema compliments to app_user;
\c postgres app_user;
set schema 'compliments';


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

create table compliment(
    id serial primary key,
    compliment text unique not null,
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
    category_id integer references category(id)
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
create function updateUserByEmailOrPhoneNumber(given_name text, family_name text, email text, phone_number char(11), gender char(1), ethnicity text, dob date, locale varchar(6)) returns compliment_user as $update$
declare 
intro compliment_user;
cnt integer;
BEGIN
    select count(phone_number) into cnt from compliment_user where compliment_user.phone_number=phone_number;
    if(cnt > 0) then
        select * into intro from compliment_user where compliment_user.phone_number=phone_number;
    else select * into intro from compliment_user where compliment_user.email=email;
    end if;
    return intro;
end 
$update$ language plpgsql;

-----------------------------------------------
create function getAllComplimentsByUsername(input_username text) returns table(category_name text) as $getAllByUserId$
BEGIN
    return query select name as category_name from category where id in (select id from user_category_preference where user_id = (select user_id from compliment_user where username = $1));
END; 
$getAllByUserId$ language plpgsql;

-----------------------------------------------
create function addComplimentToUserPreferences(input_username text, input_category text) returns table(category_name text) as $updateUserCategory$
DECLARE 
    res_user_id integer;
    res_category_id integer;
BEGIN
    select id into res_user_id from compliment_user where username = $1;
    select id into res_category_id from category where name = $2;
    insert into user_category_preference values (res_user_id, res_category_id);
    return query select getAllComplimentsByUsername(input_username);
END;
$updateUserCategory$ language plpgsql;

------------------------------------------------
create function removeComplimentFromUserPreferences(input_username text, input_category text) returns table(category_name text) as $removeCategory$
DECLARE
    res_user_id integer;
    res_category_id integer;
BEGIN
    select id into res_user_id from compliment_user where username = $1;
    select id into res_category_id from category where name = $2;
    delete from user_category_preference where user_id = res_user_id and category_id = res_category_id;
    return query select getAllComplimentsByUsername($1);
END;
$removeCategory$ language plpgsql;

-------------------------------------------------
create or replace function getComplimentByUsername(input_username text) returns text as $getCompliment$
DECLARE
    compliment_text text;
    user_info compliment_user;

BEGIN
    select * into user_info from compliment_user where username = $1;
    select compliment into compliment_text from compliment where category_id in (
        select category_id from user_category_preference where user_id = user_info.id)
        and personality_type_id = user_info.personality_type_id order by random() limit 1;
    return compliment_text as compliment;
END;
$getCompliment$ LANGUAGE plpgsql;

-------------------------------------------------
create function getComplimentByInformation(input_sensing text, input_introversion text, input_feeling text, input_judging text, input_category text) returns table(compliment text) as $getCompliment$
DECLARE
    compliment_text text;
BEGIN
    return query select compliment from compliment where personality_type_id = (
        select id from personality_type where sensing = input_sensing and feeling = input_feeling
            and introversion = input_introversion and judging = input_judging) and category_id = (
                select id from category where name = input_category
            ) order by random() limit 1;
END
$getCompliment$ LANGUAGE plpgsql;

------------------------------------------------
