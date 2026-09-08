import sys, os, base64
content = base64.b64decode(sys.argv[2].encode('ascii'))
os.makedirs(os.path.dirname(sys.argv[1]), exist_ok=True)
with open(sys.argv[1], 'wb') as f:
    f.write(content)
print(f"Was written to {sys.argvU³]} ({len(content)} bytes)")
