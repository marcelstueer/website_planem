import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aktuelles")({
  component: AktuellesLayout,
});

function AktuellesLayout() {
  return <Outlet />;
}