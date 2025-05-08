# 5월 6일 졸업 작품

## 1. "/search" 페이지 구성

### 조건

- 키워드를 사용해서 트윗 검색

### 구현

- 유저 이름으로 검색

- 클릭 시 유저 아이디 페이지로 이동

## 2. "/users/[username]" 페이지 구성

### 조건

- 유저의 프로필 표시

- 해당 유저가 포스팅한 트윗 표시

- 에디터 페이지 이동 기능

### 구현

- 유저 기본 프로필 표시

- Post, Replies, Likes 표시 하도록 tabs 추가

    - children 중첩

- "Edit profile" 버튼 추가

    - 에디터 페이지로 이동

## 3. "/users/[username]/edit" 페이지 구성

### 조건

- username, email, bio, password 수정 가능

### 구현

- 에디터 페이지는 사이드 바를 노출하지 않기 위해서 (tabs) 폴더 바깥에 구성

## 4. 사이드바 구성

### 조건

- (tabs) 항목 들에 사이드바 적용

### 구현

- (tabs) 폴더에 layout.tsx 구성

    - home, search, users/[username], edit 이동 버튼

- 사이드바 적용을 위해서 home 폴더 추가

Zod, Server Actions, userOptimistic, reavalidatePath 사용

Vercel과 Vercel Postgres 로 배포

## 오류

1. middleware 함수가 NextResponse를 반환하지 않고 아무것도 리턴하지 않아서 발생

2. getSession함수에서 iron-session 사용 안됨

3. server action 에 File 전달 불가

- Client 함수로 만들어야 함

4. server actino 에 alert 사용 시 무조건 **에러** 발생

npm i -g vercel
vercel login
vercel link
vercel env pull .env.development.local
npx prisma migrate dev --create-only
