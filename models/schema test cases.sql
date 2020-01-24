-- !!!!Important!!! --
-- Create Database vesta_test
-- Then npm run--
-- Then copy the sql code below and run it in mysql workbench

--Additonal Notes
--Passwords on seeded users is "password"

use vesta_test;

INSERT INTO homes
    (street,city,state,zip,home_name,master_key,invitation_key,createdAt,updatedAt)
VALUES
    ("157 W Garfield Rd", "Aurora", "OH", 44202, "Holman House", "lockdown", "beourguest", "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("mom50", "mom@gmail.com","$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Laura", "Holman", 50, "1230984567", true, 0, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("dad52", "dad@gmail.com","$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Scott", "Holman", 52, "0987654321", true, 0, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("elise1", "elise@gmail.com","$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Elise", "Holman", 23, "3305621234", false, 200, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("lydia2", "lydia@gmail.com","$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Lydia", "Holman", 20, "2161234567", false, 10, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("corinne3", "corinne@gmail.com","$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Corinne", "Holman", 18, "3301234567", false, 1, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO vets
    (practice_name,phone_number,street,city,state,zip,emergency_clinic,createdAt,updatedAt)
VALUES
    ("Twinsburg Veterinary Hospital", "330-425-4226", "8803 Ravenna Rd", "Twinsburg", "OH", "44087", true, "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO pets
    (home_id,pet_name,age,animal_type,createdAt,updatedAt,primary_vet_id)
VALUES
    (1, "Rocket", 7, "dog", "2020-01-11 12:15:00", "2020-01-11 12:15:00", 1);
INSERT INTO pets
    (home_id,pet_name,age,animal_type,createdAt,updatedAt,primary_vet_id)
VALUES
    (1, "Scout", 4, "dog", "2020-01-11 12:15:00", "2020-01-11 12:15:00", 1);
INSERT INTO pets
    (home_id,pet_name,age,animal_type,createdAt,updatedAt,primary_vet_id)
VALUES
    (1, "Blue", 2, "dog", "2020-01-11 12:15:00", "2020-01-11 12:15:00", 1);

INSERT INTO chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,end_date_time,repeats,repeat_interval,completed,createdAt,updatedAt)
VALUES
    (1, "do dishes", 1, 3, 5, "2020-01-11 12:15:00", "2020-01-13 12:15:00", true, "w", false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,repeats,completed,createdAt,updatedAt)
VALUES
    (1, "walk the dog", 1, 4, 5, "2020-01-11 12:15:00", false, false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,end_date_time,repeats,repeat_interval,completed,createdAt,updatedAt)
VALUES
    (1, "feed the dogs", 1, 5, 5, "2020-01-11 12:15:00", "2020-01-31 12:15:00", true, "d", false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO chores
    (home_id,chore_name,created_by,point_value,start_date_time,repeats,completed,createdAt,updatedAt)
VALUES
    (1, "get milk", 2, 10, "2020-01-11 12:15:00", false, false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,repeats,completed,createdAt,updatedAt)
VALUES
    (1, "pay bills", 1, 2, 30, "2020-01-11 12:15:00", false, false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO notes
    (home_id,user_id,urgent,note,createdAt,updatedAt)
VALUES
    (1, 1, true, "Please check your emails, I sent you some links that might be nice family outings for this summer. Let me know what you think!", "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO notes
    (home_id,user_id,chore_id,urgent,note,createdAt,updatedAt)
VALUES
    (1, 1, 4, false, "let me know how much it is and I can pay you back", "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO notes
    (home_id,user_id,urgent,note,createdAt,updatedAt)
VALUES
    (1, 3, false, "Graduation is coming up, if we want to make dinner reservations for afterwards we should talk about where.", "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out) 
VALUES 
    (1,"granny smith apples",3,"units",3,1579827631414,1579829321849);
INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out)
VALUES
    (1,"vanilla extract",6,"tbsp",0,1579827631414,1609827631414);
INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out)
VALUES 
    (1,"Rice Krispies Cereal",6,"cups",0,1579827631414,1579927631414);
INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out) VALUES (1,"milk",16,"cups",5,1579827631414);
INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out) 
VALUES 
    (1,"ground beef",3,"cups",0,1579827631414,1579827831414);
INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out) 
VALUES 
    (1,"bananas",6,"units",0,1579827631414,1579927631414);
INSERT INTO pantries
    (home_id,item_name,quantity,quantity_unit,low_quantity,date_in,date_out) 
VALUES 
    (1,"apple juice",3,"cups",0,1579827631414,1579837631414);

