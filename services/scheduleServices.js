const { Schedule } = require("../db/models/scheduleModel");

const getFilter = async () => {
  const schedules = await Schedule.find(
    {},
    {
      data: { mon: 0, thu: 0, tue: 0, wed: 0, fri: 0 },
      createdAt: 0,
      createdBy: 0,
      updatedAt: 0,
      updatedBy: 0,
    }
  );
  return schedules;
};

const getSchedulesByFilter = async (filter) => {
  const schedules = await Schedule.findOne(
    {
      "data.course.value": filter.course,
      "data.group.value": filter.group,
      "data.subgroup.value": filter.subgroup,
    },
    {
      data: 1,
    }
  ).populate({
    path: "data",
    populate: [
      {
        path: "mon.teacher",
        model: "Teacher",
        select: "data",
      },
      {
        path: "mon.discipline",
        model: "Disciplines",
        select: "data",
      },
      {
        path: "tue.teacher",
        model: "Teacher",
        select: "data",
      },
      {
        path: "tue.discipline",
        model: "Disciplines",
        select: "data",
      },
      {
        path: "wed.teacher",
        model: "Teacher",
        select: "data",
      },
      {
        path: "wed.discipline",
        model: "Disciplines",
        select: "data",
      },
      {
        path: "thu.teacher",
        model: "Teacher",
        select: "data",
      },
      {
        path: "thu.discipline",
        model: "Disciplines",
        select: "data",
      },
      {
        path: "fri.teacher",
        model: "Teacher",
        select: "data",
      },
      {
        path: "fri.discipline",
        model: "Disciplines",
        select: "data",
      },
    ],
  });
  return schedules;
};

// admin

const getSchedules = async () => {
  const schedules = await Schedule.find({});
  return schedules;
};

const getScheduleById = async (id) => {
  const schedule = await Schedule.findById(id);
  return schedule;
};

const addSchedule = async (body, userId) => {
  const schedule = new Schedule({
    data: body,
    updatedBy: userId,
  });
  return await schedule.save();
};

const updateScheduleById = async (postId, body, userId) => {
  const schedule = await Schedule.findByIdAndUpdate(postId, {
    $set: { data: body, updatedBy: userId },
  });
  return schedule;
};

const deleteScheduleById = async (postId) => {
  const schedule = await Schedule.findByIdAndDelete(postId);
  return schedule;
};

module.exports = {
  getFilter,
  getSchedulesByFilter,
  getSchedules,
  getScheduleById,
  addSchedule,
  updateScheduleById,
  deleteScheduleById,
};
