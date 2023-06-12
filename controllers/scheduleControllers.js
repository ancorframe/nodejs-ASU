const { ErrorConstructor } = require("../helpers/errors");
const {
  getFilter,
  getSchedulesByFilter,
  getSchedules,
  getScheduleById,
  addSchedule,
  updateScheduleById,
  deleteScheduleById,
} = require("../services/scheduleServices");

const getFilterController = async (req, res) => {
  try {
    const schedules = await getFilter();
    res.json({ schedules });
  } catch (error) {
    throw new ErrorConstructor(404, `Schedules not found`);
  }
};

const getSchedulesByFilterController = async (req, res) => {
  const { ...filters } = req.query;
  try {
    const schedules = await getSchedulesByFilter(filters);
      res.json({
          schedules
          // message:'success'
      });
  } catch (error) {
    throw new ErrorConstructor(404, `Schedules not found`);
  }
};

// admin

const getSchedulesController = async (req, res) => {
  try {
    const schedules = await getSchedules();
    res.json({ schedules });
  } catch (error) {
    throw new ErrorConstructor(404, `Schedules not found`);
  }
};

const getScheduleByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await getScheduleById(id);
    res.json({ schedule });
  } catch (error) {
    throw new ErrorConstructor(404, `Schedule with id ${id} not found`);
  }
};

const addScheduleController = async (req, res) => {
  const { _id: userId } = req.user;
  const { body } = req;
  try {
    const schedule = await addSchedule(body, userId);
    res.status(201).json({ schedule });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateScheduleByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { body } = req;
  try {
    await updateScheduleById(id, body, userId);
    res.json({
      message: `schedule with id:${id} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deleteScheduleByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteScheduleById(id);
    res.json({ message: `schedule with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `Schedule with id: ${id} not found`);
  }
};

module.exports = {
  getFilterController,
  getSchedulesByFilterController,
  getSchedulesController,
  getScheduleByIdController,
  addScheduleController,
  updateScheduleByIdController,
  deleteScheduleByIdController,
};
