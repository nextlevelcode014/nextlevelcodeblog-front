export function formatViews(views: number): string {
  return new Intl.NumberFormat('pt-BR').format(views)
}
