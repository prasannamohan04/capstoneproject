package leavemanagementsys.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import leavemanagementsys.application.entity.PublicHolidays;
import leavemanagementsys.application.service.PublicHolidayService;

@RestController
@CrossOrigin(origins = {"http://localhost:3001"})
public class PublicHolidaysController {
	@Autowired
	PublicHolidayService service;
	
	@PostMapping("/addholidaydetails")
    public ResponseEntity<PublicHolidays> addHoliday(@Valid @RequestBody PublicHolidays holiday) {
        return ResponseEntity.ok(service.addHoliday(holiday));
    }
    @GetMapping("/viewholidaylist")
    public ResponseEntity<List<PublicHolidays>> list() {
        return ResponseEntity.ok(service.getAllHolidays());
    }
}
