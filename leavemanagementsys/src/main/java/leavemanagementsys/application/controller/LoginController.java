package leavemanagementsys.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import leavemanagementsys.application.entity.Login;
import leavemanagementsys.application.service.LoginService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3001"})
public class LoginController {
	 @Autowired
	    LoginService service;

	    @PostMapping("/register")
	    public ResponseEntity<String> addUser(@RequestBody Login user) {
	        service.addUser(user);
	        return new ResponseEntity<>("User created...", HttpStatus.OK);
	    }

	    @PostMapping("/login")
	    public ResponseEntity<Login> loginValidate(@RequestBody Login user, HttpSession session) {
	        Login u = service.userValidation(user);
	        session.setAttribute("username", u.getUsername());
	        session.setAttribute("role", u.getRole());
	        return new ResponseEntity<>(u, HttpStatus.OK);
	    }

	    @GetMapping("/logout")
	    public ResponseEntity<String> logout(HttpSession session) {
	        session.invalidate(); // user logged out
	        return new ResponseEntity<>("Session invalidated", HttpStatus.OK);
	    }

	    @GetMapping("/status")
	    public ResponseEntity<String> checkStatus(HttpSession session) {
	        if (session.getAttribute("username") != null) {
	            return new ResponseEntity<>("User logged in: " + session.getAttribute("username"), HttpStatus.OK);
	        }
	        return new ResponseEntity<>("No user logged in", HttpStatus.OK);
	    }

}
