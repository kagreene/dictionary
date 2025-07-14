// server/index.js
import express from 'express';
import cors from 'cors';
import routes from './routes/dictionary.js';


const app = express();
const PORT = 3001;

// Serve static files in the client dist folder
//app.use(express.static('../client/dist'))
// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.get('*', (req, res) =>
//   res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
// );

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
