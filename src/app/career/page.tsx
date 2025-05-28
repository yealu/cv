"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./careerDetail.module.css";

const navItems = [
  { id: "super-villain-labs", label: "슈퍼빌런랩스" },
  { id: "plutos-ds", label: "플루토스디에스" },
  { id: "ilrowa", label: "주식회사 일로와" },
  { id: "gorura", label: "고르라" },
  { id: "taedaesan", label: "(주)태대산" },
];

export default function CareerDetail() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const isClickScrolling = useRef(false);
  const clickScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const navBarHeight = navBarRef.current?.offsetHeight || 56;
      const activationPointViewport = navBarHeight + 20;

      let newActiveSectionId = "";

      // Find the section whose top is closest to or above the activationPointViewport
      // Iterate from top to bottom to give preference to higher sections if multiple are in view.
      for (const item of navItems) {
        const el = sectionRefs.current[item.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          // To be active, top of section should be at or above viewport's activation line,
          // AND some part of it must be visible (bottom > 0)
          if (rect.top <= activationPointViewport && rect.bottom > activationPointViewport) {
            newActiveSectionId = item.id;
            break; // Found the highest section that meets criteria
          }
        }
      }
      
      // If no section met the criteria (e.g. scrolled way down, or way up)
      // A more robust way to handle this: find the section that's "most" in view or closest.
      // For now, if nothing is "active" by the above, check if we're at the very top.
      if (!newActiveSectionId) {
        if (window.scrollY < 50 && navItems.length > 0) { // Very close to top
          newActiveSectionId = navItems[0].id;
        }
        // If still no active section, it could mean we are between sections or at the bottom.
        // In such cases, the last `activeSection` determined might be best to keep,
        // or default to the last item if scrolled to bottom.
        // For simplicity, if nothing found, try to keep current activeSection unless it's clearly wrong.
        // The current logic means if nothing new is found, activeSection doesn't change from its last valid state by scroll.
        // However, to ensure *something* is active if content is visible:
        if (!newActiveSectionId && navItems.length > 0) {
            // Fallback: find the last section whose top has been passed
            for (let i = navItems.length - 1; i >= 0; i--) {
                const item = navItems[i];
                const el = sectionRefs.current[item.id];
                if (el) {
                    if (el.getBoundingClientRect().top <= activationPointViewport) {
                        newActiveSectionId = item.id;
                        break;
                    }
                }
            }
             if (!newActiveSectionId) newActiveSectionId = navItems[0].id; // Ultimate fallback
        }

      }
      
      if (newActiveSectionId && newActiveSectionId !== activeSection) {
        setActiveSection(newActiveSectionId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set active section based on load position
    setTimeout(handleScroll, 100); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickScrollTimeoutRef.current) {
        clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, [activeSection]); // Rerun if activeSection changes to ensure consistency, or remove activeSection if it causes loops

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    
    isClickScrolling.current = true;
    if (clickScrollTimeoutRef.current) {
      clearTimeout(clickScrollTimeoutRef.current);
    }
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

    const el = sectionRefs.current[id];
    if (el) {
      const navBarHeight = navBarRef.current?.offsetHeight || 56;
      const top = el.getBoundingClientRect().top + window.scrollY - navBarHeight - 20;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.backButtonContainer}>
          <Link href="/" className={styles.backButton}>
            ← 이전 페이지로 돌아가기
          </Link>
        </div>
        <h1 className={styles.title}>경력기술서</h1>
        <h2 className={styles.sectionTitle}>경력 요약 소개</h2>
        <p className={styles.paragraph}>재무/회계 전문성을 바탕으로 데이터 기반 의사결정과 운영 효율화를 이끌어온 전문가입니다. 슈퍼빌런랩스와 플루토스디에스에서 재무 관리, 가상자산 관리, 급여/임금 제도 설계를 주도하며, AI 및 파워쿼리를 활용한 데이터 처리와 시각화로 업무 효율성을 극대화했습니다. 복잡한 데이터를 직관적으로 표현하여 경영진의 신속한 의사결정을 지원하는 데 강점을 보유하고 있습니다.</p>
        <h2 className={styles.sectionTitle}>경력 및 성과</h2>
        {/* 네비게이션 바 */}
        <div className={styles.navBar} ref={navBarRef}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={
                `${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`
              }
              onClick={handleNavClick(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
        {/* 슈퍼빌런랩스 */}
        <section
          id="super-villain-labs"
          className={
            `${styles.section} ${activeSection === "super-villain-labs" ? styles.sectionActive : ''}`
          }
          ref={el => { sectionRefs.current["super-villain-labs"] = el; }}
        >
          <h3 className={styles.companyTitle}>슈퍼빌런랩스 (SupervillainLabsInc.)</h3>
          <p className={styles.paragraph}>
            <strong className={styles.strong}>People Team/Finance Manager</strong> | 2024.01 - 2025.02
          </p>
          <h4 className={styles.subTitle}>핵심 키워드</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>재무 관리 | 데이터 기반 의사결정 | 가상자산 관리 | 세무 신고 | 급여 관리</li>
          </ul>
          <h4 className={styles.subTitle}>세부 내용</h4>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.tableHeader}>구분</th>
                <th className={styles.tableHeader}>내용</th>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>성과</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>월말/분기별 결산 소요 시간 50% 이상 단축(회계법인 2개월 → 자체 월결산 1개월).</li>
                    <li className={styles.listItem}>각종 세금 등 신고 업무 누락 및 재신고율 0건 달성.</li>
                    <li className={styles.listItem}>가상자산 트랜잭션 관리로 회계 및 감사 대비 체계 구축.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>역할</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>경영진 의사결정에 필요한 재무 보고서 작성 및 프로젝트별 손익계산서 작성.</li>
                    <li className={styles.listItem}>일일/주간/월간 자금 현황 관리, 부서(프로젝트)별 손익 관리.</li>
                    <li className={styles.listItem}>가상자산 지갑별 트랜잭션 관리, 벨리데이터 위탁 운영, OTC 코인 매출 관리.</li>
                    <li className={styles.listItem}>부가세, 원천세 신고, 외화 매출 및 수출실적명세서 작성.</li>
                    <li className={styles.listItem}>약 40명 급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>조직기여<br/>/성취</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>결산 효율화로 경영진 보고 속도 개선.</li>
                    <li className={styles.listItem}>가상자산 관리 체계화로 재무 투명성 및 감사 대응력 강화.</li>
                    <li className={styles.listItem}>외주 급여 관리 및 세무 신고 → 내부 관리 및 체계화로 조직 운영 안정성 제고.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* 플루토스디에스 */}
        <section
          id="plutos-ds"
          className={
            `${styles.section} ${activeSection === "plutos-ds" ? styles.sectionActive : ''}`
          }
          ref={el => { sectionRefs.current["plutos-ds"] = el; }}
        >
          <h3 className={styles.companyTitle}>플루토스디에스 (한빗코)</h3>
          <p className={styles.paragraph}>
            <strong className={styles.strong}>경영관리 / Manager</strong> | 2022.01 - 2023.12
          </p>
          <h4 className={styles.subTitle}>핵심 키워드</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>재무 관리 | 가상자산 관리 | 급여 제도 설계 | 데이터 분석</li>
          </ul>
          <h4 className={styles.subTitle}>세부 내용</h4>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.tableHeader}>구분</th>
                <th className={styles.tableHeader}>내용</th>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>성과</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>엑셀 파워쿼리 활용한 데이터 처리 자동화로 재무/회계 업무 효율성 개선.</li>
                    <li className={styles.listItem}>가상자산 실사보고서 체계화로 분기별 재무 투명성 제고 및 감사 대응력 강화.</li>
                    <li className={styles.listItem}>API 연동으로 실시간 가상자산 시세 적용, 결산 자료 정확도 향상</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>역할</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>월말/분기별 결산 진행 및 재무제표, 손익계산서 작성.</li>
                    <li className={styles.listItem}>가상자산 수불부 작성: 코인/지갑별 실사 수량 주간 보고, 하드월렛 관리.</li>
                    <li className={styles.listItem}>연봉 테이블 제작 및 급여 산출(약 60명), 사회보험 및 원천세 신고 관리.</li>
                    <li className={styles.listItem}>일일 자금수지 정리, Burn rate 관리.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>조직기여<br/>/성취</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>가상자산 데이터 기반 결산 체계로 재무 신뢰도 향상.</li>
                    <li className={styles.listItem}>급여 제도 정규화로 인사 관리 효율성 증대.</li>
                    <li className={styles.listItem}>리스크 관리 강화로 조직 안정성 제고.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* 주식회사 일로와 */}
        <section
          id="ilrowa"
          className={
            `${styles.section} ${activeSection === "ilrowa" ? styles.sectionActive : ''}`
          }
          ref={el => { sectionRefs.current["ilrowa"] = el; }}
        >
          <h3 className={styles.companyTitle}>주식회사 일로와</h3>
          <p className={styles.paragraph}>
            <strong className={styles.strong}>경영지원 / 대리</strong> | 2020.12 - 2021.03
          </p>
          <h4 className={styles.subTitle}>핵심 키워드</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>재무 관리 | 데이터화 | 프로세스 효율화</li>
          </ul>
          <h4 className={styles.subTitle}>세부 내용</h4>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.tableHeader}>구분</th>
                <th className={styles.tableHeader}>내용</th>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>성과</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>결산 데이터 외주 회계법인 의존 → 자체 월결산 체계 구축.</li>
                    <li className={styles.listItem}>자금 사용 데이터화로 보고 접근성 개선.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>역할</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>월별 손익계산서 작성 및 자금 수지내역 보고.</li>
                    <li className={styles.listItem}>엑셀 분개장 작성 및 외주 회계법인과 교차 검증.</li>
                    <li className={styles.listItem}>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>조직기여<br/>/성취</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>자금 관리 투명성 향상.</li>
                    <li className={styles.listItem}>결산 효율화로 경영진 보고 속도 개선.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* 고르라 */}
        <section
          id="gorura"
          className={
            `${styles.section} ${activeSection === "gorura" ? styles.sectionActive : ''}`
          }
          ref={el => { sectionRefs.current["gorura"] = el; }}
        >
          <h3 className={styles.companyTitle}>고르라</h3>
          <p className={styles.paragraph}>
            <strong className={styles.strong}>경영관리 / 주임</strong> | 2019.06 - 2020.08
          </p>
          <h4 className={styles.subTitle}>핵심 키워드</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>재무 관리 | 데이터 데시보드화 | 손익분석 | 급여 제도 설계</li>
          </ul>
          <h4 className={styles.subTitle}>세부 내용</h4>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.tableHeader}>구분</th>
                <th className={styles.tableHeader}>내용</th>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>성과</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>직감 의존적 결정에서 숫자 기반 데이터로 변환하여 경영진 의사결정 지원.</li>
                    <li className={styles.listItem}>시간외근무수당 제도 기획으로 급여 체계 개선 및 노무 리스크 감소.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>역할</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>자금일보 작성 및 월별 자금수지 정리, 프로젝트별 손익계산서 작성.</li>
                    <li className={styles.listItem}>연봉 테이블 제작: 시간외근무수당 제도 기획, 인센티브제 도입.</li>
                    <li className={styles.listItem}>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                    <li className={styles.listItem}>그룹웨어 도입 및 초기 세팅</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>조직기여<br/>/성취</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>경영 보고 체계 개선.</li>
                    <li className={styles.listItem}>급여 제도 개선으로 직원 만족도 향상.</li>
                    <li className={styles.listItem}>그룹웨어 도입으로 업무 프로세스 디지털화 및 효율화.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* 태대산 */}
        <section
          id="taedaesan"
          className={
            `${styles.section} ${activeSection === "taedaesan" ? styles.sectionActive : ''}`
          }
          ref={el => { sectionRefs.current["taedaesan"] = el; }}
        >
          <h3 className={styles.companyTitle}>(주)태대산</h3>
          <p className={styles.paragraph}>
            <strong className={styles.strong}>경영지원 / 대리</strong> | 2018.08 - 2019.04
          </p>
          <h4 className={styles.subTitle}>핵심 키워드</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>급여 관리 | 계약 관리 | 비용 절감</li>
          </ul>
          <h4 className={styles.subTitle}>세부 내용</h4>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.tableHeader}>구분</th>
                <th className={styles.tableHeader}>내용</th>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>성과</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>급여 체계 정규화로 운영 효율성 증대.</li>
                    <li className={styles.listItem}>거래처 계약 관리 개선으로 비용 절감.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>역할</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                    <li className={styles.listItem}>계약 관리: 업체별 계약서 검토, 해지 예정 업체 조율.</li>
                    <li className={styles.listItem}>구매 및 발주: 비품 발주 및 단가 관리.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={styles.tableFirstCell}>조직기여<br/>/성취</td>
                <td className={styles.tableDataCell}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>운영 비용 절감으로 재무 효율성 증대.</li>
                    <li className={styles.listItem}>계약 관리 체계화로 조직 안정성 강화.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <h2 className={styles.sectionTitle}>요약</h2>
        <p className={styles.paragraph}>슈퍼빌런랩스와 플루토스디에스에서 재무 관리, 가상자산 관리, 급여 제도 설계를 주도하며 조직의 효율성과 투명성을 극대화했습니다. AI 및 파워쿼리를 활용한 데이터 처리와 시각화로 경영진의 의사결정을 지원하며, 변화하는 환경에 유연하게 대응합니다.</p>
      </div>
  );
} 