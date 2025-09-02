package leavemanagementsys.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import leavemanagementsys.application.entity.PublicHolidays;

public interface PublicHolidaysRepo extends JpaRepository<PublicHolidays, Long> {
	
}
