package leavemanagementsys.application.exceptions;

public class LeaveNotFoundException extends RuntimeException{
	public LeaveNotFoundException(Long id) {
        super("No leave request found with id: " + id);
    }
}
