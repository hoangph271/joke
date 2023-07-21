#!/bin/bash

# Check if the CODE environment variable is set
if [ -z "$RAW_CODE" ]; then
  echo "RAW_CODE environment variable not provided. Exiting..."
  exit 1
fi

# Store the code snippet in script.py
echo "$RAW_CODE" > /app/script.py

# Execute the Python script
python /app/script.py > /app/output.txt
