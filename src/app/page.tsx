import React from "react";
import Link from "next/link";
import styles from "./main.module.css";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>안녕하세요, 이창신입니다</h1>
        <p className={styles.subtitle}>데이터 기반 의사결정을 이끄는 재무 전문가</p>
        <div className={styles.headerTags}>
          <span className={styles.headerTag}>⚡ 효율성</span>
          <span className={styles.headerTag}>🤖 AI 활용</span>
          <span className={styles.headerTag}>💡 프로세스 개선</span>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>간단한 소개</h2>
        <p className={styles.paragraph}>
          복잡한 것을 단순하게 만드는 일을 좋아합니다. 
          업무를 하다 보면 &ldquo;이걸 꼭 이렇게까지 복잡하게 해야 할까?&rdquo;라는 생각이 자주 드는데, 
          그럴 때마다 더 나은 방법이 있을 거라는 생각으로 개선점을 찾아가고 있습니다.
        </p>
        <p className={styles.paragraph}>
          재무와 회계 업무를 하면서 숫자 뒤에 숨은 이야기들을 발견하는 재미를 느꼈고, 
          특히 가상자산이라는 새로운 영역에서 기존 원칙들을 적용해보며 많은 것을 배웠습니다. 
          데이터를 정리하고 시각화하여 의사결정에 도움이 되는 자료를 만드는 일에 보람을 느낍니다.
        </p>
        <p className={styles.paragraph}>
          새로운 것을 배우는 데 두려움이 없고, 피드백을 통해 성장하는 것을 즐깁니다. 
          혼자 잘하는 것보다는 함께 더 나은 결과를 만들어가는 과정을 더 중요하게 생각합니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>연락처</h2>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📧</span>
            <strong>이메일:</strong>&nbsp;tlsl111009@email.com
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📱</span>
            <strong>연락처:</strong>&nbsp;010-3135-5120
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>👤</span>
            <strong>이름:</strong>&nbsp;이창신
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>개인적 관심사 & 성장</h2>
        <div className={styles.interestGrid}>
          <div className={styles.interestItem}>
            <h3 className={styles.interestTitle}>
              <span className={styles.interestIcon}>🤖</span>
              기술에 대한 관심
            </h3>
            <p className={styles.interestDescription}>
              기존의 엑셀 원툴에서 Cursor, Claude 등 AI 도구를 업무에 적극 활용하여 반복 작업을 자동화하고, 
              파워쿼리를 이용해 데이터 처리 효율성을 높이고 있습니다.
            </p>
          </div>
          <div className={styles.interestItem}>
            <h3 className={styles.interestTitle}>
              <span className={styles.interestIcon}>📊</span>
              데이터 시각화
            </h3>
            <p className={styles.interestDescription}>
              복잡한 재무 데이터를 한눈에 이해할 수 있는 대시보드 만들기를 좋아합니다. 
              숫자만 나열된 보고서보다는 직관적인 차트와 그래프로 스토리를 전달하는 것을 선호합니다.
            </p>
          </div>
          <div className={styles.interestItem}>
            <h3 className={styles.interestTitle}>
              <span className={styles.interestIcon}>📚</span>
              AI와 인문학적 성장
            </h3>
            <p className={styles.interestDescription}>
              빠르게 발전하는 AI 기술을 실무에 효과적으로 적용하기 위해 관련 세미나와 온라인 강의를 꾸준히 수강하고 있으며, 
              AI를 더욱 잘 이용하기 위해 인문학적 독서도 병행하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>앞으로의 목표</h2>
        <p className={styles.paragraph}>
          저는 &lsquo;일이 더 잘 굴러가게 만드는 사람&rsquo;이 되고 싶습니다. 
          새로운 무언가를 만드는 것도 좋지만, 이미 있는 구조를 더 깔끔하게 정리하고, 
          덜 복잡하게 만드는 일에 더 잘 맞는 성향입니다.
        </p>
        <p className={styles.paragraph}>
          숫자와 구조를 정리하는 데 익숙하고, 흐름을 바꿔 실수를 줄이는 방식으로 일해왔습니다. 
          단순히 여러 일을 처리하는 것을 넘어서, 각 업무 간의 연결고리를 발견하고 
          흐름을 재설계하는 데 집중하며, 조직 전체의 일하는 방식을 조금씩 개선하는 데 기여하고 싶습니다.
        </p>
        <p className={styles.paragraph}>
          &lsquo;이건 내 일이 아닌데&rsquo;보다는 &lsquo;이건 어떻게 하면 더 잘 굴러갈까&rsquo;를 먼저 떠올리는 편입니다. 
          함께 일하는 동료들이 조금 더 편하게, 실수 없이, 본질적인 일에 집중할 수 있는 환경을 만드는 데 
          기여하는 동료가 되고 싶습니다.
        </p>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>더 자세한 경력이 궁금하시다면?</h2>
        <p className={styles.ctaDescription}>
          지금까지의 구체적인 경력과 성과를 확인해보세요
        </p>
        <Link href="/career" className={styles.ctaButton}>
          상세 경력 보기
          <span className={styles.ctaIcon}>→</span>
        </Link>
      </section>
    </div>
  );
} 