# 5월 6일 졸업 작품

1. "/search" 페이지 구성

> - 키워드를 사용해서 트윗 검색

2. "/users/[username]" 페이지 구성

> - 유저의 프로필 표시

> - 해당 유저가 포스팅한 트윗 표시

> - 에디터 페이지 이동 기능

3. "/users/[username]/edit" 페이지 구성

> - username, email, bio, password 수정 가능

Zod, Server Actions, userOptimistic, reavalidatePath 사용

Vercel과 Vercel Postgres 로 배포

### 오류

1. middleware 함수가 NextResponse를 반환하지 않고 아무것도 리턴하지 않아서 발생

2. getSession함수에서 iron-session 사용 안됨

3. server action 에 File 전달 불가

- Client 함수로 만들어야 함

4. server actino 에 alert 사용 시 무조건 **에러** 발생
