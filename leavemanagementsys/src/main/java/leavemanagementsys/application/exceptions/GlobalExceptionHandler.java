package leavemanagementsys.application.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> employeeNotFound(EmployeeNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LeaveNotFoundException.class)
    public ResponseEntity<String> leaveNotFound(LeaveNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidLeaveOperationException.class)
    public ResponseEntity<String> invalidLeaveOperation(InvalidLeaveOperationException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(HolidayOperationNotAllowedException.class)
    public ResponseEntity<String> holidayNotAllowed(HolidayOperationNotAllowedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(value = UserNotFoundException.class)
	public ResponseEntity<String> userNotFoundException(
			UserNotFoundException ex){
		
		return new ResponseEntity<String>(ex.getMessage(),HttpStatus.NOT_FOUND) ;
	}
}
