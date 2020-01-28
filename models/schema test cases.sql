-- !!!!Important!!! --
-- Create Database vesta_test
-- Then npm run--
-- Then copy the sql code below and run it in mysql workbench

--Additonal Notes
--Passwords on seeded users is "password"

use vesta_test;

INSERT INTO Homes
    (street,city,state,zip,home_name,home_admin,master_key,invitation_key,createdAt,updatedAt)
VALUES
    ("157 W Garfield Rd", "Aurora", "OH", 44202, "Holman House", 1, "lockdown", "beourguest", "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO Users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("mom50", "mom@gmail.com", "$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Laura", "Holman", 50, "1230984567", true, 0, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("dad52", "dad@gmail.com", "$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Scott", "Holman", 52, "0987654321", true, 0, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("elise1", "elise@gmail.com", "$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Elise", "Holman", 23, "3305621234", false, 200, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("lydia2", "lydia@gmail.com", "$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Lydia", "Holman", 20, "2161234567", false, 10, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Users
    (username,email,password,first_name,last_name,age,phoneNumber,parent,points,home_id,createdAt,updatedAt)
VALUES
    ("corinne3", "corinne@gmail.com", "$2a$10$eD.EJWKpH/V2iHLgUozHZ.qwIF5T0uCPLAE8Y5r9lS.5jGYUBgo5.", "Corinne", "Holman", 18, "3301234567", false, 1, 1, "2020-01-11 12:15:00", "2020-01-11 12:15:00");



INSERT INTO Vets
    (practice_name,phone_number,street,city,state,zip,emergency_clinic,createdAt,updatedAt)
VALUES
    ("Akron Veterinary Hospital", "330-425-4226", "1654 Akron Rd", "Akron", "OH", "44301", true, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Vets
    (practice_name,phone_number,street,city,state,zip,emergency_clinic,createdAt,updatedAt)
VALUES
    ("Solon Veterinary Hospital", "330-222-4226", "8416 Solon Rd", "Solon", "OH", "44187", true, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Vets
    (practice_name,phone_number,street,city,state,zip,emergency_clinic,createdAt,updatedAt)
VALUES
    ("Cleveland Veterinary Hospital", "330-333-4226", "2658 Cleveland Rd", "Cleveland", "OH", "44107", true, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Vets
    (practice_name,phone_number,street,city,state,zip,emergency_clinic,createdAt,updatedAt)
VALUES
    ("Youngstown Veterinary Hospital", "330-444-4226", "69771 Youngstown Rd", "Youngstown", "OH", "44878", true, "2020-01-11 12:15:00", "2020-01-11 12:15:00");



INSERT INTO Pets
    (home_id,pet_name,image_url,age,animal_type,createdAt,updatedAt,primary_vet_id)
VALUES
    (1, "Rocket","https://ih0.redbubble.net/image.632441746.7645/flat,1000x1000,075,f.jpg", 7, "dog", "2020-01-11 12:15:00", "2020-01-11 12:15:00", 1);
INSERT INTO Pets
    (home_id,pet_name,image_url,age,animal_type,createdAt,updatedAt,primary_vet_id)
VALUES
    (1, "Scout","https://ih0.redbubble.net/image.632441746.7645/flat,1000x1000,075,f.jpg", 4, "dog", "2020-01-11 12:15:00", "2020-01-11 12:15:00", 1);
INSERT INTO Pets
    (home_id,pet_name,image_url,age,animal_type,createdAt,updatedAt,primary_vet_id)
VALUES
    (1, "Blue","https://ih0.redbubble.net/image.632441746.7645/flat,1000x1000,075,f.jpg", 2, "dog", "2020-01-11 12:15:00", "2020-01-11 12:15:00", 1);


INSERT INTO Chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,end_date_time,repeats,repeat_interval,completed,createdAt,updatedAt)
VALUES
    (1, "do dishes", 1, 3, 5, "2020-01-11 12:15:00", "2020-01-13 12:15:00", true, "w", false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,repeats,completed,createdAt,updatedAt)
VALUES
    (1, "walk the dog", 1, 4, 5, "2020-01-11 12:15:00", false, false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,end_date_time,repeats,repeat_interval,completed,createdAt,updatedAt)
VALUES
    (1, "feed the dogs", 1, 5, 5, "2020-01-11 12:15:00", "2020-01-31 12:15:00", true, "d", false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Chores
    (home_id,chore_name,created_by,point_value,start_date_time,repeats,completed,createdAt,updatedAt)
VALUES
    (1, "get milk", 2, 10, "2020-01-11 12:15:00", false, false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Chores
    (home_id,chore_name,created_by,assigned_user,point_value,start_date_time,repeats,completed,createdAt,updatedAt)
VALUES
    (1, "pay bills", 1, 2, 30, "2020-01-11 12:15:00", false, false, "2020-01-11 12:15:00", "2020-01-11 12:15:00");

INSERT INTO Notes
    (home_id,user_id,urgent,note,createdAt,updatedAt)
VALUES
    (1, 1, true, "Please check your emails, I sent you some links that might be nice family outings for this summer. Let me know what you think!", "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Notes
    (home_id,user_id,chore_id,urgent,note,createdAt,updatedAt)
VALUES
    (1, 1, 4, false, "let me know how much it is and I can pay you back", "2020-01-11 12:15:00", "2020-01-11 12:15:00");
INSERT INTO Notes
    (home_id,user_id,urgent,note,createdAt,updatedAt)
VALUES
    (1, 3, false, "Graduation is coming up, if we want to make dinner reservations for afterwards we should talk about where.", "2020-01-11 12:15:00", "2020-01-11 12:15:00");


INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt) 
VALUES 
    (1,"granny smith apples","Produce",3,"units",3,18284,18289,'2020-1-24 19:52:39','2020-1-24 19:52:39');
INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt)
VALUES
    (1,"vanilla extract","Condiments/Spices & Bake",6,"tbsp",0,18284,18285,'2020-1-24 19:52:39','2020-1-24 19:52:39');
INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt)
VALUES 
    (1,"Rice Krispies Cereal","Breakfast & Cereal",6,"cups",0,18284,18300,'2020-1-24 19:52:39','2020-1-24 19:52:39');
INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt) 
VALUES 
    (1,"milk",'Dairy, Eggs & Cheese',16,"cups",5,18284,18290,'2020-1-24 19:52:39','2020-1-24 19:52:39');
INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt) 
VALUES 
    (1,"ground beef",'Meat & Seafood',3,"cups",0,18284,18285,'2020-1-24 19:52:39','2020-1-24 19:52:39');
INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt) 
VALUES 
    (1,"bananas","Produce",6,"units",0,18284,18289,'2020-1-24 19:52:39','2020-1-24 19:52:39');
INSERT INTO pantries
    (home_id,item_name,item_type,quantity,quantity_unit,low_quantity,date_in,date_out,createdAt,updatedAt) 
VALUES 
    (1,"apple juice","Beverages",3,"cups",0,18284,18290,'2020-1-24 19:52:39','2020-1-24 19:52:39');
