// Manual database fix script to update membership_fee values
const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixMembershipData() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'imaigal-trust',
  });

  try {
    // Update membership_fee values to numeric only
    const updateSQL = `
      UPDATE memberships 
      SET membership_fee = CASE 
        WHEN membership_fee LIKE '%1,000%' OR membership_fee LIKE '%1000%' THEN '1000'
        WHEN membership_fee LIKE '%2,000%' OR membership_fee LIKE '%2000%' THEN '2000'
        WHEN membership_fee = '' OR membership_fee IS NULL THEN '0'
        ELSE membership_fee
      END
      WHERE membership_fee NOT REGEXP '^[0-9]+(\\.[0-9]{2})?$'
    `;

    console.log('Running migration query...');
    const result = await connection.execute(updateSQL);
    console.log(`Updated ${result[0].affectedRows} rows`);
    
    // Verify the update
    const [rows] = await connection.execute('SELECT DISTINCT membership_fee FROM memberships');
    console.log('Distinct membership_fee values after update:', rows);
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    await connection.end();
  }
}

fixMembershipData();
