# RoutineChaser

복약/식사/생체 수치를 기록하는 개인용 루틴 트래커.

## 로컬 실행

```
npm install
npm run dev
```

`http://localhost:5173`에서 접속. 기록은 브라우저 localStorage에 저장되며, 같은 브라우저에서 새로고침해도 유지된다.

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 후 GitHub Pages에 배포한다. 배포 URL:
`https://<github-username>.github.io/<repo-name>/`

최초 1회, 저장소 Settings → Pages → Source를 "GitHub Actions"로 설정해야 한다.
