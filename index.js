import app from './src/app.js';
import cors from 'cors';



app.use(cors());

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
