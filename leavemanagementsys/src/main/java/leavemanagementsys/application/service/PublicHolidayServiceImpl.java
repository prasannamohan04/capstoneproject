package leavemanagementsys.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import leavemanagementsys.application.entity.PublicHolidays;
import leavemanagementsys.application.repositories.PublicHolidaysRepo;

@Service
public class PublicHolidayServiceImpl implements PublicHolidayService{
	@Autowired
	PublicHolidaysRepo repo;
	
	@Override
    public PublicHolidays addHoliday(PublicHolidays holiday) {
        return repo.save(holiday);
    }

    @Override
    public List<PublicHolidays> getAllHolidays() {
        return repo.findAll();
    }
}
