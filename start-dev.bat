@echo off
echo Starting Microcircuits Development Environment...
echo.

echo Starting Backend Server...
start cmd /k "cd /d c:\Users\dubey\OneDrive\Desktop\Microcircuits\server && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start cmd /k "cd /d c:\Users\dubey\OneDrive\Desktop\Microcircuits\microcircuits && npm run dev"

echo.
echo Both servers should now be running!
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:5174 (or next available port)
pause