export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className="panel status-card">
      <strong>{title}</strong>
      <p className="muted">{description}</p>
    </section>
  );
}
