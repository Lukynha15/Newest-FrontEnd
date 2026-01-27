export function formatDate(date: Date) {
  const postDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - postDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return "Agora há pouco";
  } else if (diffInHours < 24) {
    return `Há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
  } else if (diffInDays < 7) {
    return `Há ${diffInDays} dia${diffInDays > 1 ? "s" : ""}`;
  } else {
    return postDate.toLocaleDateString("pt-BR");
  }
}

export function formatDateLong(date?: string) {
  if (!date) return "Data não disponível";

  const formatted = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formatted.replace(
    /(\d{2}) de (\w+)/,
    (_, day, month) => `${day} de ${month[0].toUpperCase()}${month.slice(1)}`
  );
}

