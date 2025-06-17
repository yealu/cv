import { test, expect } from '@playwright/test';

test.describe('경력기술서 웹사이트 검증', () => {
  
  test.beforeEach(async ({ page }) => {
    // 로컬 개발 서버가 실행 중이라고 가정
    await page.goto('http://localhost:3000');
  });

  test('메인 페이지 로딩 및 기본 요소 확인', async ({ page }) => {
    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/career-profile/);
    
    // 메인 헤더 확인
    await expect(page.getByRole('heading', { name: '안녕하세요, 이창신입니다' })).toBeVisible();
    
    // 서브타이틀 확인
    await expect(page.getByText('데이터 기반 의사결정을 이끄는 재무 전문가')).toBeVisible();
    
    // 헤더 태그들 확인
    await expect(page.getByText('⚡ 효율성')).toBeVisible();
    await expect(page.getByText('🤖 AI 활용')).toBeVisible();
    await expect(page.getByText('💡 프로세스 개선')).toBeVisible();
    
    // 연락처 정보 확인
    await expect(page.getByText('tlsl111009@gmail.com')).toBeVisible();
    await expect(page.getByText('010-4577-8179')).toBeVisible();
    
    // 네비게이션 버튼 확인
    await expect(page.getByRole('link', { name: /상세 경력 확인하기/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /PDF 다운로드/ })).toBeVisible();
  });

  test('네비게이션 링크 동작 확인', async ({ page }) => {
    // 경력 상세 페이지로 이동
    const careerButton = page.getByRole('link', { name: /상세 경력 확인하기/ });
    await expect(careerButton).toBeVisible();
    await careerButton.click();

    // 경력 페이지로 이동 확인
    await expect(page).toHaveURL('http://localhost:3000/career');
  });

  test('PDF 다운로드 페이지 접근 확인', async ({ page }) => {
    // PDF 페이지로 이동
    const pdfButton = page.getByRole('link', { name: /PDF 다운로드/ });
    await expect(pdfButton).toBeVisible();
    await pdfButton.click();

    // PDF 페이지로 이동 확인
    await expect(page).toHaveURL('http://localhost:3000/pdf');
    await expect(page.getByRole('heading', { name: /이창신/ })).toBeVisible();
  });

  test('경력 상세 페이지 내용 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/career');

    // 네비게이션 바 확인 (더 구체적인 셀렉터 사용)
    await expect(page.getByRole('link', { name: '슈퍼빌런랩스' })).toBeVisible();
    await expect(page.getByRole('link', { name: '플루토스디에스' })).toBeVisible();
    await expect(page.getByRole('link', { name: '주식회사 일로와' })).toBeVisible();

    // 회사 제목들 확인
    await expect(page.getByRole('heading', { name: /슈퍼빌런랩스/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /플루토스디에스/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /주식회사 일로와/ })).toBeVisible();

    // 기술 스택 확인
    await expect(page.getByText('Python')).toBeVisible();
    await expect(page.getByText('Excel')).toBeVisible();
    await expect(page.getByText('Google Sheets')).toBeVisible();
  });

  test('PDF 생성 기능 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/pdf');
    
    // PDF 생성 버튼 확인
    const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
    await expect(downloadButton).toBeVisible();
    
    // 버튼 클릭 가능 여부 확인
    await expect(downloadButton).toBeEnabled();
    
    // PDF 내용 확인
    await expect(page.getByText('데이터 기반 의사결정을 이끄는 재무 전문가')).toBeVisible();
    await expect(page.getByText('슈퍼빌런랩스')).toBeVisible();
    await expect(page.getByText('플루토스디에스')).toBeVisible();
  });

  test('반응형 디자인 확인 - 모바일', async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.getByRole('heading', { name: '안녕하세요, 이창신입니다' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '연락처' })).toBeVisible();
    
    // 경력 페이지에서 네비게이션 바 확인
    await page.goto('http://localhost:3000/career');
    await expect(page.getByRole('link', { name: '슈퍼빌런랩스' })).toBeVisible();
  });

  test('반응형 디자인 확인 - 태블릿', async ({ page }) => {
    // 태블릿 뷰포트로 설정
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await expect(page.getByRole('heading', { name: '안녕하세요, 이창신입니다' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '연락처' })).toBeVisible();
    
    // 경력 페이지에서 네비게이션 바 확인
    await page.goto('http://localhost:3000/career');
    await expect(page.getByRole('link', { name: '슈퍼빌런랩스' })).toBeVisible();
  });

  test('접근성 확인', async ({ page }) => {
    // 기본 접근성 요소들 확인
    await expect(page.getByRole('main')).toBeVisible();
    
    // 헤딩 구조 확인
    const headings = page.getByRole('heading');
    await expect(headings.first()).toBeVisible();
    
    // 링크 접근성 확인
    const links = page.getByRole('link');
    await expect(links.first()).toBeVisible();
  });

  test('페이지 성능 확인', async ({ page }) => {
    // 페이지 로딩 시간 측정
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    const loadTime = Date.now() - startTime;
    
    // 3초 이내 로딩 확인
    expect(loadTime).toBeLessThan(3000);
    
    // 필수 요소들이 빠르게 로드되는지 확인
    await expect(page.getByRole('heading', { name: '안녕하세요, 이창신입니다' })).toBeVisible({ timeout: 2000 });
  });
}); 