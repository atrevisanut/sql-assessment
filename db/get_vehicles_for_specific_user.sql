SELECT Vehicles.make, Vehicles.model, Vehicles.year, Vehicles.ownerId
FROM Vehicles
INNER JOIN Users
ON Users.id = Vehicles.ownerId
WHERE ownerId = $1;
