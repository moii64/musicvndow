FROM node:18-alpine

# Cài đặt yt-dlp và ffmpeg
RUN apk add --no-cache \
    python3 \
    py3-pip \
    ffmpeg \
    && pip3 install --no-cache-dir yt-dlp

# Tạo thư mục app
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Tạo thư mục downloads
RUN mkdir -p downloads

# Expose port
EXPOSE 8080

# Start server
CMD ["npm", "start"]
