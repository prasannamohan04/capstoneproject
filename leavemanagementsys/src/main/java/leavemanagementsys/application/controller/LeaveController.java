package leavemanagementsys.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import leavemanagementsys.application.dto.LeaveRequestDto;
import leavemanagementsys.application.entity.LeaveRequest;
import leavemanagementsys.application.enums.LeaveStatus;
import leavemanagementsys.application.exceptions.InvalidLeaveOperationException;
import leavemanagementsys.application.service.LeaveService;

@RestController
@CrossOrigin(origins = {"http://localhost:3001"})
public class LeaveController {
	@Autowired
	LeaveService service;
	 @PostMapping("/applyleaverequest")
	 public ResponseEntity<LeaveRequest> apply(@Valid @RequestBody LeaveRequestDto dto) {
	     return ResponseEntity.ok(service.applyLeave(dto));
	    }
    @PutMapping("/verifyleaverequest")
    public ResponseEntity<LeaveRequest> verify(@RequestParam Long leaveId,
                                               @RequestParam LeaveStatus status,
                                               @RequestParam(required = false) String remarks) {
        if (status == LeaveStatus.REJECTED && (remarks == null || remarks.isBlank())) {
            throw new InvalidLeaveOperationException("remarks are mandatory when rejecting a leave");
        }
        return ResponseEntity.ok(service.verifyLeave(leaveId, status, remarks));
    }
    @GetMapping("/checkleaverequeststatus")
    public ResponseEntity<LeaveRequest> status(@RequestParam Long leaveId) {
        return service.checkLeaveStatus(leaveId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new leavemanagementsys.application.exceptions.LeaveNotFoundException(leaveId));
    }
    @PutMapping("/cancelleave")
    public ResponseEntity<LeaveRequest> cancel(@RequestParam Long leaveId) {
        return ResponseEntity.ok(service.cancelLeave(leaveId));
    }
    @PutMapping("/withdrawleave")
    public ResponseEntity<LeaveRequest> withdraw(@RequestParam Long leaveId) {
        return ResponseEntity.ok(service.withdrawLeave(leaveId));
    }
    @GetMapping("/viewleavehistory")
    public ResponseEntity<List<LeaveRequest>> history(@RequestParam String empId) {
        return ResponseEntity.ok(service.getLeaveHistory(empId));
    }
    @GetMapping("/viewallleaves")
    public ResponseEntity<List<LeaveRequest>> viewAllLeaves() {
        return ResponseEntity.ok(service.getAllLeaves());
    }
    @GetMapping("/verifyleaverequests")
    public ResponseEntity<List<LeaveRequest>> getPendingLeaves(@RequestParam String managerId) {
        List<LeaveRequest> pendingLeaves = service.getPendingLeavesForManager(managerId);
        return ResponseEntity.ok(pendingLeaves);
    }
}
