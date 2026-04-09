export function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <section className="status-card">
      <strong>{title}</strong>
      <p className="muted">{description}</p>
    </section>
  );
}
