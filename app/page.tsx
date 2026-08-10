"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  "https://formsubmit.co/ajax/dri.krd@bk.ru";

const workDirections = [
  {
    number: "01",
    title: "Аудит и диагностика бизнеса",
    text: "Находим финансовые потери, слабые места и ограничения, которые мешают магазину расти и зарабатывать больше.",
    items: ["Экономика", "Ассортимент", "Реклама", "Остатки", "Процессы", "Управление"],
  },
  {
    number: "02",
    title: "Аналитика и точки роста",
    text: "Определяем изменения, которые сильнее всего повлияют на прибыль, продажи и устойчивость бизнеса.",
    items: ["Продажи", "Финансовая модель", "Конверсия", "KPI", "Приоритеты роста"],
  },
  {
    number: "04",
    title: "Процессы и система управления",
    text: "Распределяем ответственность, вводим регламенты, KPI и прозрачную отчётность для собственника.",
    items: ["Регламенты", "Контроль задач", "KPI менеджеров", "Зоны ответственности"],
  },
  {
    number: "05",
    title: "Автоматизация и масштабирование",
    text: "Убираем лишнюю ручную работу, закрепляем эффективные процессы и готовим бизнес к дальнейшему росту.",
    items: ["Автоматизация", "Чек-листы", "Отчётность", "Масштабирование"],
  },
];

const auditSkills = [
  "Юнит-экономика и финансы",
  "Аналитика Ozon",
  "Управление рекламой",
  "Ассортимент",
  "Товарные остатки",
  "Операционные процессы",
  "Регламенты",
  "Зоны ответственности",
  "KPI и готовность к росту",
];

const workModel = ["Аудит", "Стратегия", "Внедрение", "Контроль результата"];

const principles = [
  {
    title: "Экспертность",
    text: "Решения принимаются на основе цифр, аналитики и экономики бизнеса.",
  },
  {
    title: "Прозрачность",
    text: "Собственник понимает цель каждого изменения и показатель, на который оно влияет.",
  },
  {
    title: "Партнёрство",
    text: "Становимся частью команды клиента и ориентируемся на долгосрочный результат.",
  },
];

const experts = [
  {
    name: "Рафаэль",
    role: "Руководитель проектов и стратегического развития",
    text: "Определяет стратегию проектов, принимает ключевые решения по внедрению процессов и контролирует их эффективность. Работал с компаниями с оборотами в миллиарды рублей в год.",
    image: "c977cd58-4e51-4858-8e52-168dd6da2d0f.jpg",
    alt: "Рафаэль, руководитель проектов DRI",
    objectPosition: "50% 35%",
  },
  {
    name: "Данил",
    role: "Эксперт по продвижению и масштабированию на Ozon",
    text: "Строит стратегии на основе рекламных инструментов и аналитики Ozon. Имеет опыт развития производителей до оборота более 150 млн рублей в месяц.",
    image: "df63ecdd-479f-42ce-8de2-c5220b549cd6.jpg",
    alt: "Данил, эксперт DRI по продвижению на Ozon",
    objectPosition: "50% 32%",
  },
  {
    name: "Илья",
    role: "Эксперт по операционному управлению и эффективности",
    text: "Специализируется на управлении магазинами по моделям FBO и FBS, повышении маржинальности и снижении операционных расходов без потери темпов роста.",
    image: "5d882f9b-f410-4efb-b8f6-7b65d687747d.jpg",
    alt: "Илья, эксперт DRI по операционному управлению",
    objectPosition: "50% 34%",
  },
];

type FormStatus = {
  kind: "idle" | "success" | "error";
  message: string;
};

type FormErrors = Partial<
  Record<"name" | "phone" | "ozon" | "consent", string>
>;

function formatRussianPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (!digits) return "";
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;

  digits = digits.slice(0, 11);
  const local = digits.slice(1);
  let result = "+7";

  if (local.length > 0) result += ` (${local.slice(0, 3)}`;
  if (local.length >= 3) result += ")";
  if (local.length > 3) result += ` ${local.slice(3, 6)}`;
  if (local.length > 6) result += `-${local.slice(6, 8)}`;
  if (local.length > 8) result += `-${local.slice(8, 10)}`;

  return result;
}

function validateOzonUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      (url.hostname === "ozon.ru" || url.hostname.endsWith(".ozon.ru"))
    );
  } catch {
    return false;
  }
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
      initial={{ opacity: 0.68, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.44, delay, ease: [0.22, 1, 0.36, 1] }}
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

function HeroDashboard() {
  return (
    <motion.div
      className="hero-dashboard"
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.05 }}
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
      <p className="dashboard-note">Подтверждённые показатели действующих проектов DRI</p>
    </motion.div>
  );
}

