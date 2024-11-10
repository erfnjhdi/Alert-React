const Report = require('../models/Report');

// @desc    Create new disturbance report
// @route   POST /api/reports
exports.createReport = async (req, res) => {
  const { eventType, location, description, severity } = req.body;

  try {
    const report = new Report({
      eventType,
      location,
      description,
      severity,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Get all disturbance reports
// @route   GET /api/reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
