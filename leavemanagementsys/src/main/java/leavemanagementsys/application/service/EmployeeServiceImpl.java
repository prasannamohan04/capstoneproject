package leavemanagementsys.application.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import leavemanagementsys.application.entity.Employee;
import leavemanagementsys.application.exceptions.EmployeeNotFoundException;
import leavemanagementsys.application.repositories.EmployeeRepo;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	@Autowired
	EmployeeRepo repo;
	
    @Override
    public Employee addEmployee(Employee employee) {
        if (employee.getManagerId() != null && !employee.getManagerId().isBlank()) {
            repo.findById(employee.getManagerId())
                .orElseThrow(() -> new EmployeeNotFoundException(employee.getManagerId()));
        }
        if (employee.getEmpId() == null || employee.getEmpId().isBlank()) {
            String prefix = "SUTH";
            String year = String.valueOf(LocalDate.now().getYear()).substring(2);

            long count = repo.count() + 1;
            String sequence = String.format("%03d", count);

            String generatedId = prefix + year + sequence;
            employee.setEmpId(generatedId);
        }
        return repo.save(employee);
    }

    @Override
    public Optional<Employee> getEmployeeById(String empId) {
        return repo.findById(empId);
    }

	@Override
	public List<Employee> getAllEmployees() {
		
		return repo.findAll();
	}
	
}
