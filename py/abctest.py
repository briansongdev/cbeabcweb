import requests
import json
import sys

#url = 'https://fastapptest-osixi.ondigitalocean.app/abc'
url = 'https://fastabc-57h9n.ondigitalocean.app/abc'

# useage:  python abctest.py <abc json input filename>

fileName = sys.argv[1]
print('opening ' + fileName)
try:
    myinput = open(fileName, 'r')

except:
    print('trouble opening ' + filenName)
    exit()

inputText = myinput.read()


response = requests.post(url, data=inputText)

#print (response)

if (response.status_code == 200):
    pretty =  json.dumps(response.json(), indent=2)
    print (pretty)
   
else:
    print ('Response error')
    print (response.text)
	

