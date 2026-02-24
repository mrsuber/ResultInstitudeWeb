# Infrastructure Setup Documentation

**Project:** Result Institute Management System MVP1
**Date:** February 24, 2026
**VPS:** root@76.13.41.99
**Domain:** resultinstitude.fayshaa.com

## Overview

This document details the infrastructure setup for the Result Institute web application, a training management and monitoring system for leadership development programs.

## VPS Configuration

### Server Details
- **IP Address:** 76.13.41.99
- **Operating System:** Ubuntu (nginx/1.24.0)
- **Web Server:** Nginx 1.24.0
- **Database:** PostgreSQL (shared across all VPS applications)
- **Access:** SSH as root

### Other Applications on VPS
The VPS hosts multiple applications:
- fayshaa.com
- digitalcoffee.cafe
- emergingdream.com
- resultinstitude.fayshaa.com (this project)

## Domain & DNS Setup

### Domain Configuration
- **Primary Domain:** resultinstitude.fayshaa.com
- **DNS Record Type:** A Record
- **Points to:** 76.13.41.99
- **TTL:** Automatic
- **DNS Provider:** Configured via fayshaa.com domain panel

### DNS Records
```
Type: A Record
Host: resultinstitude
Value: 76.13.41.99
TTL: Automatic
```

## Directory Structure

### Application Directory
```
/var/www/resultinstitude/
└── frontend/
    └── index.html (Welcome page)
```

**Note:** When deploying the full application, the structure will be:
```
/var/www/resultinstitude/
├── frontend/         # React.js build files
└── backend/          # Node.js/Express application (if needed)
```

## Nginx Configuration

### Configuration File
**Location:** `/etc/nginx/sites-available/resultinstitude.fayshaa.com`

**Enabled via symlink:** `/etc/nginx/sites-enabled/resultinstitude.fayshaa.com`

### Server Block Configuration

```nginx
# Result Institute Web Application - nginx Configuration
# Domain: resultinstitude.fayshaa.com

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name resultinstitude.fayshaa.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/resultinstitude.fayshaa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/resultinstitude.fayshaa.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Logs
    access_log /var/log/nginx/resultinstitude-access.log;
    error_log /var/log/nginx/resultinstitude-error.log;

    # Frontend static files
    location / {
        root /var/www/resultinstitude/frontend;
        try_files $uri $uri/ /index.html;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Security: Hide nginx version
    server_tokens off;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;

    server_name resultinstitude.fayshaa.com;

    return 301 https://$server_name$request_uri;
}
```

### Future Backend Configuration
When the backend is deployed, add this location block to the HTTPS server:

```nginx
# API Backend proxy
location /api {
    proxy_pass http://localhost:3001;  # Choose available port
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

## SSL Certificate

### Certificate Details
- **Certificate Authority:** Let's Encrypt
- **Certificate Location:** `/etc/letsencrypt/live/resultinstitude.fayshaa.com/`
- **Expiration Date:** May 25, 2026
- **Auto-renewal:** Configured via certbot

### Certificate Files
```
fullchain.pem  - Full certificate chain
privkey.pem    - Private key
cert.pem       - Certificate only
chain.pem      - Chain only
```

### Certificate Setup Command
```bash
certbot --nginx -d resultinstitude.fayshaa.com \
  --non-interactive \
  --agree-tos \
  --email support@fayishaa.com \
  --redirect
```

### Certificate Renewal
Certbot automatically renews certificates. To manually renew:
```bash
certbot renew
systemctl reload nginx
```

## Log Files

### Access Log
**Location:** `/var/log/nginx/resultinstitude-access.log`

View recent access logs:
```bash
tail -f /var/log/nginx/resultinstitude-access.log
```

### Error Log
**Location:** `/var/log/nginx/resultinstitude-error.log`

View recent errors:
```bash
tail -f /var/log/nginx/resultinstitude-error.log
```

## Firewall & Security

### Security Headers
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection

### HTTPS Configuration
- TLS 1.2 and 1.3 enabled
- Strong cipher suites (via Let's Encrypt defaults)
- HTTP/2 support enabled
- Automatic HTTP to HTTPS redirect

## Database Configuration

### PostgreSQL
- **Database System:** PostgreSQL (shared across VPS)
- **Connection:** localhost (same VPS)
- **Database Name:** TBD (to be created during deployment)
- **User:** TBD (to be created during deployment)

**Note:** Database credentials should be stored in environment variables, never in code.

## Deployment Checklist

### Initial Setup (Completed)
- [x] DNS A record configured
- [x] Directory structure created
- [x] Nginx configuration file created
- [x] SSL certificate obtained
- [x] HTTPS working with redirect
- [x] Welcome page deployed

### Application Deployment (Pending)
- [ ] Create PostgreSQL database
- [ ] Create database user with appropriate permissions
- [ ] Deploy backend application (Node.js/Express)
- [ ] Deploy frontend build (React.js)
- [ ] Configure environment variables
- [ ] Set up backend service (PM2 or systemd)
- [ ] Test API endpoints
- [ ] Test frontend application

## Useful Commands

### Nginx Management
```bash
# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx

# Restart nginx
systemctl restart nginx

# Check nginx status
systemctl status nginx
```

### SSL Certificate Management
```bash
# List certificates
certbot certificates

# Renew certificates
certbot renew

# Revoke certificate
certbot revoke --cert-path /etc/letsencrypt/live/resultinstitude.fayshaa.com/fullchain.pem
```

### File Management
```bash
# Navigate to application directory
cd /var/www/resultinstitude

# Check disk usage
du -sh /var/www/resultinstitude

# Set proper permissions
chown -R www-data:www-data /var/www/resultinstitude
```

## Troubleshooting

### Site Not Loading
1. Check DNS propagation: `nslookup resultinstitude.fayshaa.com`
2. Verify nginx is running: `systemctl status nginx`
3. Check nginx configuration: `nginx -t`
4. Review error logs: `tail -f /var/log/nginx/resultinstitude-error.log`

### SSL Certificate Issues
1. Verify certificate exists: `certbot certificates`
2. Check certificate expiration date
3. Attempt manual renewal: `certbot renew --dry-run`
4. Review certbot logs: `/var/log/letsencrypt/letsencrypt.log`

### Permission Issues
```bash
# Fix ownership
chown -R www-data:www-data /var/www/resultinstitude

# Fix directory permissions
find /var/www/resultinstitude -type d -exec chmod 755 {} \;

# Fix file permissions
find /var/www/resultinstitude -type f -exec chmod 644 {} \;
```

## Support & Contacts

- **Technical Contact:** support@fayishaa.com
- **Company:** Camsol Technologies Ltd.
- **Phone:** +237 5325 5547

---

**Last Updated:** February 24, 2026
**Maintained By:** Camsol Technologies Ltd.
