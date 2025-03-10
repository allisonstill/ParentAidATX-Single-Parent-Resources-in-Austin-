# Use an official Python runtime as an image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Install system dependencies for Selenium, Chrome & libraries (Minimized Install)
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget unzip curl \
    chromium chromium-driver \
    libnss3 libgconf-2-4 \
    libxss1 \
    fonts-liberation xdg-utils && \
    rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Set environment variables for Chrome
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_BIN=/usr/bin/chromedriver

# Install Python dependencies
COPY requirements.txt /app
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy application files
COPY . /app

# For starting API first, then running the scraper
# CMD ["sh", "-c", "gunicorn -b 0.0.0.0:5000 api:app & sleep 5 && python childcare_scraper.py"]

# Only start the API (do NOT run the scraper)
CMD ["gunicorn", "-b", "0.0.0.0:5000", "api:app"]
