SELECT * FROM Vehicles
JOIN Users ON ownerId = Users.id
WHERE Users.email = $1;
