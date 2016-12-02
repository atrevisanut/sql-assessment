SELECT make, model, year, Users.firstname, Users.lastname FROM Vehicles
JOIN Users ON Vehicles.ownerId = users.id
WHERE Vehicles.year > 2000
ORDER BY year desc;
