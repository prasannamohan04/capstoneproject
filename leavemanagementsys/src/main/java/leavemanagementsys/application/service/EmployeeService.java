package leavemanagementsys.application.service;

import java.util.List;
import java.util.Optional;

import leavemanagementsys.application.entity.Employee;

public interface EmployeeService {
	Employee addEmployee(Employee employee);
    Optional<Employee> getEmployeeById(String empId);
    List<Employee> getAllEmployees();
}
