CREATE DATABASE IF NOT EXISTS template_db;
CREATE DATABASE IF NOT EXISTS template_db_shadow;

GRANT ALL PRIVILEGES ON template_db.* TO 'dbuser'@'%';
GRANT ALL PRIVILEGES ON template_db_shadow.* TO 'dbuser'@'%';

FLUSH PRIVILEGES;
