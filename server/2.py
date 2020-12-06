"""Extend Python's built in HTTP server to save files
curl or wget can be used to send files with options similar to the following
  curl -X PUT --upload-file somefile.txt http://localhost:8000
  wget -O- --method=PUT --body-file=somefile.txt http://localhost:8000/somefile.txt
__Note__: curl automatically appends the filename onto the end of the URL so
the path can be omitted.
"""
import os
import platform
try:
    import http.server as server
except ImportError:
    # Handle Python 2.x
    import SimpleHTTPServer as server

class HTTPRequestHandler(server.SimpleHTTPRequestHandler):
    """Extend SimpleHTTPRequestHandler to handle PUT requests"""
    def do_PUT(self):
        """Save a file following a HTTP PUT request"""
        filename = os.path.basename(self.path)

        # Don't overwrite files
        if os.path.exists(filename):
            self.send_response(409, 'Conflict')
            self.end_headers()
            reply_body = '"%s" already exists\n' % filename
            self.wfile.write(reply_body.encode('utf-8'))
            return
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
        '''
        file_length = int(self.headers['Content-Length'])
        with open(filename, 'wb') as output_file:
            output_file.write(self.rfile.read(file_length))
        self.send_response(201, 'Created')
        self.end_headers()
        reply_body = 'Saved "%s"\n' % filename
        self.wfile.write(reply_body.encode('utf-8'))
        '''

if __name__ == '__main__':
    if platform.system() == 'Darwin':
        os.system("ipconfig getifaddr en0")
    else:
        os.system("hostname -I")
    server.test(HandlerClass=HTTPRequestHandler)