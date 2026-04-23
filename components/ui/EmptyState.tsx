type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No results found",
  description = "Try searching with a valid country name.",
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}