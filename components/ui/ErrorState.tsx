type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
}: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-300 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-700">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}