import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LocaleProvider } from "@/lib/i18n/locale";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Conjuga";
const base = import.meta.env.BASE_URL;

const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Pratique os tempos verbais em espanhol: presente, pretérito, subjuntivo e mais, com correção na hora.",
      },
      { name: "theme-color", content: "#1e4a44" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: `${base}favicon.svg` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: `${base}__grok/manifest.webmanifest` },
      { rel: "apple-touch-icon", href: `${base}__grok/icon-180.png` },
    ],
  }),
  component: () => (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var s=localStorage.getItem("conjuga-locale");var ok={pt:1,en:1,ru:1,uk:1,zh:1};var loc=s&&ok[s]?s:"";if(!loc){var list=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||""];loc="pt";for(var i=0;i<list.length;i++){var c=String(list[i]||"").toLowerCase();if(c.indexOf("pt")===0){loc="pt";break}if(c.indexOf("uk")===0){loc="uk";break}if(c.indexOf("ru")===0){loc="ru";break}if(c.indexOf("zh")===0){loc="zh";break}if(c.indexOf("en")===0){loc="en";break}}}var html={pt:"pt-BR",en:"en",ru:"ru",uk:"uk",zh:"zh-CN"}[loc]||loc;document.documentElement.lang=html;}catch(e){}})();',
          }}
        />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <Outlet />
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

export { Route };
