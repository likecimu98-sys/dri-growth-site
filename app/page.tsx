"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  FormEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Стратегия и аналитика",
    text: "Находим точки потери прибыли, собираем unit-экономику и строим план роста на 90 дней.",
    tags: ["P&L", "Юнит-экономика", "Аудит"],
  },
  {
    num: "02",
    title: "Продвижение",
    text: "Управляем рекламой, ставками и воронкой так, чтобы рост оборота не съедал маржинальность.",
    tags: ["ДРР", "SEO", "Реклама"],
  },
  {
    num: "03",
    title: "Контент, который продаёт",
    text: "Создаём визуальную систему карточек: от фотосъёмки и 3D до инфографики и rich-контента.",
    tags: ["Фото", "Видео", "Дизайн"],
  },
  {
    num: "04",
    title: "Операционное управление",
    text: "Берём магазин под контроль: поставки, цены, отзывы, акции и ежедневные решения по данным.",
    tags: ["FBO / FBS", "Цены", "Рейтинг"],
  },
];

const problems = [
  ["Оборот растёт, а прибыль — нет", "Покажем, где маркетплейс забирает маржу и что изменить в первую очередь."],
  ["Реклама становится дороже", "Пересоберём кампании вокруг вклада в прибыль, а не красивых показателей."],
  ["Команда работает без системы", "Введём понятные зоны ответственности, ритм аналитики и контроль результата."],
];

const process = [
  ["Диагностика", "Разбираем магазин, финансы, ассортимент, рекламу и контент."],
  ["Стратегия", "Фиксируем цели, экономику и сценарий роста на 90 дней."],
  ["Спринты", "Запускаем изменения короткими циклами с еженедельным контролем."],
  ["Масштаб", "Усиливаем то, что даёт прибыль, и переносим систему на новые SKU."],
];

const faqs = [
  ["С какими маркетплейсами вы работаете?", "Основной фокус — Ozon, Wildberries и Яндекс Маркет. Для мультиканальных брендов собираем единую модель управления продажами."],
  ["Когда появятся первые результаты?", "Диагностика и план действий готовы в течение 7 рабочих дней. Первые измеримые изменения обычно видны через 3–5 недель, устойчивый эффект — на горизонте 90 дней."],
  ["Можно ли начать только с аудита?", "Да. Аудит — самостоятельный продукт: вы получите карту потерь, приоритеты и финансовую модель. После этого можно внедрять решения своей командой или вместе с DRI."],
  ["Вы гарантируете рост оборота?", "Мы не обещаем абстрактные проценты без диагностики. До старта фиксируем базовые метрики, реалистичный потенциал и критерии результата — чтобы обе стороны одинаково понимали эффект."],
  ["Как устроена отчётность?", "У вас будет живой дашборд с выручкой, прибылью, ДРР, остатками и прогрессом задач, а также еженедельная встреча с руководителем проекта."],
];

