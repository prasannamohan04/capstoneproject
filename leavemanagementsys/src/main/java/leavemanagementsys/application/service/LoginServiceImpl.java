package leavemanagementsys.application.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import leavemanagementsys.application.entity.Login;
import leavemanagementsys.application.exceptions.UserNotFoundException;
import leavemanagementsys.application.repositories.LoginRepo;

@Service
public class LoginServiceImpl implements LoginService{
	 @Autowired
	    LoginRepo repo;

	    @Override
	    public void addUser(Login user) {
	        repo.save(user);
	    }

	    @Override
	    public Login userValidation(Login user) {
	        Optional<Login> opUser = repo.findByUsernameAndPassword(user.getUsername(), user.getPassword());
	        if (opUser.isEmpty()) throw new UserNotFoundException();
	        return opUser.get();
	    }
}
