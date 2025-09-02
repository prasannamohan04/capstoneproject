package leavemanagementsys.application.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class PublicHolidays {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 @Column
	 private LocalDate holidaydate;
	 @Column
	 private String holidayDetails;
	 
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public LocalDate getHolidaydate() {
		return holidaydate;
	}
	public void setHolidaydate(LocalDate holidaydate) {
		this.holidaydate = holidaydate;
	}
	public String getHolidayDetails() {
		return holidayDetails;
	}
	public void setHolidayDetails(String holidayDetails) {
		this.holidayDetails = holidayDetails;
	} 
}