function WorkDirection({
  direction,
  index,
}: {
  direction: (typeof workDirections)[number];
  index: number;
}) {
  return (
    <Reveal className="work-card" delay={(index % 2) * 0.04}>
      <div className="work-card-head">
        <span>{direction.number}</span>
        <i aria-hidden="true" />
      </div>
      <h3>{direction.title}</h3>
      <p>{direction.text}</p>
      <ul>
        {direction.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </Reveal>
  );
}

function TeamAudit() {
  return (
    <Reveal className="team-audit" delay={0.04}>
      <div className="audit-copy">
        <p className="eyebrow"><i />Ключевое преимущество</p>
        <span className="audit-number">03</span>
        <h3 id="team-audit">Аудит компетенций команды Ozon</h3>
        <p>
          Оцениваем, насколько сотрудники понимают экономику магазина и готовы
          эффективно управлять аналитикой, рекламой, ассортиментом и ежедневными
          процессами.
        </p>
        <p className="audit-result">
          Собственник получает объективную картину команды, видит зоны развития
          и понимает, как сделать результат зависимым от системы, а не от
          отдельных людей.
        </p>
      </div>
      <div className="audit-panel" aria-label="Компетенции, которые оценивает DRI">
        <div className="audit-panel-head">
          <span>Матрица компетенций</span>
          <b>9 направлений</b>
        </div>
        <div className="audit-skills">
          {auditSkills.map((skill, index) => (
            <div key={skill}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{skill}</p>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ResultsCases() {
  return (
    <>
      <Reveal className="impact-band">
        <div>
          <small>Средний рост выручки</small>
          <strong>2,7×</strong>
          <p>в проектах DRI</p>
        </div>
        <div>
          <small>Изменение прибыли</small>
          <strong>+38%</strong>
          <p>за первые 90 дней</p>
        </div>
        <div>
          <small>Дополнительная выручка</small>
          <strong>180 млн ₽</strong>
          <p>создана за 2025 год</p>
        </div>
        <p className="impact-note">
          Средние данные по активным проектам. Результат зависит от категории,
          ассортимента и стартовой точки.
        </p>
      </Reveal>

      <Reveal className="featured-case">
        <div className="case-image">
          <Image
            src={`${publicBase}/case-ozon-growth.jpg`}
            alt="График роста продаж в кабинете Ozon Seller"
            width={1280}
            height={720}
            sizes="(max-width: 920px) 100vw, 62vw"
            unoptimized
          />
          <span>OZON · КЕЙС 01</span>
        </div>
        <div className="case-story">
          <small>ПОДТВЕРЖДЁННЫЙ РЕЗУЛЬТАТ</small>
          <h3>Решения, влияние которых видно в цифрах</h3>
          <p>
            Выручку, заказы и конверсию оцениваем вместе — без отрыва от
            экономики и устойчивости действующего бизнеса.
          </p>
          <div className="case-stats">
            <div><strong>+542%</strong><span>выручка</span></div>
            <div><strong>+517%</strong><span>заказы</span></div>
            <div><strong>9,2%</strong><span>конверсия</span></div>
          </div>
        </div>
      </Reveal>

      <div className="case-grid">
        <Reveal className="mini-case">
          <Image
            src={`${publicBase}/case-ozon-analytics.jpg`}
            alt="Панель аналитики продаж магазина на Ozon"
            width={1280}
            height={720}
            sizes="(max-width: 680px) 100vw, 36vw"
            unoptimized
          />
          <div>
            <small>OZON · КЕЙС 02</small>
            <strong>120 тыс. → 790 тыс. ₽</strong>
            <p>за четыре месяца системной работы</p>
          </div>
        </Reveal>
        <Reveal className="mini-case" delay={0.04}>
          <Image
            src={`${publicBase}/case-sales-growth.jpg`}
            alt="График динамики выручки магазина на Ozon"
            width={1280}
            height={720}
            sizes="(max-width: 680px) 100vw, 36vw"
            unoptimized
          />
          <div>
            <small>OZON · КЕЙС 03</small>
            <strong>+239% к выручке</strong>
            <p>при снижении возвратов до 3,21%</p>
          </div>
        </Reveal>
      </div>
    </>
  );
}

function Experts() {
  return (
    <section className="experts" id="experts" aria-labelledby="experts-title">
      <Reveal className="experts-heading">
        <p className="eyebrow"><i />Эксперты DRI</p>
        <h3 id="experts-title">Команда, которая погружается в бизнес</h3>
        <p>
          Над проектами работают практики по стратегии, аналитике, продвижению
          и операционному управлению бизнесом на Ozon.
        </p>
      </Reveal>
      <div className="experts-grid">
        {experts.map((expert, index) => (
          <Reveal className="expert-card" delay={index * 0.04} key={expert.name}>
            <div className="expert-photo">
              <Image
                src={`${publicBase}/experts/${expert.image}`}
                alt={expert.alt}
                width={1254}
                height={1254}
                sizes="(max-width: 680px) 100vw, (max-width: 920px) 50vw, 33vw"
                style={{ objectPosition: expert.objectPosition }}
                unoptimized
              />
              <span>0{index + 1}</span>
            </div>
            <div className="expert-copy">
              <h4>{expert.name}</h4>
              <p className="expert-role">{expert.role}</p>
              <p>{expert.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="team-trust">
        <div>
          <span>01</span>
          <strong>Экспертность</strong>
          <p>Опыт, аналитика и реальные данные.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Прозрачность</strong>
          <p>Понятные этапы и отчётность.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Ответственность</strong>
          <p>Оценка по влиянию на бизнес.</p>
        </div>
      </Reveal>
    </section>
  );
}

function ContactForm() {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle", message: "" });

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatRussianPhone(event.target.value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phoneValue = String(data.get("phone") ?? "").trim();
    const ozon = String(data.get("ozon_store") ?? "").trim();
    const consent = data.get("consent") === "Подтверждено";
    const website = String(data.get("website") ?? "").trim();
    const nextErrors: FormErrors = {};

    if (name.length < 2) nextErrors.name = "Укажите имя — минимум 2 символа.";
    if (phoneValue.replace(/\D/g, "").length !== 11) {
      nextErrors.phone = "Введите номер в формате +7 (999) 000-00-00.";
    }
    if (!validateOzonUrl(ozon)) {
      nextErrors.ozon = "Укажите полную ссылку на страницу магазина Ozon.";
    }
    if (!consent) {
      nextErrors.consent = "Подтвердите согласие на обработку данных.";
    }

    setErrors(nextErrors);
    setStatus({ kind: "idle", message: "" });

    if (Object.keys(nextErrors).length > 0 || website) return;

    setIsSubmitting(true);
    data.set("_subject", "Новая заявка с сайта DRI");
    data.set("_template", "table");
    data.set("_captcha", "false");
    data.set("submitted_at", new Date().toISOString());
    data.set("page_url", window.location.href);

    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const value = params.get(key);
      if (value) data.set(key, value);
    });

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const payload = await response.json().catch(() => null) as
        | { success?: boolean | string }
        | null;
      const delivered =
        response.ok && (payload?.success === true || payload?.success === "true");

      if (!delivered) throw new Error("Submission was not accepted");

      form.reset();
      setPhone("");
      setStatus({
        kind: "success",
        message: "Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее рабочее время.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="contact-form"
      action={formEndpoint}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-heading">
        <span>Заявка на консультацию</span>
        <h3>Обсудим точки роста вашего бизнеса</h3>
        <p>Оставьте контакты и кратко расскажите о текущей ситуации.</p>
      </div>

      <div className="form-grid">
        <label className={`field ${errors.name ? "has-error" : ""}`}>
          <span>Ваше имя *</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && <small id="name-error">{errors.name}</small>}
        </label>

        <label className={`field ${errors.phone ? "has-error" : ""}`}>
          <span>Телефон *</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (999) 000-00-00"
            value={phone}
            onChange={onPhoneChange}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
          {errors.phone && <small id="phone-error">{errors.phone}</small>}
        </label>

        <label className="field">
          <span>Название компании или бренда</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
          />
        </label>

        <label className={`field ${errors.ozon ? "has-error" : ""}`}>
          <span>Ссылка на магазин Ozon</span>
          <input
            name="ozon_store"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://www.ozon.ru/seller/..."
            aria-describedby={errors.ozon ? "ozon-error" : undefined}
          />
          {errors.ozon && <small id="ozon-error">{errors.ozon}</small>}
        </label>

        <label className="field field-wide">
          <span>Что необходимо улучшить?</span>
          <textarea
            name="task"
            rows={5}
            maxLength={1200}
            placeholder="Кратко опишите текущую задачу: рост прибыли, реклама, процессы, работа команды или масштабирование бизнеса."
          />
        </label>
      </div>

      <label className={`consent-field ${errors.consent ? "has-error" : ""}`}>
        <input name="consent" type="checkbox" value="Подтверждено" required />
        <span>Я соглашаюсь на обработку персональных данных.</span>
      </label>
      {errors.consent && <small className="consent-error">{errors.consent}</small>}

      <label className="honeypot" aria-hidden="true">
        Не заполняйте это поле
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-submit-row">
        <button className="primary-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправляем заявку…" : "Получить консультацию"}
          <span aria-hidden="true">↗</span>
        </button>
        <p>Ответим в ближайшее рабочее время.</p>
      </div>

      <div
        className={`form-status ${status.kind}`}
        role="status"
        aria-live="polite"
      >
        {status.message}
      </div>
    </form>
  );
}

export default function Home() {
  const pointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    event.currentTarget.style.setProperty("--mx", `${x * 12}px`);
    event.currentTarget.style.setProperty("--my", `${y * 12}px`);
  };

  return (
    <>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="DRI — на главную">DR<span>I</span></a>
        <nav aria-label="Основная навигация">
          <a href="#work">Что мы делаем</a>
          <a href="#team-audit">Аудит команды</a>
          <a href="#results">Результаты</a>
          <a href="#experts">Эксперты</a>
        </nav>
        <a className="nav-cta" href="#contact">Получить аудит <span>↗</span></a>
      </header>

      <main onPointerMove={pointerMove}>
        <section className="hero section-pad" id="top">
          <div className="hero-scene" aria-hidden="true">
            <div className="scene-orb orb-a" />
            <div className="scene-orb orb-b" />
            <div className="scene-grid" />
          </div>

          <div className="hero-copy-block">
            <p className="eyebrow"><i />Консалтинг для действующих продавцов Ozon</p>
            <motion.h1
              initial={{ opacity: 0.76, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              Увеличиваем прибыль<br />действующего бизнеса <span>на Ozon</span>
            </motion.h1>
            <p className="hero-lead">
              Находим слабые места и точки роста через аудит и аналитику, затем
              внедряем процессы, которые делают магазин управляемым, эффективным
              и готовым к масштабированию.
            </p>
            <p className="hero-positioning">
              Не агентство и не набор разрозненных услуг. Команда экспертов,
              которая работает вместе с собственником и отвечает за качество
              внедрения.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#contact">Получить аудит бизнеса <span>↗</span></a>
              <a className="text-link" href="#results">Посмотреть результаты <span>↓</span></a>
            </div>
            <div className="hero-proof">
              <strong>47</strong>
              <span>брендов уже работали<br />с командой DRI</span>
            </div>
          </div>

          <HeroDashboard />
        </section>

        <section className="work section-pad" id="work">
          <SectionHeading
            eyebrow="Развитие бизнеса"
            title={<>Находим, что сдерживает рост.<br /><span>Внедряем то, что меняет результат.</span></>}
            text="Анализируем действующий бизнес целиком: экономику, ассортимент, рекламу, команду и ежедневные процессы. Затем определяем приоритеты и сопровождаем изменения."
          />

          <div className="work-grid">
            {workDirections.slice(0, 2).map((direction, index) => (
              <WorkDirection direction={direction} index={index} key={direction.title} />
            ))}
          </div>

          <TeamAudit />

          <div className="work-grid work-grid-bottom">
            {workDirections.slice(2).map((direction, index) => (
              <WorkDirection direction={direction} index={index} key={direction.title} />
            ))}
          </div>

          <Reveal className="delivery-strip">
            <div>
              <span>Модель работы</span>
              <strong>От диагностики — к управляемому результату</strong>
            </div>
            <ol>
              {workModel.map((step, index) => (
                <li key={step}>
                  <span>0{index + 1}</span>
                  <b>{step}</b>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="principles-row">
            {principles.map((principle, index) => (
              <Reveal delay={index * 0.03} key={principle.title}>
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="selective-support">
            <span>Индивидуальное сопровождение</span>
            <h3>В отдельных случаях мы берём бизнес на полное сопровождение</h3>
            <p>
              Только после аудита и оценки текущего состояния проекта. Сначала
              анализируем бизнес и потенциал роста — затем принимаем решение о
              долгосрочном сотрудничестве.
            </p>
          </Reveal>
        </section>

        <section className="results section-pad" id="results">
          <SectionHeading
            eyebrow="Результаты"
            title={<>Решения,<br /><span>подтверждённые цифрами.</span></>}
            text="Оцениваем изменения по их влиянию на прибыль, продажи, конверсию и устойчивость бизнеса."
          />
          <ResultsCases />
          <Experts />
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-shell">
            <Reveal className="contact-copy">
              <p className="eyebrow"><i />Следующий шаг</p>
              <h2>Найдём точки роста вашего бизнеса <span>на Ozon</span></h2>
              <p>
                Начнём с текущих показателей, задач и ограничений. Проведём аудит,
                определим приоритеты и обсудим изменения, которые могут увеличить
                прибыль и повысить эффективность команды.
              </p>
              <div className="contact-note">
                <span>01</span>
                <p>Без типовой презентации и обещаний до диагностики.</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div>
            <a className="brand" href="#top">DR<span>I</span></a>
            <p>Системное развитие<br />бизнеса на Ozon</p>
          </div>
          <a href="mailto:dri.krd@bk.ru">dri.krd@bk.ru <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DRI</span>
          <span>Консалтинг для владельцев действующего бизнеса на Ozon</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </>
  );
}
