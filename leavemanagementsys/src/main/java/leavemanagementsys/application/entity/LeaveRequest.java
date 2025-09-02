package leavemanagementsys.application.entity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import leavemanagementsys.application.enums.LeaveStatus;
import leavemanagementsys.application.enums.LeaveType;

@Entity
public class LeaveRequest {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@ManyToOne
	@JoinColumn(name = "empId", referencedColumnName = "empId")
	private Employee employee;
	@Column(name = "MANAGER_ID")
	private String managerId;
	@Column
	private LocalDate fromDate;
	@Column
	private LocalDate toDate;
	@Column
	@Enumerated(EnumType.STRING)
	private LeaveType leaveType;
	@Column
	private int numberOfDays;
	@Column
	private LocalDate dateApplied;
	@Enumerated(EnumType.STRING)
    private LeaveStatus leaveStatus;
	@Column
	private String remarks;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getManagerId() {
		return managerId;
	}
	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}
	public LocalDate getFromDate() {
		return fromDate;
	}
	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}
	public LocalDate getToDate() {
		return toDate;
	}
	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}
	public LeaveType getLeaveType() {
		return leaveType;
	}
	public void setLeaveType(LeaveType leaveType) {
		this.leaveType = leaveType;
	}
	public int getNumberOfDays() {
		return numberOfDays;
	}
	public void setNumberOfDays(int numberOfDays) {
		this.numberOfDays = numberOfDays;
	}
	public LocalDate getDateApplied() {
		return dateApplied;
	}
	public void setDateApplied(LocalDate dateApplied) {
		this.dateApplied = dateApplied;
	}
	public LeaveStatus getLeaveStatus() {
		return leaveStatus;
	}
	public void setLeaveStatus(LeaveStatus leaveStatus) {
		this.leaveStatus = leaveStatus;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
