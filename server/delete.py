import os
import platform
import http.server as server
import csv
import json
import time
import sqlite3
import pandas as pd


def delete():
    connection = sqlite3.connect('db.db')
    cur = connection.cursor()
    cur.execute("delete from tasks")
    cur.execute("delete from dynamicTasks")
    cur.execute("delete from scheduledTasks")
    cur.close()


if __name__ == '__main__':
    delete()
