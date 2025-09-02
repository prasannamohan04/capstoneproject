package leavemanagementsys.application.exceptions;

public class EmployeeNotFoundException extends RuntimeException {
	public EmployeeNotFoundException(String empId) {
        super("No employee found with empId: " + empId);
    }
}
