import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/types";
import { t } from "@/lib/i18n/ui";

const SITE_KEY = "jmarianolmes5ab095ec";
const SCRIPT_ID = "conjuga-meus-online-tracker";
const PUBLIC_HOST = "jmarianolmes.github.io";

type CounterStats = {
  online: number;
  total: number;
};

type CounterController = {
  stats: CounterStats | null;
};

type WindowWithCounter = Window & {
  Contador?: CounterController;
};

export function VisitorCounter({ locale }: { locale: Locale }) {
  const [stats, setStats] = useState<CounterStats | null>(null);
  const formatNumber = new Intl.NumberFormat(locale);

  useEffect(() => {
    if (window.location.hostname !== PUBLIC_HOST) return;

    const updateStats = (value: CounterStats | null | undefined) => {
      if (!value) return;
      const online = Number(value.online);
      const total = Number(value.total);
      if (!Number.isFinite(online) || !Number.isFinite(total)) return;
      setStats({ online, total });
    };

    const handleUpdate = (event: Event) => {
      updateStats((event as CustomEvent<CounterStats>).detail);
    };

    document.addEventListener("contador:update", handleUpdate);

    const counterWindow = window as WindowWithCounter;
    updateStats(counterWindow.Contador?.stats);

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://meusonline.com/tracker.js";
      script.dataset.site = SITE_KEY;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => document.removeEventListener("contador:update", handleUpdate);
  }, []);

  const display = (value: number | undefined) =>
    value === undefined ? "—" : formatNumber.format(value);

  return (
    <div className="mb-3 flex flex-col items-center gap-1.5">
      <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-border/70 bg-surface/70 px-3 py-2 tabular-nums">
        <span className="inline-flex items-center gap-1.5">
          <span>{t(locale, "counterAccesses")}</span>
          <strong className="font-semibold text-foreground">{display(stats?.total)}</strong>
        </span>
        <span aria-hidden="true" className="text-border">
          ·
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
          <span>{t(locale, "counterOnlineNow")}</span>
          <strong className="font-semibold text-foreground">{display(stats?.online)}</strong>
        </span>
      </div>
      <p className="text-[10px] leading-relaxed text-muted-foreground">
        {t(locale, "counterHint")} ·{" "}
        <a
          href="https://meusonline.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Meus Online
        </a>
      </p>
    </div>
  );
}
