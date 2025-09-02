package leavemanagementsys.application.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import leavemanagementsys.application.dto.LeaveRequestDto;
import leavemanagementsys.application.entity.Employee;
import leavemanagementsys.application.entity.LeaveRequest;
import leavemanagementsys.application.enums.LeaveStatus;
import leavemanagementsys.application.exceptions.EmployeeNotFoundException;
import leavemanagementsys.application.exceptions.InvalidLeaveOperationException;
import leavemanagementsys.application.exceptions.LeaveNotFoundException;
import leavemanagementsys.application.repositories.EmployeeRepo;
import leavemanagementsys.application.repositories.LeaveRequestRepo;

@Service
public class LeaveServiceImpl implements LeaveService{
	@Autowired
    LeaveRequestRepo leaveRepo;

    @Autowired
    EmployeeRepo empRepo;

    @Override
    public LeaveRequest applyLeave(LeaveRequestDto dto) {
        Employee emp = empRepo.findById(dto.getEmpId())
                .orElseThrow(() -> new EmployeeNotFoundException(dto.getEmpId()));
        String managerId = emp.getManagerId(); 
        if (managerId == null || managerId.isBlank()) {
            throw new InvalidLeaveOperationException("Employee does not have a manager assigned");
        }
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployee(emp);
        leaveRequest.setManagerId(managerId);
        leaveRequest.setFromDate(dto.getFromDate());
        leaveRequest.setToDate(dto.getToDate());
        leaveRequest.setLeaveType(dto.getLeaveType());
        leaveRequest.setRemarks(dto.getRemarks());
        if (leaveRequest.getToDate().isBefore(leaveRequest.getFromDate())) {
            throw new InvalidLeaveOperationException("toDate cannot be before fromDate");
        }
        long daysBetween = leaveRequest.getToDate().toEpochDay() - leaveRequest.getFromDate().toEpochDay() + 1;
        leaveRequest.setNumberOfDays((int) daysBetween);
        leaveRequest.setDateApplied(LocalDate.now());
        leaveRequest.setLeaveStatus(LeaveStatus.APPLIED);
        return leaveRepo.save(leaveRequest);
    }
    @Override
    public LeaveRequest verifyLeave(Long leaveId, LeaveStatus status, String remarks) {
        LeaveRequest lr = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new LeaveNotFoundException(leaveId));

        if (status == LeaveStatus.APPROVED) {
            lr.setLeaveStatus(LeaveStatus.APPROVED);
        } else if (status == LeaveStatus.REJECTED) {
            if (remarks == null || remarks.isBlank()) {
                throw new InvalidLeaveOperationException("remarks are mandatory when rejecting a leave");
            }
            lr.setLeaveStatus(LeaveStatus.REJECTED);
            lr.setRemarks(remarks);
        } else {
            throw new InvalidLeaveOperationException("Only APPROVED or REJECTED allowed in verification");
        }

        return leaveRepo.save(lr);
    }

    @Override
    public LeaveRequest cancelLeave(Long leaveId) {
        LeaveRequest lr = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new LeaveNotFoundException(leaveId));

        if (lr.getLeaveStatus() != LeaveStatus.APPROVED) {
            throw new InvalidLeaveOperationException("Only APPROVED leaves can be CANCELLED");
        }
        lr.setLeaveStatus(LeaveStatus.CANCELLED);
        return leaveRepo.save(lr);
    }

    @Override
    public LeaveRequest withdrawLeave(Long leaveId) {
        LeaveRequest lr = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new LeaveNotFoundException(leaveId));

        if (lr.getLeaveStatus() != LeaveStatus.APPLIED) {
            throw new InvalidLeaveOperationException("Only APPLIED (not yet approved/rejected) leaves can be WITHDRAWN");
        }
        lr.setLeaveStatus(LeaveStatus.WITHDRAWN);
        return leaveRepo.save(lr);
    }

    @Override
    public Optional<LeaveRequest> checkLeaveStatus(Long leaveId) {
        return leaveRepo.findById(leaveId);
    }

    @Override
    public List<LeaveRequest> getLeaveHistory(String empId) {
        empRepo.findById(empId).orElseThrow(() -> new EmployeeNotFoundException(empId));
        return leaveRepo.findByEmployee_EmpId(empId);
    }
    @Override
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepo.findAll();
    }
    @Override
    public List<LeaveRequest> getPendingLeavesForManager(String managerId) {
        return leaveRepo.findByManagerId(managerId).stream()
                .filter(lr -> lr.getLeaveStatus() == LeaveStatus.APPLIED)
                .toList();
    }

}