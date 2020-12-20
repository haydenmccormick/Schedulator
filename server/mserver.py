import os
import platform
import http.server as server
import csv
import json
import time
import sqlite3
import pandas as pd


class HTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def do_PUT(self):
        file_length = int(self.headers['Content-Length'])
        # print(self.headers)
        file = self.rfile.read(file_length)
        # print(file)
        file = file.decode()
        file2 = []
        str = ""
        for n in file:
            if n == '\n':
                file2.append(str)
                str = ""
            elif n != '\r':
                str += n
        for n in file2:
            if "insert into" in n:
                str = n
            if "delete from" in n:
                str = n
            if "update" in n:
                str = n
        if str == "":
            print("No command")
            exit(1)
        print(str)
        connection = sqlite3.connect('db.db')
        cur = connection.cursor()
        cur.execute(str)
        connection.commit()
        cur.close()
        createJSON()


def createJSON():
    connection = sqlite3.connect('db.db')
    cur = connection.cursor()
    command = "select * from users"
    df = pd.read_sql(command, connection)
    df = df.T
    df.to_json("users.json")
    command = "select * from dynamicTasks order by finished, deadline"
    df = pd.read_sql(command, connection)
    df = df.T
    df.to_json("dynamicTasks.json")
    command = "SELECT taskname, dateString, startTime, endTime, 'static' AS type, username FROM tasks UNION SELECT taskname"
    command += ", dateString, '' AS startTime, deadline AS endTime, 'dynamic' AS type, username FROM dynamicTasks "
    command += "UNION SELECT taskname, dateString, startTime, endTime, 'scheduled' AS type, username FROM scheduledTasks ORDER BY endTime"
    df = pd.read_sql(command, connection)
    df = df.T
    df.to_json("all.json")
    cur.close()


if __name__ == '__main__':
    createJSON()
    if platform.system() == 'Darwin':
        os.system("ipconfig getifaddr en0")
    else:
        os.system("hostname -I")
    server.test(HandlerClass=HTTPRequestHandler)
