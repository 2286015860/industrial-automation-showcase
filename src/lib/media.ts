export function getMediaUrl(file: string): string {
  return `${import.meta.env.BASE_URL}media/${file}`
}
