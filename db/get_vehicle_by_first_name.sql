SELECT * FROM Vehicles
INNER JOIN Users
ON Vehicles.ownerId = Users.id
WHERE Users.firstname like $1;
