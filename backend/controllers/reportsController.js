const ExcelJS = require('exceljs');
const { 
  getCustomersReportData, 
  getAppointmentsReportData, 
  getIncomesReportData 
} = require('../services/reportService.js');

// Controller function to handle customers report download
exports.customersReport = async (req, res) => {
  try {
    const data = await getCustomersReportData();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Customers Report');

    worksheet.columns = [
      { header: 'מספר לקוח', key: 'customer_id', width: 15 },
      { header: 'שם פרטי', key: 'first_name', width: 20 },
      { header: 'שם משפחה', key: 'last_name', width: 20 },
      { header: 'תעודת זהות', key: 'israeli_id', width: 15 },
      { header: 'תאריך לידה', key: 'date_of_birth', width: 15 },
      { header: 'גיל', key: 'age', width: 10 },
      { header: 'טלפון נייד', key: 'mobile_number', width: 20 },
      { header: 'עיר מגורים', key: 'city_name', width: 20 },
      { header: 'מחט וצבע', key: 'needle_and_color', width: 20 },
      { header: 'מקור הגעה', key: 'source_name', width: 20 },
      { header: 'רשימה שחורה', key: 'is_black_list', width: 10 },
      { header: 'הסכמה לדיוור', key: 'agreed_ads', width: 10 },
      { header: 'הערות חופשיות', key: 'notes', width: 30 },
    ];

    data.forEach(row => {
      worksheet.addRow({
        customer_id: row.customer_id,
        first_name: row.first_name,
        last_name: row.last_name,
        israeli_id: row.israeli_id,
        date_of_birth: row.date_of_birth,
        age: row.age,
        mobile_number: row.mobile_number,
        city_name: row.city_name,
        needle_and_color: row.needle_and_color,
        source_name: row.source_name,
        is_black_list: row.is_black_list ? 'V' : 'X',
        agreed_ads: row.agreed_ads ? 'V' : 'X',
        notes: row.notes,
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=customers_report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating customers report:', error);
    res.status(500).json({ message: 'Error generating customers report' });
  }
};

// Controller function to handle appointments report download
exports.appointmentsReport = async (req, res) => {
  try {
    const data = await getAppointmentsReportData();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Appointments Report');

    worksheet.columns = [
      { header: 'Appointment ID', key: 'appointment_id', width: 15 },
      { header: 'Customer Name', key: 'customer_name', width: 30 },
      { header: 'Date', key: 'appointment_date', width: 20 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Treatment Type', key: 'treatment_type', width: 20 },
      { header: 'Notes', key: 'notes', width: 30 },
    ];

    data.forEach(row => {
      worksheet.addRow({
        appointment_id: row.appointment_id,
        customer_name: row.customer_name,
        appointment_date: row.appointment_date,
        status: row.status,
        treatment_type: row.treatment_type,
        notes: row.notes,
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=appointments_report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating appointments report:', error);
    res.status(500).json({ message: 'Error generating appointments report' });
  }
};

// Controller function to handle incomes report download
exports.incomesReport = async (req, res) => {
  try {
    const data = await getIncomesReportData();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Incomes Report');

    worksheet.columns = [
      { header: 'Date', key: 'income_date', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Payment Method', key: 'payment_method', width: 20 },
      { header: 'Customer Name', key: 'customer_name', width: 30 },
      { header: 'Notes', key: 'notes', width: 30 },
    ];

    data.forEach(row => {
      worksheet.addRow({
        income_date: row.income_date,
        amount: row.amount,
        payment_method: row.payment_method,
        customer_name: row.customer_name,
        notes: row.notes,
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=incomes_report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating incomes report:', error);
    res.status(500).json({ message: 'Error generating incomes report' });
  }
};
