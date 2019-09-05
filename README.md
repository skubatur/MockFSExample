# MockFSExample

My solution to asynchronous file sytem challenge. 

The details of the challenge can be found here: https://estollnitz.github.io/mockfs/ 

In the code, I used asynchronous APIs -- stat and list -- instead of synchronous APIs. Within the callbacks of the asynchronous calls, I defined more callbacks to recursively go down the path. Since the final call to the "processDir" is asynchronous, the "output(files)" function needs to be called after a timeout (timeout = 1000 ms). I used another timeout function (with timeout = 500 ms) to handle the cases an asynchronous call may never call its callback. Since the output function is called after a timeout of 1000 ms, it handles "asynchronous stat timeout" of 500 ms for the given file system. However, with more number of files in our file system, there is a possibility of missing a few of "asynchronous stat timeout" cases. 

If given more time, I would have looked into calling the "output(files)" after the asynchronous function "processDir" is completed without using the timeout function.
