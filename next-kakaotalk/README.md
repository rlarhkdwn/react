# Next-Kakaotalk Clone

Next.js 기반으로 구현한 카카오톡 클론 채팅 서비스입니다.  
로그인, 회원가입, 1:1 및 그룹 채팅, 친구 추가를 포함한 개인 프로젝트이며,  
카카오톡의 주요 기능 UI/UX를 재현하고 다양한 기능을 직접 구현한 프로젝트입니다.
<br>
<br>

# 목차
### 1. 주요 특징
### 2. 기술 스택
### 3. 기능 상세
### 4. 이미지
### 5. 트러블슈팅
### 6. 개선 예정 기능
### 7. 실행 방법
### 8. .env.local
### 9. db 생성 구문
### 10. 필요 패키지

# **1. 주요 특징**
- 로그인 및 회원가입 기능 구현
- 카카오톡 UI 스타일의 채팅 기능 구현
- 1:1 / 그룹 채팅방 관리
- 친구 추가 / 친구 요청 승인 기능 구현

# **2. 기술 스택**
### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js Server Actions
- Route Handler

### Node.js
- JWT 인증 (jsonwebtoken)
- bcrypt 비밀번호 해싱
- HttpOnly Cookie 기반 인증

### Database
- MySQL
<br>

# **3. 기능 상세**
### 1. 인증 기능
- 회원가입, 로그인
- 비밀번호 bcrypt 해싱
- JWT 발급
- HttpOnly 쿠키 저장 및 자동 인증 유지
- 서버 측에서 토큰 검증 후 보호 라우팅 처리


### 2. 친구 기능
- 친구 추가 (ID로 추가)
- 받은 친구 요청 목록
- 승인 / 거절(승인만 구현)
- 승인 시 서로 친구 리스트에 자동 등록
- 친구 리스트 불러오기
- 서버에서 JWT로 사용자 정보 조회
- DB에서 친구 목록 JOIN 조회


### 3. 채팅 기능
- 1:1 채팅방 생성
- 기존 채팅방 존재 여부 체크
- 없으면 자동 생성

### 4. 그룹 채팅
- 여러명의 친구 선택 후 생성
- 서버에서 roomId 생성 후 멤버 매핑
- 채팅방으로 자동 이동

### 5. 메시지 전송
/api/messages/add/[roomId]  
Sender ID는 JWT에서 추출  
DB Insert 후 정상 전송 응답 반환

### 6. 메시지 조회
- /api/messages/loadMessages/[roomId]
- 시간순 정렬 (최신 → 오래된 순)

### 7. UI / UX
- 본인 메시지는 오른쪽 정렬 + 노란 말풍선
- 상대 메시지는 왼쪽 정렬 + 회색 말풍선
- 시간 표시 (HH:mm만 표시)
- 스크롤 자동 아래 고정
- 스크롤바 숨김 처리
<br>


# **4. 이미지**
로그인
<img width="1916" height="953" alt="Image" src="https://github.com/user-attachments/assets/b9dd061b-658a-41ea-b3ed-ca87358c1582" />
회원가입
<img width="1915" height="956" alt="Image" src="https://github.com/user-attachments/assets/8dcc0060-2d0d-41f0-aa40-0777fdc68106" />
메인-친구
<img width="1913" height="956" alt="Image" src="https://github.com/user-attachments/assets/8ea3c02f-afa0-4e6c-827e-3bf2c7e8e045" />
id로 친구 추가
<img width="1915" height="951" alt="Image" src="https://github.com/user-attachments/assets/df3138fc-fa6f-4dcc-bbf4-7f692d1a7b54" />
받은 친구 신청
<img width="1916" height="953" alt="Image" src="https://github.com/user-attachments/assets/84f2a045-9b18-4a44-9874-aa9d477b0445" />
친구 프로필
<img width="1915" height="955" alt="Image" src="https://github.com/user-attachments/assets/412d3144-8740-48cc-a132-7a9a002ed424" />
메인-채팅
<img width="1915" height="949" alt="Image" src="https://github.com/user-attachments/assets/49ab01d1-c0a6-493d-98ef-fd8619c41732" />
그룹 채팅 생성
<img width="1915" height="954" alt="Image" src="https://github.com/user-attachments/assets/12230e31-f14b-4f4d-9616-9ddc3cf4da51" />
채팅1
<img width="1917" height="955" alt="Image" src="https://github.com/user-attachments/assets/38dd43fc-688f-4fa5-9f9d-5e46326a5c94" />
채팅2
<img width="1915" height="956" alt="Image" src="https://github.com/user-attachments/assets/be0c63f9-bcf4-4a90-bb4e-b7dfa87cb4d2" />
채팅3
<img width="1915" height="954" alt="Image" src="https://github.com/user-attachments/assets/bafb721c-58f1-4e08-a099-81580f8cf808" />

