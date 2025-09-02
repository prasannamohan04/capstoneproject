import axios from "axios";

const HOLIDAY_URI = "http://localhost:8084";

function HolidayService() {
  const addHoliday = (holiday) => axios.post(`${HOLIDAY_URI}/addholidaydetails`, holiday);
  const getHolidayList = () => axios.get(`${HOLIDAY_URI}/viewholidaylist`);
  return Object.freeze({ addHoliday, getHolidayList });
}

export default HolidayService;
