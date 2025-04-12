SHOW DATABASES;

USE umc;

CREATE TABLE MEMBER (
  member_id INT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  gender ENUM('MALE', 'FEMALE', 'OTHER'),
  birth_date DATE,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE REGION (
  region_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE STORE (
  store_id INT PRIMARY KEY,
  store_name VARCHAR(100),
  category VARCHAR(50),
  address VARCHAR(255),
  region_id INT,
  rating DECIMAL(3,2),
  is_open BOOLEAN,
  FOREIGN KEY (region_id) REFERENCES REGION(region_id)
);

CREATE TABLE MISSION (
  mission_id INT PRIMARY KEY,
  store_id INT,
  region_id INT,
  minimum_amount INT,
  reward_points INT,
  deadline_days INT,
  FOREIGN KEY (store_id) REFERENCES STORE(store_id),
  FOREIGN KEY (region_id) REFERENCES REGION(region_id)
);

CREATE TABLE MISSIONPROGRESS (
  progress_id INT PRIMARY KEY,
  mission_id INT,
  member_id INT,
  status ENUM('REQUESTED', 'IN_PROGRESS', 'COMPLETED'),
  requested_at DATETIME,
  completed_at DATETIME,
  FOREIGN KEY (mission_id) REFERENCES MISSION(mission_id),
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);

CREATE TABLE REVIEW (
  review_id INT PRIMARY KEY,
  mission_id INT,
  member_id INT,
  rating INT,
  content TEXT,
  created_at DATETIME,
  FOREIGN KEY (mission_id) REFERENCES MISSION(mission_id),
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);

CREATE TABLE REVIEWIMAGE (
  image_id INT PRIMARY KEY,
  review_id INT,
  image_url VARCHAR(255),
  FOREIGN KEY (review_id) REFERENCES REVIEW(review_id)
);

CREATE TABLE POINTHISTORY (
  point_id INT PRIMARY KEY,
  member_id INT,
  mission_id INT,
  points INT,
  earned_date DATETIME,
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id),
  FOREIGN KEY (mission_id) REFERENCES MISSION(mission_id)
);

CREATE TABLE INQUIRY (
  inquiry_id INT PRIMARY KEY,
  member_id INT,
  title VARCHAR(255),
  content TEXT,
  created_at DATETIME,
  status ENUM('PENDING', 'ANSWERED', 'CLOSED'),
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);

CREATE TABLE NOTIFICATIONSETTING (
  setting_id INT PRIMARY KEY,
  member_id INT,
  new_event BOOLEAN,
  review_reply BOOLEAN,
  inquiry_reply BOOLEAN,
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);

CREATE TABLE TERMS (
  term_id INT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  is_required BOOLEAN,
  version VARCHAR(50),
  created_at DATETIME
);

CREATE TABLE TERMSAGREEMENT (
  agreement_id INT PRIMARY KEY,
  member_id INT,
  term_id INT,
  agreed_at DATETIME,
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id),
  FOREIGN KEY (term_id) REFERENCES TERMS(term_id)
);

CREATE TABLE SOCIALLOGIN (
  social_id INT PRIMARY KEY,
  member_id INT,
  provider ENUM('KAKAO', 'NAVER', 'GOOGLE', 'APPLE'),
  provider_uid VARCHAR(255),
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);

CREATE TABLE ADDRESS (
  address_id INT PRIMARY KEY,
  member_id INT,
  address VARCHAR(255),
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);

CREATE TABLE FOODPREFERENCE (
  preference_id INT PRIMARY KEY,
  member_id INT,
  category ENUM('KOREAN', 'CHINESE', 'JAPANESE', 'WESTERN', 'ETC'),
  FOREIGN KEY (member_id) REFERENCES MEMBER(member_id)
);