# **5. 트러블슈팅**
1) Next.js Dynamic Route params가 Promise 객체로 나오는 문제

App Router에서는 params가 Promise 형태로 전달되어
route handler에서 상위 매개변수에서 구조분해하면 Undefined 문제가 발생.

→ props.params를 함수 내부에서 await로 분해하여 해결.


# **6. 개선 예정 기능**
- WebSocket(or Socket.io) 기반 실시간 채팅  
- 읽음 기능 추가 (read receipts)  
- 프로필 사진 / 상태 메시지 수정 기능  
- 메시지 삭제  
- 파일 / 이미지 전송
- 채팅방 최근 사용일 순 정렬


# **7. 실행 방법**
- git clone https://github.com/rlarhkdwn/react.git  
- cd next-kakaotalk  
- npm install  
- npm run dev  

### **8. .env.loacl 설정**
- DATABASE_HOST=  
- DATABASE_USER=  
- DATABASE_PASSWORD=  
- DATABASE_NAME=  
- JWT_SECRET=  


# **9. db 생성 구문**
### 1. 회원 테이블
CREATE TABLE users (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  username VARCHAR(50) NOT NULL,  
  password VARCHAR(200) NOT NULL,  
  nickname VARCHAR(50) NOT NULL,  
  created_date DATETIME DEFAULT NOW()  
);
<br>


### 2. 친구 테이블
CREATE TABLE friends (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    user_id INT NOT NULL,  
    friend_id INT NOT NULL,  
    state ENUM('pending', 'accepted', 'blocked') NOT NULL DEFAULT 'pending',  
    created_date DATETIME DEFAULT NOW(),  
    <br>
    CONSTRAINT fk_friends_user FOREIGN KEY (user_id)   
    REFERENCES users(id),  
    CONSTRAINT fk_friends_friend FOREIGN KEY (friend_id)   
    REFERENCES users(id),  
    UNIQUE KEY uq_friend_pair (user_id, friend_id)  
);
<br>


### 3. 채팅방 테이블
CREATE TABLE chat_rooms (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    room_name VARCHAR(50),  
    is_group BOOLEAN NOT NULL DEFAULT FALSE,  
    used_date DATETIME DEFAULT NOW(),  
    created_date DATETIME DEFAULT NOW()  
); 
<br>

### 4. 채팅방 멤버 테이블
CREATE TABLE chat_room_members (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    room_id INT NOT NULL,  
    user_id INT NOT NULL,  
    joined_date DATETIME DEFAULT NOW(),  
    <br>  
    CONSTRAINT fk_members_room FOREIGN KEY (room_id)   
    REFERENCES chat_rooms(id),  
    CONSTRAINT fk_members_user FOREIGN KEY (user_id)   
    REFERENCES users(id),  
    UNIQUE KEY uq_room_member (room_id, user_id)  
);
<br>

### 5. 메시지 테이블
CREATE TABLE messages (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    room_id INT NOT NULL,  
    sender_id INT NOT NULL,  
    message TEXT NOT NULL,  
    created_date DATETIME DEFAULT NOW(),  
    <br>  
    CONSTRAINT fk_msg_room FOREIGN KEY (room_id)   
    REFERENCES chat_rooms(id),  
    <br>  
    CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id)   
    REFERENCES users(id)  
);


# **10. 필요 패키지**
- npm install bcrypt
- npm install jsonwebtoken
- npm install mysql2
