package leavemanagementsys.application.service;

import java.util.List;
import java.util.Optional;

import leavemanagementsys.application.dto.LeaveRequestDto;
import leavemanagementsys.application.entity.LeaveRequest;
import leavemanagementsys.application.enums.LeaveStatus;

public interface LeaveService {
	LeaveRequest applyLeave(LeaveRequestDto dto);
    LeaveRequest verifyLeave(Long leaveId, LeaveStatus status, String remarks);
    LeaveRequest cancelLeave(Long leaveId);
    LeaveRequest withdrawLeave(Long leaveId);
    Optional<LeaveRequest> checkLeaveStatus(Long leaveId);
    List<LeaveRequest> getLeaveHistory(String empId);
    List<LeaveRequest> getAllLeaves();
    List<LeaveRequest> getPendingLeavesForManager(String managerId);

}
