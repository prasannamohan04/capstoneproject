package leavemanagementsys.application.exceptions;

public class InvalidLeaveOperationException extends RuntimeException{
	public InvalidLeaveOperationException(String message) {
        super(message);
    }
}
