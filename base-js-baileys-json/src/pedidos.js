import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON
const filePath = path.join(__dirname, './data/pedidos.json');

// Función para agregar un nuevo pedido
export async function agregarPedido(fecha, NombreCliente, pedido) {
    try {
        // Leer el archivo JSON (si existe)
        let data = [];
        try {
            const jsonData = await fs.readFile(filePath, 'utf-8');
            
            // Parsear solo si el archivo tiene contenido
            data = jsonData ? JSON.parse(jsonData) : [];

            // Asegurarnos de que sea un array
            if (!Array.isArray(data)) {
                data = [];
            }
        } catch (err) {
            // Si el error es ENOENT (archivo no encontrado), inicializamos el array vacío
            if (err.code !== 'ENOENT') {
                throw err; // Si es otro error, lanzarlo
            }
        }

        // Crear el nuevo pedido
        const newPedido = {
            'fecha': fecha,
            'NombreCliente': NombreCliente,
            'pedido': pedido.productos  // Pasar directamente el array de productos
        };

        // Agregar el nuevo pedido al array de pedidos
        data.push(newPedido);

        // Escribir el array actualizado en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Pedido agregado con éxito');
    } catch (error) {
        console.error('Error al agregar pedido:', error);
    }
}
