export function RetryButton({
  isPending,
  onClick
}: {
  isPending: boolean;
  onClick: () => void;
}) {
  return (
    <button className="button" type="button" disabled={isPending} onClick={onClick}>
      {isPending ? "Retrying..." : "Retry"}
    </button>
  );
}
