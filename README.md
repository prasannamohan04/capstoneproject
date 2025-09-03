Leave Management System

A simple Leave Management System built with React (frontend) and Spring Boot (backend).

Tech Stack

Frontend: React, Axios, Context API

Backend: Spring Boot, JPA, Oracle DB

Ports:

Frontend: http://localhost:3001

Backend: http://localhost:8084

Login details (for currently existing User's) : 

Username : SUTH25001     (MANAGER)
Password : srikumar@123

Username : SUTH25002     (EMPLOYEE)
Password : mohan@123 

Features :

Employee login using empId

Apply, view, and withdraw leave requests

Manager can approve or reject leaves with remarks

Holiday management (only manager can add holidays)

Global state management using AuthContext

API Endpoints :

POST /applyleaverequest – Apply leave

PUT /verifyleaverequest – Verify leave

GET /viewleavehistory?empId= – Employee leave history

GET /viewallleaves – All leaves

GET /verifyleaverequests?managerId= – Pending leaves for manager
