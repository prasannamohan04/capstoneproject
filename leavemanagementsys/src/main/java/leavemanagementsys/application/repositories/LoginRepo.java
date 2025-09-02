package leavemanagementsys.application.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import leavemanagementsys.application.entity.Login;

@Repository
public interface LoginRepo extends JpaRepository<Login, String> {
	Optional<Login> findByUsernameAndPassword(String username, String password);
}
