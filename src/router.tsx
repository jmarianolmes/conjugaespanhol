import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function routerBasepath(): string | undefined {
  const raw = import.meta.env.BASE_URL || "/";
  if (raw === "/") return undefined;
  return raw.replace(/\/$/, "");
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    basepath: routerBasepath(),
  });
}
