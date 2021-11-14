const notFound = (req, res) => res.status(404).send("Route doest not exist")

module.exports = notFound