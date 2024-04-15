import 'dotenv/config';

import { ExpressApp } from './express/index.js';
import { rootRouter } from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = new ExpressApp();
const PORT = Number(process.env.API_PORT) || 3002;

app.init(PORT);
// TODO: implement apply router function
app.instance.use('/', rootRouter);

// TODO: implement apply middleware function
app.instance.use(errorHandler);