function Counter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, visible]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("ru-RU")}
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [revenue, setRevenue] = useState(2_500_000);
  const [margin, setMargin] = useState(23);
  const [growth, setGrowth] = useState(35);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const forecast = useMemo(() => {
    const currentProfit = revenue * (margin / 100);
    const newRevenue = revenue * (1 + growth / 100);
    const newProfit = newRevenue * ((margin + 3) / 100);
    return {
      revenue: Math.round(newRevenue),
      profit: Math.round(newProfit),
      delta: Math.round(newProfit - currentProfit),
    };
  }, [growth, margin, revenue]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  const pointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    event.currentTarget.style.setProperty("--mx", `${x * 24}px`);
    event.currentTarget.style.setProperty("--my", `${y * 24}px`);
  };

  return (
    <main onPointerMove={pointerMove}>
      <motion.div
        className="loader"
        initial={false}
        animate={loaded ? { opacity: 0, visibility: "hidden" } : { opacity: 1 }}
        transition={{ duration: 0.55 }}
        aria-hidden="true"
      >
        <div className="loader-mark">DR<span>I</span></div>
        <div className="loader-line"><i /></div>
        <p>DIGITAL · RESULTS · IMPACT</p>
      </motion.div>

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="DRI — на главную">
          DR<span>I</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#cases">Кейсы</a>
          <a href="#process">Подход</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta magnetic" href="#audit">
          Обсудить рост <span>↗</span>
        </a>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-scene" aria-hidden="true">
          <div className="scene-orb orb-a" />
          <div className="scene-orb orb-b" />
          <div className="scene-ring ring-a" />
          <div className="scene-ring ring-b" />
          <div className="scene-grid" />
        </div>
        <div className="eyebrow">
          <i /> Партнёр по росту на маркетплейсах
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Превращаем продажи
          <br />
          <span>в управляемый рост</span>
        </motion.h1>
        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.15 }}
        >
          <div>
            <p className="hero-copy">
              Стратегия, аналитика, реклама и контент для брендов на Ozon,
              Wildberries и Яндекс Маркете. Считаем эффект в прибыли.
            </p>
            <div className="hero-actions">
              <a className="primary-btn magnetic" href="#audit">
                Получить стратегию <span>↗</span>
              </a>
              <a className="text-link" href="#cases">
                Смотреть кейсы <span>↓</span>
              </a>
            </div>
          </div>
          <div className="hero-proof">
            <div className="avatars" aria-hidden="true">
              <span>Е</span><span>А</span><span>М</span><span>+</span>
            </div>
            <p><strong>47 брендов</strong><br />уже растут с DRI</p>
          </div>
        </motion.div>
        <div className="hero-dashboard glass">
          <div className="dash-top">
            <div>
              <small>Выручка · 90 дней</small>
              <strong>6 840 000 ₽</strong>
            </div>
            <span className="growth-pill">↑ 42,6%</span>
          </div>
          <div className="chart" aria-label="График роста выручки">
            <div className="chart-area" />
            {[22, 31, 28, 42, 48, 55, 68, 73, 89].map((height, index) => (
              <i key={height + index} style={{ height: `${height}%` }} />
            ))}
            <span className="chart-line" />
          </div>
          <div className="dash-metrics">
            <div><small>Прибыль</small><b>+31%</b></div>
            <div><small>ДРР</small><b>8,4%</b></div>
            <div><small>Заказы</small><b>12 490</b></div>
          </div>
        </div>
        <div className="scroll-note">SCROLL TO IMPACT <span>↓</span></div>
      </section>

      <section className="trust-strip">
        <p>Экспертиза в экосистемах</p>
        <div className="market-logos">
          <span className="ozon">OZON</span>
          <span className="wb">WILDBERRIES</span>
          <span className="ym">Яндекс Маркет</span>
          <span className="mm">МЕГА<br />МАРКЕТ</span>
        </div>
      </section>

      <section className="problem section-pad">
        <Reveal className="section-heading">
          <p className="kicker">/ СИСТЕМА ВМЕСТО ХАОСА</p>
          <h2>Большой оборот ещё не значит<br /><span>здоровый бизнес.</span></h2>
          <p>Мы соединяем цифры, процессы и креатив в единую систему, где каждое решение имеет измеримый эффект.</p>
        </Reveal>
        <div className="problem-grid">
          {problems.map(([title, text], index) => (
            <Reveal className="problem-card glass" delay={index * 0.08} key={title}>
              <div className="problem-icon">{["↗", "◎", "⌁"][index]}</div>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="impact-band">
          <div><strong><Counter value={2.7} suffix="×" /></strong><span>средний рост выручки<br />в проектах DRI</span></div>
          <div><strong><Counter value={38} prefix="+" suffix="%" /></strong><span>к прибыли за первые<br />90 дней работы</span></div>
          <div><strong><Counter value={180} suffix=" млн ₽" /></strong><span>дополнительной выручки<br />создано за 2025 год</span></div>
          <p>Средние данные по активным проектам. Результат зависит от категории и стартовой точки.</p>
        </Reveal>
      </section>

      <section className="services section-pad" id="services">
        <Reveal className="section-heading split">
          <div>
            <p className="kicker">/ ЧТО МЫ ДЕЛАЕМ</p>
            <h2>Полный цикл.<br /><span>Одна цель — прибыль.</span></h2>
          </div>
          <p>Собираем команду под вашу задачу: стратег, аналитик, performance-маркетолог, дизайнер и продюсер контента.</p>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal className="service-card" delay={index * 0.06} key={service.title}>
              <div className="service-top">
                <span>{service.num}</span>
                <b>↗</b>
              </div>
              <div className={`service-art art-${index + 1}`} aria-hidden="true">
                <i /><i /><i /><i />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="calculator section-pad">
        <div className="calc-glow" aria-hidden="true" />
        <Reveal className="calc-copy">
          <p className="kicker">/ ПРОГНОЗ ЭФФЕКТА</p>
          <h2>Посчитайте потенциал<br /><span>вашего магазина</span></h2>
          <p>Измените параметры — прогноз обновится мгновенно. На аудите мы заменим средние допущения на ваши реальные данные.</p>
          <div className="calc-note"><i>i</i> Модель учитывает рост оборота и повышение маржинальности на 3 п.п.</div>
        </Reveal>
        <Reveal className="calc-panel glass" delay={0.1}>
          <label>
            <span>Текущий оборот в месяц <b>{revenue.toLocaleString("ru-RU")} ₽</b></span>
            <input type="range" min="500000" max="20000000" step="250000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
          </label>
          <label>
            <span>Маржинальность <b>{margin}%</b></span>
            <input type="range" min="5" max="45" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
          </label>
          <label>
            <span>Цель роста <b>+{growth}%</b></span>
            <input type="range" min="10" max="100" step="5" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
          </label>
          <div className="forecast">
            <small>Потенциал через 90 дней</small>
            <strong>{forecast.revenue.toLocaleString("ru-RU")} ₽</strong>
            <div>
              <span>Прогноз прибыли <b>{forecast.profit.toLocaleString("ru-RU")} ₽</b></span>
              <span>Доп. прибыль <b>+{forecast.delta.toLocaleString("ru-RU")} ₽</b></span>
            </div>
            <a href="#audit">Получить точный расчёт <span>↗</span></a>
          </div>
        </Reveal>
      </section>

      <section className="cases section-pad" id="cases">
        <Reveal className="section-heading split">
          <div>
            <p className="kicker">/ РЕЗУЛЬТАТЫ КЛИЕНТОВ</p>
            <h2>Цифры говорят<br /><span>громче обещаний.</span></h2>
          </div>
          <p>Показываем не отдельную красивую метрику, а динамику бизнеса: выручку, заказы, маржу и стоимость роста.</p>
        </Reveal>
        <Reveal className="featured-case">
          <div className="case-image">
            <img src="/case-ozon-growth.jpg" alt="Аналитика роста продаж клиента на Ozon" />
            <span className="case-badge">OZON · ТОВАРЫ ДЛЯ ДОМА</span>
          </div>
          <div className="case-story">
            <span>КЕЙС 01 / 90 ДНЕЙ</span>
            <h3>Из нишевого магазина —<br />в лидеры категории</h3>
            <p>Пересобрали ассортиментную матрицу, рекламу и карточки. Рост оборота не потребовал пропорционального роста рекламного бюджета.</p>
            <div className="case-stats">
              <div><strong>+542%</strong><span>выручка</span></div>
              <div><strong>+517%</strong><span>заказы</span></div>
              <div><strong>9,2%</strong><span>конверсия</span></div>
            </div>
            <a href="#audit">Хочу так же <span>↗</span></a>
          </div>
        </Reveal>
        <div className="case-grid">
          <Reveal className="mini-case">
            <img src="/case-ozon-analytics.jpg" alt="Графики аналитики продаж на Ozon" />
            <div><span>КЕЙС 02 · BEAUTY</span><strong>120 тыс. → 790 тыс. ₽</strong><p>за четыре месяца системной работы</p></div>
          </Reveal>
          <Reveal className="mini-case" delay={0.08}>
            <img src="/case-wildberries-growth.jpg" alt="График роста продаж магазина" />
            <div><span>КЕЙС 03 · FASHION</span><strong>+239% к выручке</strong><p>при снижении возвратов до 3,21%</p></div>
          </Reveal>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <Reveal className="section-heading">
          <p className="kicker">/ КАК МЫ РАБОТАЕМ</p>
          <h2>Прозрачный путь<br /><span>от данных к результату.</span></h2>
        </Reveal>
        <div className="process-list">
          {process.map(([title, text], index) => (
            <Reveal className="process-row" delay={index * 0.05} key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <b>{index === process.length - 1 ? "∞" : "→"}</b>
            </Reveal>
          ))}
        </div>
        <Reveal className="team-note">
          <div className="team-visual" aria-hidden="true">
            <span>STRATEGY</span><span>DATA</span><span>CREATIVE</span><i />
          </div>
          <div>
            <p className="kicker">/ КОМАНДА ВНУТРИ</p>
            <h3>Не подрядчик.<br />Ваш отдел роста.</h3>
            <p>Стратегия, аналитика, фотостудия, монтаж и реклама работают как одна команда с общими KPI.</p>
          </div>
        </Reveal>
      </section>

      <section className="studio-marquee" aria-label="Компетенции DRI">
        <div>
          <span>АНАЛИТИКА</span><i>✦</i><span>СТРАТЕГИЯ</span><i>✦</i><span>КОНТЕНТ</span><i>✦</i><span>РЕКЛАМА</span><i>✦</i><span>ПРИБЫЛЬ</span><i>✦</i>
          <span>АНАЛИТИКА</span><i>✦</i><span>СТРАТЕГИЯ</span><i>✦</i><span>КОНТЕНТ</span><i>✦</i><span>РЕКЛАМА</span><i>✦</i><span>ПРИБЫЛЬ</span><i>✦</i>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <Reveal className="section-heading split">
          <div>
            <p className="kicker">/ FAQ</p>
            <h2>Всё, что важно<br /><span>до старта.</span></h2>
          </div>
          <p>Не нашли ответа? Оставьте заявку — разберём вашу ситуацию без шаблонной презентации.</p>
        </Reveal>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <Reveal delay={index * 0.035} key={question}>
              <details>
                <summary><span>0{index + 1}</span>{question}<b>+</b></summary>
                <p>{answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="final-cta section-pad" id="audit">
        <div className="cta-scene" aria-hidden="true">
          <i /><i /><i />
        </div>
        <Reveal className="cta-copy">
          <p className="kicker">/ БЕСПЛАТНЫЙ АУДИТ</p>
          <h2>Получите стратегию роста<br /><span>именно для вашего бизнеса</span></h2>
          <p>Мы проанализируем магазин, найдём точки роста и предложим план масштабирования.</p>
        </Reveal>
        <Reveal className="lead-form-wrap glass" delay={0.1}>
          {sent ? (
            <div className="success" role="status">
              <span>✓</span>
              <h3>Заявка принята</h3>
              <p>Спасибо! Мы свяжемся с вами, чтобы уточнить детали и подготовить аудит.</p>
              <button type="button" onClick={() => setSent(false)}>Отправить ещё одну</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="name">Ваше имя</label>
                <input id="name" name="name" placeholder="Как к вам обращаться?" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Телефон</label>
                <input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
              </div>
              <div className="field">
                <label htmlFor="market">Маркетплейс</label>
                <select id="market" name="market" defaultValue="" required>
                  <option value="" disabled>Выберите площадку</option>
                  <option>Ozon</option>
                  <option>Wildberries</option>
                  <option>Яндекс Маркет</option>
                  <option>Несколько площадок</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="turnover">Оборот в месяц</label>
                <select id="turnover" name="turnover" defaultValue="" required>
                  <option value="" disabled>Выберите диапазон</option>
                  <option>до 1 млн ₽</option>
                  <option>1–5 млн ₽</option>
                  <option>5–20 млн ₽</option>
                  <option>более 20 млн ₽</option>
                </select>
              </div>
              <button className="submit-btn magnetic" type="submit">Получить аудит <span>↗</span></button>
              <small>Нажимая кнопку, вы соглашаетесь с политикой обработки данных.</small>
            </form>
          )}
        </Reveal>
      </section>

      <footer>
        <div className="footer-brand">
          <div className="brand">DR<span>I</span></div>
          <p>Цифровые решения<br />с измеримым эффектом</p>
        </div>
        <div className="footer-links">
          <div><span>НАВИГАЦИЯ</span><a href="#services">Услуги</a><a href="#cases">Кейсы</a><a href="#process">Подход</a></div>
          <div><span>КОНТАКТЫ</span><a href="mailto:hello@dri.agency">hello@dri.agency</a><a href="tel:+74951234567">+7 495 123-45-67</a><a href="#audit">Telegram ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 DRI Agency</span><span>Москва · Работаем по всему миру</span><a href="#top">Наверх ↑</a></div>
      </footer>

      <a className="floating-cta" href="#audit" aria-label="Получить аудит">
        <span>Получить<br />аудит</span><b>↗</b>
      </a>
    </main>
  );
}
