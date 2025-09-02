package leavemanagementsys.application.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import leavemanagementsys.application.entity.LeaveRequest;
import leavemanagementsys.application.enums.LeaveStatus;

public interface LeaveRequestRepo extends JpaRepository<LeaveRequest, Long>{
	List<LeaveRequest> findByEmployee_EmpId(String empId);
    List<LeaveRequest> findByManagerId(String managerId);
    List<LeaveRequest> findByLeaveStatus(LeaveStatus status);
}
