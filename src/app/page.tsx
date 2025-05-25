"use client";
import React, { useEffect } from "react";
import styles from "./careerDetail.module.css";

const navItems = [
  { id: "super-villain-labs", label: "슈퍼빌런랩스" },
  { id: "plutos-ds", label: "플루토스디에스" },
  { id: "ilrowa", label: "주식회사 일로와" },
  { id: "gorura", label: "고르라" },
  { id: "taedaesan", label: "(주)태대산" },
];

export default function CareerDetail() {
  useEffect(() => {
    // 부드러운 스크롤 구현
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      const navBar = document.querySelector("." + styles.navBar) as HTMLElement;
      const navBarHeight = navBar?.offsetHeight || 35;
      const extraOffset = 16;
      if (targetElement) {
        const elementY = window.scrollY + targetElement.getBoundingClientRect().top;
        const offsetPosition = elementY - navBarHeight - extraOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };
    const anchors = document.querySelectorAll("." + styles.navBar + " a");
    anchors.forEach(anchor => anchor.addEventListener("click", handleClick));
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>경력기술서 (v8)</h1>
      <h2>개요</h2>
      <p>재무/회계 전문성을 바탕으로 데이터 기반 의사결정과 운영 효율화를 이끌어온 전문가입니다. 슈퍼빌런랩스와 플루토스디에스에서 재무 관리, 가상자산 관리, 급여/임금 제도 설계를 주도하며, AI 및 파워쿼리를 활용한 데이터 처리와 시각화로 업무 효율성을 극대화했습니다. 복잡한 데이터를 직관적으로 표현하여 경영진의 신속한 의사결정을 지원하는 데 강점을 보유하고 있습니다.</p>
      <h2>경력 및 성과</h2>
      {/* 네비게이션 바 */}
      <div className={styles.navBar}>
        {navItems.map(item => (
          <a key={item.id} href={`#${item.id}`}>{item.label}</a>
        ))}
      </div>
      {/* 슈퍼빌런랩스 */}
      <section id="super-villain-labs">
        <h3>슈퍼빌런랩스 (SupervillainLabsInc.)</h3>
        <p><strong>People Team/Finance Manager</strong> | 2024.01 - 2025.02</p>
        <h4>핵심 키워드</h4>
        <ul>
          <li>재무 관리 | 데이터 기반 의사결정 | 가상자산 관리 | 세무 신고 | 급여 관리</li>
        </ul>
        <h4>세부 내용</h4>
        <table>
          <tbody>
            <tr><th>구분</th><th>내용</th></tr>
            <tr>
              <td>성과</td>
              <td><ul>
                <li>월말/분기별 결산 소요 시간 50% 이상 단축(회계법인 2개월 → 자체 월결산 1개월).</li>
                <li>각종 신고 업무 누락 및 재신고율 0건 달성.</li>
                <li>가상자산 트랜잭션 관리로 회계 및 감사 대비 체계 구축.</li>
              </ul></td>
            </tr>
            <tr>
              <td>역할</td>
              <td><ul>
                <li>경영진 의사결정에 필요한 재무 보고서 작성 및 프로젝트별 손익계산서 작성.</li>
                <li>일일/주간/월간 자금 현황 관리, 부서(프로젝트)별 손익 관리.</li>
                <li>가상자산 관리: 지갑별 트랜잭션 관리, 벨리데이터 위탁 운영, OTC 코인 매출 관리.</li>
                <li>세무 신고 관리: 부가세, 원천세 신고, 외화 매출 및 수출실적명세서 작성.</li>
                <li>급여 관리: 약 40명 급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
              </ul></td>
            </tr>
            <tr>
              <td>영향력/기여도</td>
              <td><ul>
                <li>결산 효율화로 경영진 보고 속도 개선.</li>
                <li>가상자산 관리 체계화로 재무 투명성 및 감사 대응력 강화.</li>
                <li>급여 관리 및 세무 신고 체계화로 조직 운영 안정성 제고.</li>
              </ul></td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* 플루토스디에스 */}
      <section id="plutos-ds">
        <h3>플루토스디에스 (한빗코)</h3>
        <p><strong>경영관리 / Manager</strong> | 2022.01 - 2023.12</p>
        <h4>핵심 키워드</h4>
        <ul>
          <li>재무 관리 | 가상자산 관리 | 급여 제도 설계 | 리스크 관리 | 데이터 분석</li>
        </ul>
        <h4>세부 내용</h4>
        <table>
          <tbody>
            <tr><th>구분</th><th>내용</th></tr>
            <tr>
              <td>성과</td>
              <td><ul>
                <li>코인마켓캡 API 연동으로 실시간 가상자산 시세 적용, 결산 자료 정확도 향상.</li>
                <li>연봉 테이블 정규화로 급여 체계 개선, 리스크 관리 강화.</li>
                <li>가상자산 실사보고서 작성으로 분기별 재무 투명성 제고.</li>
              </ul></td>
            </tr>
            <tr>
              <td>역할</td>
              <td><ul>
                <li>월말/분기별 결산 진행 및 재무제표, 손익계산서 작성.</li>
                <li>가상자산 수불부 작성: 코인/지갑별 실사 수량 주간 보고, 하드월렛 관리.</li>
                <li>연봉 테이블 제작 및 급여 산출(약 60명), 사회보험 및 원천세 신고 관리.</li>
                <li>재무 관리: 일일 자금수지 정리, Burn rate 관리.</li>
              </ul></td>
            </tr>
            <tr>
              <td>영향력/기여도</td>
              <td><ul>
                <li>가상자산 데이터 기반 결산 체계로 재무 신뢰도 향상.</li>
                <li>급여 제도 정규화로 인사 관리 효율성 증대.</li>
                <li>리스크 관리 강화로 조직 안정성 제고.</li>
              </ul></td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* 주식회사 일로와 */}
      <section id="ilrowa">
        <h3>주식회사 일로와</h3>
        <p><strong>경영지원 / 대리</strong> | 2020.12 - 2021.03</p>
        <h4>핵심 키워드</h4>
        <ul>
          <li>재무 관리 | 데이터화 | 프로세스 효율화</li>
        </ul>
        <h4>세부 내용</h4>
        <table>
          <tbody>
            <tr><th>구분</th><th>내용</th></tr>
            <tr>
              <td>성과</td>
              <td><ul>
                <li>월결산 기간 50% 단축(외주 회계법인 의존 → 엑셀 분개장 전달).</li>
                <li>자금 사용 데이터화로 보고 접근성 개선.</li>
              </ul></td>
            </tr>
            <tr>
              <td>역할</td>
              <td><ul>
                <li>월별 손익계산서 작성 및 자금 수지내역 보고.</li>
                <li>엑셀 분개장 작성 및 외주 회계법인과 교차 검증.</li>
                <li>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
              </ul></td>
            </tr>
            <tr>
              <td>영향력/기여도</td>
              <td><ul>
                <li>자금 관리 투명성 향상.</li>
                <li>결산 효율화로 경영진 보고 속도 개선.</li>
              </ul></td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* 고르라 */}
      <section id="gorura">
        <h3>고르라</h3>
        <p><strong>경영관리 / 주임</strong> | 2019.06 - 2020.08</p>
        <h4>핵심 키워드</h4>
        <ul>
          <li>재무 관리 | 손익분석 | 급여 제도 설계</li>
        </ul>
        <h4>세부 내용</h4>
        <table>
          <tbody>
            <tr><th>구분</th><th>내용</th></tr>
            <tr>
              <td>성과</td>
              <td><ul>
                <li>손익분기 보고서 대시보드화로 보고 주기 20% 단축.</li>
                <li>시간외근무수당 제도 기획으로 급여 체계 개선.</li>
              </ul></td>
            </tr>
            <tr>
              <td>역할</td>
              <td><ul>
                <li>자금일보 작성 및 월별 자금수지 정리, 프로젝트별 손익계산서 작성.</li>
                <li>연봉 테이블 제작: 시간외근무수당 제도 기획, 인센티브제 도입.</li>
                <li>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
              </ul></td>
            </tr>
            <tr>
              <td>영향력/기여도</td>
              <td><ul>
                <li>경영 보고 체계 개선.</li>
                <li>급여 제도 개선으로 직원 만족도 향상.</li>
              </ul></td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* 태대산 */}
      <section id="taedaesan">
        <h3>(주)태대산</h3>
        <p><strong>경영지원 / 대리</strong> | 2018.08 - 2019.04</p>
        <h4>핵심 키워드</h4>
        <ul>
          <li>급여 관리 | 계약 관리 | 비용 절감</li>
        </ul>
        <h4>세부 내용</h4>
        <table>
          <tbody>
            <tr><th>구분</th><th>내용</th></tr>
            <tr>
              <td>성과</td>
              <td><ul>
                <li>계약 관리 개선으로 비용 절감.</li>
                <li>급여 체계 정규화로 운영 효율성 증대.</li>
              </ul></td>
            </tr>
            <tr>
              <td>역할</td>
              <td><ul>
                <li>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                <li>계약 관리: 업체별 계약서 검토, 해지 예정 업체 조율.</li>
                <li>구매 및 발주: 비품 발주 및 단가 관리.</li>
              </ul></td>
            </tr>
            <tr>
              <td>영향력/기여도</td>
              <td><ul>
                <li>운영 비용 절감으로 재무 효율성 증대.</li>
                <li>계약 관리 체계화로 조직 안정성 강화.</li>
              </ul></td>
            </tr>
          </tbody>
        </table>
      </section>
      <h2>요약</h2>
      <p>슈퍼빌런랩스와 플루토스디에스에서 재무 관리, 가상자산 관리, 급여 제도 설계를 주도하며 조직의 효율성과 투명성을 극대화했습니다. AI 및 파워쿼리를 활용한 데이터 처리와 시각화로 경영진의 의사결정을 지원하며, 변화하는 환경에 유연하게 대응합니다.</p>
    </div>
  );
} 