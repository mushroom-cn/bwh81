export function getLinkPath(path: string[]) {
  return path.filter(Boolean).join('/');
}
