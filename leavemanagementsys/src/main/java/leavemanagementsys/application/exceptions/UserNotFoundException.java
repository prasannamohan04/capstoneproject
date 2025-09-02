package leavemanagementsys.application.exceptions;
@SuppressWarnings("serial")
public class UserNotFoundException extends RuntimeException{
	public UserNotFoundException() {
        super("User not found or invalid credentials");
    }
}
