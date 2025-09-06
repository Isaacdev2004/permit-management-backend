const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const emailService = require('./services/emailService');
const AustinScraper = require('./scrapers/austinScraper');

const permitsRouter = require('./routes/permits');
const clientsRouter = require('./routes/clients');
const emailRouter = require('./routes/email');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/permits', permitsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/email', emailRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

cron.schedule('0 6 * * *', async () => {
  console.log('🕕 Running scheduled permit scraping...');
  try {
    const scraper = new AustinScraper();
    await scraper.scrapeAndStorePermits();
    console.log('✅ Scheduled scraping completed successfully.');
  } catch (error) {
    console.error('❌ Scheduled scraping failed:', error);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
