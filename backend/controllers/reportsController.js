const ExcelJS = require('exceljs');
const { 
  getCustomersReportData, 
  getAppointmentsReportData, 
  getIncomesReportData 
} = require('../services/reportService.js');

async function generateReport(res, filename, sheetName, data, columns) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName, { views: [{ rightToLeft: true }] });

    worksheet.columns = columns;

    // Add rows and apply right alignment to all cells
    data.forEach(row => {
      const newRow = worksheet.addRow(row);
      newRow.eachCell(cell => {
        cell.alignment = { horizontal: 'right' };
      });
    });

    // Apply right alignment to header row
    worksheet.getRow(1).eachCell(cell => {
      cell.alignment = { horizontal: 'right', bold: true };
    });

    res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
    res.status(500).json({ message: `Error generating ${filename}` });
  }
}

exports.customersReport = async (req, res) => {
  const data = await getCustomersReportData();
  const columns = [
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

  // Convert boolean values to "V" or "X"
  const formattedData = data.map(row => ({
    ...row,
    is_black_list: row.is_black_list ? 'V' : 'X',
    agreed_ads: row.agreed_ads ? 'V' : 'X',
  }));

  await generateReport(res, 'customers_report', 'Customers Report', formattedData, columns);
};

exports.appointmentsReport = async (req, res) => {
  const data = await getAppointmentsReportData();
  const columns = [
    { header: 'מספר תור', key: 'appointment_id', width: 15 },
    { header: 'תאריך תור', key: 'appointment_date', width: 15 },
    { header: 'שעה', key: 'start_time', width: 15 },
    { header: 'מספר לקוח', key: 'customer_id', width: 15 },
    { header: 'שם לקוח', key: 'customer_name', width: 15 },
    { header: 'סוג תור', key: 'appointment_type', width: 15 },
    { header: 'טכניקה', key: 'treatment_type', width: 15 },
    { header: 'הגיעה', key: 'arrived', width: 10 },
    { header: 'מחיר', key: 'price_for_appointment', width: 15 },
  ];

  // Convert boolean values to "V" or "X"
  const formattedData = data.map(row => ({
    ...row,
    arrived: row.arrived ? 'V' : 'X',
  }));

  await generateReport(res, 'appointments_report', 'Appointments Report', formattedData, columns);
};

exports.incomesReport = async (req, res) => {
  const data = await getIncomesReportData();
  const columns = [
    { header: 'מזהה תשלום', key: 'payment_id', width: 15 },
    { header: 'תאריך תשלום', key: 'payment_date', width: 15 },
    { header: 'לקוח משלם', key: 'paying_customer', width: 15 },
    { header: 'מספר לקוח', key: 'customer_id', width: 15 },
    { header: 'סכום', key: 'amount', width: 15 },
    { header: 'שיטת תשלום', key: 'pay_method', width: 15 },
  ];

  await generateReport(res, 'incomes_report', 'Incomes Report', data, columns);
};
