# Untitled-Scheduling-Project

## Description of the project:

At its core, this project aims to create an interactive task management system. It aims to tackle several issues starting with the fact that adding items to digital calendars is not usually available, rarely convenient, and entirely unpopular. Additionally, it may prove to be impractical for many who are unable to follow their schedules.

Typically, high school and college students face the eternal struggle that is time management. After all, how often does the average college student find themself adding tasks to their planner and actually following their planned schedule? The underlying issue here is twofold: creating schedules in calendar applications is cumbersome and time-consuming, and setting time aside for independent projects is a chore in and of itself. This project aims to solve both issues by taking the burden of schedule creation out of the user’s hands, algorithmically determining the best times to work on assignments, projects, or even personal goals. 

### This brings us to the barebones of the proposed task management tool:

The idea for the use of the application/extension is as follows:
A task is identified and conveniently added to the calendar through either the application, or the chrome extension (eg. when viewing the syllabus on CCLE, add midterm dates, assignment due dates, etc.) Tasks will be separated into two primary types (each accepting their own distinct name, category, description, etc.):
Static tasks, which act as regular calendar events unaffected by the task assignment algorithm (e.g. class, meetings, lunch, etc.)
Dynamic tasks, which will accept a due date and estimated time requirement.
Using the estimated time required to complete a dynamic task, the algorithm will organize your time such that it assigns time slots for you to complete certain tasks given preset preferences:
This takes into account when you would not be available to work, assumed sleeping schedule, etc.
Each task has a buffer period before and after, simulating normal task planning in the best way possible:
When it is time to do a certain dynamic task, the application will notify a reminder to the user and ask whether they approve or not:
Schedules change, and the user will not be able to have everything they want to do on their calendar. Therefore, one must approve of a certain task when it is time to work on it.
If the user is unavailable, the program reschedules the task to an appropriate time in the future.
If this may lead to missing a deadline, the program alerts the user.
If the user finishes their dynamic task prematurely, they can mark the task as completed conveniently through the application.

## How it will be made:

We plan to implement this project for mobile devices (IOS and Android) using React Native, building upon react-calendar (https://www.npmjs.com/package/react-calendar). HTML and CSS will be used for styling. Git is used to version control.

## Work Division:

We will split responsibilities into two groups: front-end and back-end. The groups will maintain constant communication with each other to ensure that all code is compatible and that the same coding conventions are being followed, and members of groups will divide work based on experience (both past and desired).
