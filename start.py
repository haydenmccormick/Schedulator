#!/usr/bin/python3
import os
import platform

def removeEvents():
    os.system("sqlite3 server/db.db \"delete from tasks;\"")
    os.system("sqlite3 server/db.db \"delete from dynamicTasks;\"")

def ip():
    addr = ""
    if platform.system() == 'Darwin':
        addr = os.popen("ipconfig getifaddr en0").read()[:-1]
    else:
        addr = os.popen("hostname -I").read()[:-2]
    return addr

def changeFiles():
    #Not working yet
    addr = ip()
    if addr != "":
        addr = "const addr = /\"" + addr +  ":8000/\";"
        print(addr)
        os.system("sed -i \"6s/.*/" + addr + "/" + "EventForm.js")

def main():
    print(ip())
    os.chdir("server")
    os.system("python3 server.py")

if __name__ == '__main__':
    main()
