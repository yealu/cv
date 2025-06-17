'use client';

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function PDFPage() {
  const generatePDF = async () => {
    try {
      const element = document.getElementById('pdf-content');
      if (!element) return;

      // PDF 출력 최적화 클래스 추가
      element.classList.add('pdf-optimized');

      const canvas = await html2canvas(element, {
        scale: 2, // 고해상도로 증가
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1200,
        height: element.scrollHeight,
        logging: false,
        foreignObjectRendering: true, // SVG 렌더링 개선
        imageTimeout: 15000
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / (imgWidth / 1.2);
      
      const totalPages = Math.ceil((imgHeight * ratio) / pdfHeight);
      
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        
        const yOffset = -(pdfHeight * i) / ratio;
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          yOffset, 
          pdfWidth, 
          (imgHeight * ratio)
        );
      }

      pdf.save('이창신_경력기술서.pdf');
      
      // PDF 생성 완료 후 최적화 클래스 제거
      element.classList.remove('pdf-optimized');
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
      
      // 오류 발생시에도 클래스 제거
      const cleanupElement = document.getElementById('pdf-content');
      if (cleanupElement) {
        cleanupElement.classList.remove('pdf-optimized');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 네비게이션 */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← 홈으로 돌아가기
          </Link>
          <button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            PDF 다운로드
          </button>
        </div>
      </div>

      {/* PDF 콘텐츠 영역 */}
      <div id="pdf-content" className="max-w-4xl mx-auto bg-white shadow-2xl">
        
        {/* 첫 번째 페이지: 개인정보 + 핵심역량 + 기술스택 */}
        <div className="page-break-after">
          {/* 헤더 섹션 */}
          <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white p-12 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start justify-between mb-8">
                <div className="flex-1">
                  <h1 className="text-5xl font-bold mb-4 leading-tight">
                    데이터 기반 의사결정을 이끄는<br />
                    <span className="text-blue-300">재무 전문가</span>
                  </h1>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">⚡ 효율성</span>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">🤖 AI 활용</span>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">💡 프로세스 개선</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <h2 className="text-2xl font-bold mb-4">연락처</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-300">📧</span>
                      <span>tlsl111009@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-blue-300">📱</span>
                      <span>010-4334-4875</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 소개 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-4">소개</h3>
                <p className="text-lg leading-relaxed text-gray-100">
                  안녕하세요! 저는 데이터 기반 의사결정을 통해 비즈니스 성과를 극대화하는 재무 전문가입니다. 
                  복잡한 재무 데이터를 명확한 인사이트로 변환하고, AI와 자동화 도구를 활용하여 업무 효율성을 
                  극대화하는 것이 저의 전문 분야입니다. 지속적인 프로세스 개선을 통해 조직의 성장에 기여하고 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 핵심 역량 */}
          <div className="p-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">핵심 역량</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-4 text-blue-800">효율성</h3>
                <p className="text-gray-700 leading-relaxed">
                  파워쿼리를 활용한 업무 자동화로 월말 결산 소요 시간을 50% 이상 단축했습니다. 
                  반복적인 데이터 처리 작업을 자동화하여 업무 효율성을 극대화하고 있습니다.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-4 text-green-800">데이터 시각화</h3>
                <p className="text-gray-700 leading-relaxed">
                  복잡한 재무 데이터를 직관적인 시각 자료로 변환하여 의사결정을 지원합니다. 
                  Excel, AI를 활용한 대시보드 구축이 가능합니다.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-4 text-purple-800">AI 활용</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cursor, Claude 등 AI 도구를 업무에 적극 활용하여 생산성 향상과 효율성을 극대화합니다. 
                  반복 작업 자동화와 데이터 분석을 통해 업무 품질을 높이고 있습니다.
                </p>
              </div>
            </div>

            {/* 기술 스택 및 도구 */}
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">기술 스택 및 도구</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center card-shadow">
                <div className="text-3xl mb-3 icon-optimized">🐍</div>
                <h4 className="font-semibold text-high-contrast">Python</h4>
                <p className="text-sm text-gray-600 mt-2">데이터 분석 및 자동화</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-semibold text-gray-800">Excel</h4>
                <p className="text-sm text-gray-600 mt-2">고급 데이터 분석</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📋</div>
                <h4 className="font-semibold text-gray-800">Google Sheets</h4>
                <p className="text-sm text-gray-600 mt-2">협업 및 실시간 분석</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-800">MS Suite</h4>
                <p className="text-sm text-gray-600 mt-2">Office, Teams 활용</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold text-gray-800">Power Query</h4>
                <p className="text-sm text-gray-600 mt-2">데이터 수집 및 변환</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🏗️</div>
                <h4 className="font-semibold text-gray-800">자동 스프레드시트</h4>
                <p className="text-sm text-gray-600 mt-2">VBA, 매크로 활용</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📝</div>
                <h4 className="font-semibold text-gray-800">Notion</h4>
                <p className="text-sm text-gray-600 mt-2">프로젝트 관리</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-semibold text-gray-800">Figma</h4>
                <p className="text-sm text-gray-600 mt-2">UI/UX 디자인</p>
              </div>
            </div>
          </div>
        </div>

        {/* 두 번째 페이지: 모든 경력 정보 */}
        <div className="page-break-before">
          <div className="p-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">경력 현황</h2>
            
            {/* 슈퍼빌런랩스 */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-2xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">슈퍼빌런랩스 (SupervillainLabsInc.)</h3>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">2024.01 - 2024.12</span>
                </div>
                <p className="text-blue-100 text-lg">Senior Finance Manager</p>
              </div>
              <div className="bg-white border-2 border-t-0 border-blue-200 p-8 rounded-b-2xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-800">주요 성과</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>재무팀의 월간 보고서 작성 및 CFO 직속 업무 수행</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>주식 투자 전략 수립 및 포트폴리오 관리로 안정적 수익 창출</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>AI 기반 재무 분석 도구 도입으로 업무 효율성 40% 향상</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-800">핵심 업무</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>월별 재무 현황 분석 및 경영진 보고서 작성</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>예산 수립 및 실적 대비 분석을 통한 비용 최적화</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>투자 포트폴리오 구성 및 리스크 관리</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 플루토스디에스 */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-t-2xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">플루토스디에스</h3>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">2022.06 - 2024.01</span>
                </div>
                <p className="text-green-100 text-lg">재무기획팀 팀원</p>
              </div>
              <div className="bg-white border-2 border-t-0 border-green-200 p-8 rounded-b-2xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-800">주요 성과</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span>시나리오 분석을 통한 리스크 관리 체계 구축</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span>자동화된 재무 보고서 시스템 구축으로 업무 시간 30% 단축</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span>데이터 기반 예산 수립 프로세스 개선</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-800">핵심 업무</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span>월별 재무 현황 보고 및 분석</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span>예산 수립 및 실적 관리</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span>투자 검토 및 수익성 분석</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 기타 주요 경력 */}
            <h2 className="text-2xl font-bold mb-8 text-gray-800">기타 주요 경력</h2>
            
            {/* 주식회사 일로와 */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">주식회사 일로와</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">2021.03 - 2021.12</span>
                </div>
                <p className="text-purple-100">소 대표이사</p>
              </div>
              <div className="bg-white border-2 border-t-0 border-purple-200 p-6 rounded-b-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 text-purple-800">주요 성과</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>스타트업 창업 및 초기 사업 전략 수립으로 시장 진입 성공</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>자금 조달 및 투자 유치를 통한 사업 확장 기반 마련</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>팀 빌딩 및 조직 운영 경험 축적</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-purple-800">핵심 업무</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>사업 계획 수립 및 전략적 의사결정</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>재무 관리 및 투자자 관계 관리</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>시장 분석 및 경쟁사 벤치마킹</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS 스타일 - PDF 출력 최적화 */}
      <style jsx>{`
        /* PDF 출력 전용 스타일 */
        #pdf-content {
          font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
        }
        
        /* PDF 출력시 페이지 브레이크 */
        @media print {
          .page-break-after {
            page-break-after: always;
          }
          .page-break-before {
            page-break-before: always;
          }
          
          /* PDF 출력시 여백 최적화 */
          #pdf-content {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          
          /* 텍스트 선명도 개선 */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        /* HTML2Canvas 캡처 최적화 */
        .pdf-optimized {
          background: white;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* 그라데이션 배경 최적화 */
        .gradient-bg {
          background: linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #7c3aed 100%);
        }
        
        /* 카드 스타일 최적화 */
        .card-shadow {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        /* 텍스트 대비 개선 */
        .text-high-contrast {
          color: #111827;
          font-weight: 500;
        }
        
        /* 아이콘 크기 최적화 */
        .icon-optimized {
          font-size: 2rem;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}