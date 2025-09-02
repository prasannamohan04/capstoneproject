package leavemanagementsys.application.service;

import leavemanagementsys.application.entity.Login;

public interface LoginService {
	void addUser(Login user);
    Login userValidation(Login user);
}
