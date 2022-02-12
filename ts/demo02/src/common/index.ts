export function getTime() {
  let now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}`
}
