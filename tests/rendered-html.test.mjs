import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the repositioned DRI Ozon consulting page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

  assert.match(html, /<title>DRI — развитие действующего бизнеса на Ozon<\/title>/i);
  assert.match(text, /Увеличиваем прибыль действующего бизнеса на Ozon/);
  assert.match(text, /Получить аудит бизнеса/);
  assert.match(text, /Находим, что сдерживает рост/);
  assert.match(text, /Аудит компетенций команды Ozon/);
  assert.match(text, /Эксперты DRI/);
  assert.match(text, /Найдём точки роста вашего бизнеса на Ozon/);
  assert.match(text, /Получить консультацию/);
  assert.match(text, /dri\.krd@bk\.ru/);

  assert.doesNotMatch(
    text,
    /Запуск бизнеса на Ozon|Новый бизнес|Выбор продукта|Поиск поставщиков|Wildberries|Яндекс Маркет|Мегамаркет|KazanExpress/i,
  );
  assert.doesNotMatch(text, /hello@dri\.agency/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders an accessible contact form and all expert profiles", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<form\b/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="phone"/i);
  assert.match(html, /name="company"/i);
  assert.match(html, /name="ozon_store"/i);
  assert.match(html, /name="task"/i);
  assert.match(html, /name="consent"/i);
  assert.match(html, /aria-live="polite"/i);
  assert.match(html, /Рафаэль/);
  assert.match(html, /Данил/);
  assert.match(html, /Илья/);
});

test("keeps production metadata, base-path assets, and clean project structure", async () => {
  const [page, layout, packageJson, nextConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /id="contact"/);
  assert.match(page, /id="team-audit"/);
  assert.match(page, /const experts = \[/);
  assert.match(page, /name: "Рафаэль"[\s\S]*?image: "c977cd58-4e51-4858-8e52-168dd6da2d0f\.jpg"/);
  assert.match(page, /name: "Данил"[\s\S]*?image: "df63ecdd-479f-42ce-8de2-c5220b549cd6\.jpg"/);
  assert.match(page, /name: "Илья"[\s\S]*?image: "5d882f9b-f410-4efb-b8f6-7b65d687747d\.jpg"/);
  assert.match(page, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /NEXT_PUBLIC_FORM_ENDPOINT/);
  assert.match(layout, /DRI — развитие действующего бизнеса на Ozon/);
  assert.match(layout, /dri\.krd@bk\.ru/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(nextConfig, /basePath/);
  assert.doesNotMatch(
    `${page}\n${layout}`,
    /Wildberries|Яндекс Маркет|Мегамаркет|KazanExpress/i,
  );
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
