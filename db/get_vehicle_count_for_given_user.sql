SELECT Vehicles.make
FROM Vehicles
INNER JOIN Users
ON Users.id = Vehicles.ownerId
WHERE ownerId = $1;
