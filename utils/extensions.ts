export function extractExtension(title: string): string {
  const fileNameParts = title.split('.')
  return fileNameParts.length > 1
    ? fileNameParts.pop()?.toLowerCase() || ''
    : ''
}
