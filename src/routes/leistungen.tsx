import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leistungen")({
  component: LeistungenLayout,
});

function LeistungenLayout() {
  return <Outlet />;
}
