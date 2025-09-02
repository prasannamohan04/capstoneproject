package leavemanagementsys.application.service;

import java.util.List;

import leavemanagementsys.application.entity.PublicHolidays;

public interface PublicHolidayService {
	PublicHolidays addHoliday(PublicHolidays holiday);
    List<PublicHolidays> getAllHolidays();
}
