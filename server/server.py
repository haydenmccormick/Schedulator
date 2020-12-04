import os
import platform
try:
    import http.server as server
except ImportError:
    # Handle Python 2.x
    import SimpleHTTPServer as server

class HTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def do_PUT(self):
        file_length = int(self.headers['Content-Length'])
        #print(self.headers)
        file = self.rfile.read(file_length)
        #print(file)
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
        if str == "":
            print("No command")
            exit(1)
        print(str)
        command = "sqlite3 db.db " + "\"" + str + ";\""
        os.system(command)

if __name__ == '__main__':
    if platform.system() == 'Darwin':
        os.system("ipconfig getifaddr en0")
    else:
        os.system("hostname -I")
    server.test(HandlerClass=HTTPRequestHandler)
