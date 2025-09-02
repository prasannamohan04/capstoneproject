package leavemanagementsys.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import leavemanagementsys.application.entity.Employee;
import leavemanagementsys.application.exceptions.EmployeeNotFoundException;
import leavemanagementsys.application.service.EmployeeService;

@RestController
@CrossOrigin(origins = {"http://localhost:3001"})
public class EmployeeController {
	@Autowired
	EmployeeService service;
	@PostMapping("/addemployee")
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(service.addEmployee(employee));
    }
	@GetMapping("/viewEmployee")
	public ResponseEntity<List<Employee>> getEmployees() {
	    List<Employee> employees = service.getAllEmployees();
	    return new ResponseEntity<>(employees, HttpStatus.OK);
	}
    @GetMapping("/getemployeebyid")
    public ResponseEntity<Employee> getById(@RequestParam String empId) {
        return service.getEmployeeById(empId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EmployeeNotFoundException(empId));
    }
}