# Schedulator: A Dynamic Task Management Application

## Installation:

After cloning, simply run the command:
```bash
npm install
```
to install the required modules.

To install server modules, navigate to directory "server" and run:
```bash
pip install wheel
pip install pandas
```

To start up the server on your device, run (from the "server" directory):
```bash
python3 mserver.py
```

If you would like to run the program and the server on different devices, replace "localhost" in the "addr" constant of App.js with your IPv4 address.

To start the app, run (from the top-level project directory):
```bash
npm start
```
Notes: 
- You must run this program in **development mode.** It will not update tasks properly in production mode.
- **This program was designed for use on iOS devices.** It may be functional on other operating systems, but it is not optimized for these devices and may not provide a fluid user experience.

## Description of the project:

At its core, this project aims to create an interactive task management system. It aims to tackle several issues starting with the fact that adding items to digital calendars is not usually available, rarely convenient, and entirely unpopular. Additionally, it may prove to be impractical for many who are unable to follow their schedules.

Typically, high school and college students face the eternal struggle that is time management. After all, how often does the average college student find themself adding tasks to their planner and actually following their planned schedule? The underlying issue here is twofold: creating schedules in calendar applications is cumbersome and time-consuming, and setting time aside for independent projects is a chore in and of itself. This project aims to solve both issues by taking the burden of schedule creation out of the user’s hands, algorithmically determining the best times to work on assignments, projects, or even personal goals. 

### This brings us to the barebones of our task management tool:

Schedulator is a dynamic task management system that combines the functionality of an agenda, task list, and automatic scheduler into one convenient application. This program differentiates between static tasks (e.g. Lunch with friends or Biology class), dynamic tasks (e.g. Work on homework, workout), and tasks scheduled by the algorithm. Adding static or dynamic events will display them in the agenda and task list, and generating scheduled tasks will conveniently split up dynamic tasks into manageable chunks, taking into account other tasks. It contains a settings page which allows the user to influence the generation of these events, and uses an account system to dynamically display information to different users. 