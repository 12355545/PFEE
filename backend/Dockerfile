# Use an official Python runtime as a parent image
FROM python:3.11.2-slim-buster

# Set environment variables
# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /backend

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the content of the local directory to the working directory
COPY . .

# Specify the command to run on container start
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
