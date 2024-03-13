const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'tuclaveprivada'; // Clave privada para firmar el token

// Middleware para validar el token de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

app.use(bodyParser.json());

// Endpoint para obtener productos con paginación
app.get('/api/productos', authenticateToken, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const productosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
    const productos = productosResponse.data;
    res.json({ productos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Endpoint para obtener información detallada de un producto
app.get('/api/productos/:id', authenticateToken, async (req, res) => {
  const productId = req.params.id;
  try {
    const productoResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${productId}`);
    const producto = productoResponse.data;
    res.json({ producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Endpoint para obtener marcas
app.get('/api/marcas', authenticateToken, async (req, res) => {
  try {
    const marcasResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const marcas = marcasResponse.data;
    res.json({ marcas });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
});

// Endpoint para obtener categorías
app.get('/api/categorias', authenticateToken, async (req, res) => {
  try {
    const categoriasResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const categorias = categoriasResponse.data;
    res.json({ categorias });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Endpoint para obtener disponibilidad, stock y precios (simulado)
app.get('/api/disponibilidad/:productoId', authenticateToken, (req, res) => {
  const productoId = req.params.productoId;
  // Lógica simulada para disponibilidad, stock y precios
  const disponibilidad = true;
  const stock = 100;
  const precio = 50.99;
  res.json({ disponibilidad, stock, precio });
});

// Endpoint para autenticación y obtención de token
app.post('/api/login', (req, res) => {
  // Validar credenciales (por simplicidad, aquí se omite la lógica de autenticación real)
  const username = req.body.username;
  const password = req.body.password;

  // Simular validación de credenciales (deberías implementar tu propia lógica de autenticación)
  if (username === 'usuario' && password === 'contrasena') {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
