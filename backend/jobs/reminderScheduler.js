const cron = require('node-cron');
const { Pool } = require('pg');
const { sendSms } = require('./smsService'); 

const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Cron job: Runs daily at 8 AM
cron.schedule('0 8 * * *', async () => {
  try {
    const query = `
      SELECT appointment_id, customer_name, customer_phone, appointment_date
      FROM appointments
      WHERE appointment_date >= NOW() + INTERVAL '1 day'
        AND appointment_date < NOW() + INTERVAL '2 day'
        AND reminder_sent = false;
    `;

    const { rows } = await pool.query(query);

    for (const appointment of rows) {
      const message = `Reminder: Hi ${appointment.customer_name}, you have an appointment on ${appointment.appointment_date}.`;
      await sendSms(appointment.customer_phone, message);

      // Mark reminder as sent
      await pool.query(
        `UPDATE appointments SET reminder_sent = true WHERE appointment_id = $1`,
        [appointment.appointment_id]
      );
    }

    console.log('Reminders sent successfully!');
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
});
