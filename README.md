# full-stack-project-group-2

Advanced Full-Stack Programming PROG8731 - Spring 2024 - Section 7 - Group Project - Group 2

## Group Infomation

### Student Name

- Gurleen, Kaur
- Sukhmit Kaur, Sukhmit Kaur
- Yunxiang, Gu - 8904492

## Development

### Install Dependencies

```bash
cd api
npm i

cd ui
npm i
```

### Start Project

#### Run API Server

```bash
cd api
npm start
```

#### Run UI Website

```bash
cd ui
npm start
```


## Task

- [ ] You need to include React_Bootstrap and change various html elements/components and use
bootstrap components or You can use UI-Material design: <https://mui.com/material-ui/getting->
started/overview/

- [ ] You need to do following modifications for Delete api, not when you try to delete employee and
if employee’s CurrentStatus is true you need to display message: “CAN’T DELETE EMPLOYEE –
STATUS ACTIVE”

- [ ]  Add one more tab (function), UpComing Retirement, this function will display all the employee
whose retirement is coming in next six month. It is upto you how you want to implement it.

- [ ]  You also need to add an extra filter so that user can filter employees with UpComing retirement
based on their EmployeeType (Assume Retirement Age is 65 Yrs)

**Additional requirements if you are working in group of 3 people**

- [ ] Modify Employee Details API, now when you click on the Employee Details, it will also display
the no of Days, Months and Years left for the retirement. (ie Date of Joining 1 st January 2001,
Age at the time of Joining: 40 yrs, Retirement Date: 31st December 2025. So the no of days,
months and years from today (20th July 2022) => 9 days, 5 months, 3 years )