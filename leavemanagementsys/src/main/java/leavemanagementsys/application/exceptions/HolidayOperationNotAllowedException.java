package leavemanagementsys.application.exceptions;

public class HolidayOperationNotAllowedException extends RuntimeException {
	public HolidayOperationNotAllowedException(String message) {
        super(message);
    }
}
