import os
import platform
import http.server as server
import csv
import json
import time
import sqlite3


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
        #command = "sqlite3 db.db " + "\"" + str + ";\""
        #os.system(command)
        createJSON()


def createJSON():
    command = "sqlite3 db.db \" select * from dynamicTasks order by finished, deadline;\">dynamicTasks.txt"
    os.system(command)
    command = "sqlite3 db.db \" SELECT taskname, dateString, startTime, endTime, 'static' AS type FROM tasks UNION SELECT taskname"
    command += ", dateString, '' AS startTime, deadline AS endTime, 'dynamic' AS type FROM dynamicTasks "
    command += "UNION SELECT taskname, dateString, startTime, endTime, 'scheduled' AS type FROM scheduledTasks ORDER BY endTime\""
    command += ">all.txt"
    os.system(command)
    sed = "sed "
    if platform.system() == 'Darwin':
        # brew install gnu-sed
        sed = "/usr/local/Cellar/gnu-sed/4.8/bin/gsed "
    command = sed + "-i 's/|/,/g'"
    os.system(command + " all.txt")
    os.system(command + " dynamicTasks.txt")
    command = sed + "-i \'1 i\\taskname,date,endTime,period,split,dateString,deadline,dontShow,startTime,finished\' dynamicTasks.txt"
    os.system(command)
    command = sed + "-i \'1 i\\taskname,dateString,startTime,endTime,type\' all.txt"
    os.system(command)
    with open('all.txt') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    with open('all.json', 'w') as f:
        json.dump(rows, f)
    with open('dynamicTasks.txt') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    with open('dynamicTasks.json', 'w') as f:
        json.dump(rows, f)


if __name__ == '__main__':
    #createJSON()
    if platform.system() == 'Darwin':
        os.system("ipconfig getifaddr en0")
    else:
        os.system("hostname -I")
    server.test(HandlerClass=HTTPRequestHandler)
