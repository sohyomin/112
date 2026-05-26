# 작업 목록 (Task List)

## 1. 프로젝트 초기 설정 (Project Setup)
- [ ] Vercel 배포를 고려하여 Next.js (또는 React + Vite) 프로젝트 생성
- [ ] Supabase 프로젝트 생성 및 API 키, URL 확보
- [ ] 프로젝트 내에 Supabase 클라이언트 라이브러리 설치 (`@supabase/supabase-js`)
- [ ] 환경 변수(`.env.local`) 설정 (Supabase URL, Anon Key 추가)

## 2. 데이터베이스 설정 (Database Setup)
- [ ] Supabase 대시보드에서 `contacts` (또는 `phonebook`) 테이블 생성
- [ ] 테이블 컬럼 구성:
  - `id`: 고유 식별자 (UUID 또는 자동 증가 Integer)
  - `name`: 이름 (Text)
  - `phone`: 전화번호 (Text)
  - `created_at`: 생성 시간 (Timestamp)
- [ ] RLS (Row Level Security) 정책 설정: 로그인이 불필요하므로 누구나 읽고/쓰고/수정하고/삭제할 수 있도록 Public 접근 허용 (테스트용 설정)

## 3. UI/UX 컴포넌트 개발 (UI Development)
- [ ] 전체 레이아웃 구성 (헤더, 본문 컨테이너)
- [ ] 연락처 목록 컴포넌트 (`ContactList`) 개발
- [ ] 단일 연락처 아이템 컴포넌트 (`ContactItem`) 개발 (수정, 삭제 버튼 포함)
- [ ] 연락처 입력 폼 컴포넌트 (`ContactForm`) 개발 (이름, 전화번호 입력 필드 및 추가 버튼)
- [ ] 연락처 수정 모달 또는 인라인 폼 컴포넌트 개발

## 4. Supabase 연동 및 CRUD 기능 구현 (API & Logic)
- [ ] **Read**: 페이지 로드 시 Supabase에서 `contacts` 데이터를 가져와서 화면에 렌더링하는 로직 구현
- [ ] **Create**: 입력 폼에서 데이터를 받아 Supabase `contacts` 테이블에 insert 하는 로직 구현
- [ ] **Update**: 특정 연락처의 정보를 수정하여 Supabase에 update 하는 로직 구현
- [ ] **Delete**: 특정 연락처를 Supabase 데이터베이스에서 delete 하는 로직 구현
- [ ] 각 작업 성공/실패 시 사용자 피드백(알림, 목록 새로고침 등) 처리

## 5. 배포 및 테스트 (Deployment & Testing)
- [ ] 로컬 환경에서 모든 CRUD 기능이 정상 작동하는지 테스트
- [ ] 코드를 GitHub 등 저장소에 푸시
- [ ] Vercel과 GitHub 저장소 연동하여 배포 진행
- [ ] Vercel 환경 변수 설정 (Supabase 키 추가)
- [ ] 라이브 배포된 웹사이트에서 기능 최종 확인
