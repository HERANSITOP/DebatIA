// Controlador de ejemplo para rutas públicas y privadas
exports.publicRoute = (req, res) => {
  res.json({ message: "Ruta pública accedida correctamente" });
};

exports.privateRoute = (req, res) => {
  res.json({ message: "Ruta privada accedida correctamente" });
};
