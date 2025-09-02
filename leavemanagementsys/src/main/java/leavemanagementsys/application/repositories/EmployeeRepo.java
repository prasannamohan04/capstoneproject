package leavemanagementsys.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import leavemanagementsys.application.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, String>{
	
}
