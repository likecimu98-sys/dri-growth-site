"use client";

import { useEffect, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const audienceCards = [
  {
    number: "01",
    label: "Новый бизнес",
    title: "Запуск бизнеса на Ozon",
    text: "Создаём Ozon-бизнес с нуля, проводим через каждый этап и выводим магазин на рынок примерно за 3–4 месяца.",
    services: [
      "Выбор продукта",
      "Проверка ниши",
      "Поиск поставщиков",
      "Настройка кабинета",
      "Оптимизация карточек",
      "Создание контента",
      "Реклама",
      "Аналитика",
      "Сопровождение запуска",
      "Полное введение в бизнес",
    ],
    cta: "Запустить магазин",
  },
  {
    number: "02",
    label: "Действующий бизнес",
    title: "Рост бизнеса на Ozon",
    text: "Улучшаем прибыльность, наводим порядок в операционной работе и создаём систему, которую можно масштабировать.",
    services: [
      "Полный аудит бизнеса",
      "Аудит кабинета Ozon",
      "Аудит рекламы",
      "Аудит менеджера",
      "Анализ продаж",
      "Стратегия роста",
      "Внедрение KPI",
      "Оптимизация процессов",
      "Автоматизация",
      "Ежедневные чек-листы",
      "Регламенты и SOP",
      "Управление под ключ",
      "Консультации собственника",
    ],
    cta: "Масштабировать бизнес",
  },
];

const trustCards = [
  {
    number: "01",
    title: "Прозрачная коммуникация",
    text: "Вы понимаете, что происходит, почему принято решение и какой результат оно должно дать.",
  },
  {
    number: "02",
    title: "Ответственность за операционную работу",
    text: "Не ограничиваемся рекомендациями: доводим согласованные изменения до внедрения.",
  },
  {
    number: "03",
    title: "Мышление собственника",
    text: "Оцениваем решения по влиянию на прибыль, устойчивость и стоимость бизнеса.",
  },
  {
    number: "04",
    title: "Практическая экспертиза Ozon",
    text: "Работаем внутри одной экосистемы и глубоко понимаем её экономику и процессы.",
  },
  {
    number: "05",
    title: "Личное участие",
    text: "Руководитель проекта остаётся в контексте бизнеса и доступен для быстрых решений.",
  },
  {
    number: "06",
    title: "Понятная отчётность",
    text: "Показываем динамику ключевых показателей, статус задач и следующий приоритет.",
  },
];

const workflowSteps = [
  ["Аудит", "Разбираем экономику, ассортимент, рекламу, контент и процессы."],
  ["Стратегия", "Определяем точки роста, приоритеты, KPI и план работы."],
  ["Внедрение", "Запускаем изменения, распределяем ответственность и контролируем исполнение."],
  ["Рост бизнеса", "Закрепляем результат и масштабируем работающую систему."],
];

const faqs = [
  ["С кем вы работаете?", "С предпринимателями, которые запускают бизнес на Ozon, и с действующими продавцами, которым нужна прибыльная и управляемая система роста."],
  ["Когда появятся первые результаты?", "Диагностика и план действий готовы в течение 7 рабочих дней. Первые измеримые изменения обычно видны через 3–5 недель, устойчивый эффект оцениваем на горизонте 90 дней."],
  ["Можно начать только с аудита?", "Да. Аудит — самостоятельный продукт: вы получите карту потерь, приоритеты и финансовую модель. Внедрять решения можно своей командой или вместе с DRI."],
  ["Вы гарантируете рост оборота?", "Мы не обещаем проценты до диагностики. Сначала фиксируем базовые показатели, реалистичный потенциал и критерии результата, а затем отвечаем за качество согласованного внедрения."],
];

function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  return (
    <span>
      {prefix}
      {value.toLocaleString("ru-RU", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.72, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow"><i />{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
    </Reveal>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 280);
    return () => window.clearTimeout(timer);
  }, []);

  const pointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    event.currentTarget.style.setProperty("--mx", `${x * 16}px`);
    event.currentTarget.style.setProperty("--my", `${y * 16}px`);
  };

  return (
    <main onPointerMove={pointerMove}>
      <motion.div
        className="loader"
        initial={false}
        animate={loaded ? { opacity: 0, visibility: "hidden" } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
        aria-hidden="true"
      >
        <div className="loader-mark">DR<span>I</span></div>
        <div className="loader-line"><i /></div>
        <p>DIGITAL · RESULTS · IMPACT</p>
      </motion.div>

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="DRI — на главную">DR<span>I</span></a>
        <nav aria-label="Основная навигация">
          <a href="#clients">Кому помогаем</a>
          <a href="#results">Результаты</a>
          <a href="#process">Подход</a>
        </nav>
        <a className="nav-cta" href="#contact">Обсудить задачу <span>↗</span></a>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-scene" aria-hidden="true">
          <div className="scene-orb orb-a" />
          <div className="scene-orb orb-b" />
          <div className="scene-grid" />
        </div>

        <div className="hero-copy-block">
          <p className="eyebrow"><i />Консалтинг и управление для продавцов Ozon</p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Строим прибыльный<br />
            <span>Ozon-бизнес</span> как систему
          </motion.h1>
          <p className="hero-lead">
            Помогаем запустить магазин с нуля или превратить действующий бизнес в управляемую модель с понятной экономикой, процессами и ответственностью.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#contact">Получить разбор бизнеса <span>↗</span></a>
            <a className="text-link" href="#results">Посмотреть результаты <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <strong><Counter value={47} /></strong>
            <span>брендов уже работали<br />с командой DRI</span>
          </div>
        </div>

        <motion.div
          className="hero-dashboard"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <div className="dash-head">
            <div>
              <small>Выручка · 90 дней</small>
              <strong>6 840 000 ₽</strong>
            </div>
            <span>↑ 42,6%</span>
          </div>
          <div className="chart" role="img" aria-label="Рост выручки за 90 дней">
            <div className="chart-grid" />
            {[22, 31, 28, 42, 48, 55, 68, 73, 89].map((height, index) => (
              <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
            ))}
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 132 C55 128 72 113 112 116 S183 93 222 88 S289 75 330 57 S407 45 500 12" />
            </svg>
          </div>
          <div className="dash-metrics">
            <div><small>Прибыль</small><b>+31%</b></div>
            <div><small>ДРР</small><b>8,4%</b></div>
            <div><small>Заказы</small><b>12 490</b></div>
          </div>
          <p className="dashboard-note">Рабочие показатели из действующих проектов DRI</p>
        </motion.div>
      </section>

      <section className="audience section-pad" id="clients">
        <SectionHeading
          eyebrow="Кому мы помогаем"
          title={<>Два сценария.<br /><span>Один деловой подход.</span></>}
          text="Состав команды и план работы зависят от вашей стартовой точки. В обоих случаях решения опираются на экономику бизнеса."
        />
        <div className="audience-grid">
          {audienceCards.map((card, index) => (
            <Reveal className="audience-card" delay={index * 0.08} key={card.title}>
              <div className="audience-card-head">
                <span>{card.number}</span>
                <p>{card.label}</p>
              </div>
              <h3>{card.title}</h3>
              <p className="audience-card-copy">{card.text}</p>
              <ul>
                {card.services.map((service) => <li key={service}>{service}</li>)}
              </ul>
              <a href="#contact">{card.cta} <span>↗</span></a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="trust section-pad" id="trust">
        <SectionHeading
          eyebrow="Принципы работы"
          title={<>Партнёрство, которому<br /><span>не нужна громкая реклама.</span></>}
          text="Мы строим отношения вокруг ясных договорённостей, ответственности и измеримого вклада в бизнес."
        />
        <div className="trust-grid">
          {trustCards.map((card, index) => (
            <Reveal className="trust-card" delay={(index % 3) * 0.05} key={card.title}>
              <div className="trust-icon" aria-hidden="true"><i /></div>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="impact-band">
          <div>
            <small>Средний рост выручки</small>
            <strong><Counter value={2.7} decimals={1} suffix="×" /></strong>
            <p>в проектах DRI</p>
          </div>
          <div>
            <small>Изменение прибыли</small>
            <strong><Counter value={38} prefix="+" suffix="%" /></strong>
            <p>за первые 90 дней</p>
          </div>
          <div>
            <small>Дополнительная выручка</small>
            <strong><Counter value={180} suffix=" млн ₽" /></strong>
            <p>создана за 2025 год</p>
          </div>
          <p className="impact-note">Средние данные по активным проектам. Фактический результат зависит от категории, ассортимента и стартовой точки.</p>
        </Reveal>
      </section>

      <section className="results section-pad" id="results">
        <SectionHeading
          eyebrow="Результаты"
          title={<>Показываем динамику.<br /><span>Не продаём обещания.</span></>}
          text="Сохраняем бизнес-контекст: выручку, заказы, конверсию и стоимость роста рассматриваем вместе."
        />

        <Reveal className="featured-case">
          <div className="case-image">
            <Image src={`${publicBase}/case-ozon-growth.jpg`} alt="Динамика продаж магазина в кабинете Ozon Seller" width={1280} height={720} sizes="(max-width: 920px) 100vw, 62vw" unoptimized />
            <span>OZON · КЕЙС 01</span>
          </div>
          <div className="case-story">
            <small>90 ДНЕЙ СИСТЕМНОЙ РАБОТЫ</small>
            <h3>Рост без потери контроля над экономикой</h3>
            <p>Пересобрали ассортимент, рекламную модель и карточки товаров. Все решения проверяли по влиянию на итоговый результат.</p>
            <div className="case-stats">
              <div><strong>+542%</strong><span>выручка</span></div>
              <div><strong>+517%</strong><span>заказы</span></div>
              <div><strong>9,2%</strong><span>конверсия</span></div>
            </div>
          </div>
        </Reveal>

        <div className="case-grid">
          <Reveal className="mini-case">
            <Image src={`${publicBase}/case-ozon-analytics.jpg`} alt="Графики аналитики продаж магазина на Ozon" width={1280} height={720} sizes="(max-width: 680px) 100vw, 36vw" unoptimized />
            <div>
              <small>OZON · КЕЙС 02</small>
              <strong>120 тыс. → 790 тыс. ₽</strong>
              <p>за четыре месяца системной работы</p>
            </div>
          </Reveal>
          <Reveal className="mini-case" delay={0.06}>
            <Image src={`${publicBase}/case-sales-growth.jpg`} alt="График роста выручки магазина на Ozon" width={1280} height={720} sizes="(max-width: 680px) 100vw, 36vw" unoptimized />
            <div>
              <small>OZON · КЕЙС 03</small>
              <strong>+239% к выручке</strong>
              <p>при снижении возвратов до 3,21%</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <SectionHeading
          eyebrow="Как мы работаем"
          title={<>От фактов<br /><span>к устойчивому росту.</span></>}
          text="Четыре последовательных этапа сохраняют фокус команды и делают прогресс понятным собственнику."
        />
        <div className="process-track">
          {workflowSteps.map(([title, text], index) => (
            <Reveal className="process-card" delay={index * 0.05} key={title}>
              <div><span>0{index + 1}</span><i /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <SectionHeading
          eyebrow="Вопросы"
          title={<>Важное<br /><span>до начала работы.</span></>}
          text="Коротко отвечаем на вопросы, которые помогают принять взвешенное решение."
        />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <Reveal delay={index * 0.03} key={question}>
              <details>
                <summary><span>0{index + 1}</span>{question}<b aria-hidden="true">+</b></summary>
                <p>{answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="final-cta section-pad" id="contact">
        <div className="cta-glow" aria-hidden="true" />
        <Reveal>
          <p className="eyebrow"><i />Следующий шаг</p>
          <h2>Обсудим, что мешает<br /><span>вашему Ozon-бизнесу расти</span></h2>
          <p>Начнём с вашей ситуации, цифр и целей. Без типовой презентации и обещаний до диагностики.</p>
          <a className="primary-btn light" href="mailto:hello@dri.agency?subject=Обсудить%20Ozon-бизнес">Обсудить задачу <span>↗</span></a>
        </Reveal>
      </section>

      <footer>
        <div className="footer-main">
          <div>
            <a className="brand" href="#top">DR<span>I</span></a>
            <p>Цифровые решения<br />с измеримым эффектом</p>
          </div>
          <a href="mailto:hello@dri.agency">hello@dri.agency <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DRI</span>
          <span>Консалтинг и управление для продавцов Ozon</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>

      <a className="floating-cta" href="#contact" aria-label="Обсудить задачу">
        <span>Обсудить задачу</span><b>↗</b>
      </a>
    </main>
  );
}
