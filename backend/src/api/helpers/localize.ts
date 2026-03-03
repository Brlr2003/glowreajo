export function localize(obj: any, locale: string, fields: string[]) {
  if (locale !== "ar") return obj
  const result = { ...obj }
  for (const f of fields) {
    if (obj[`${f}_ar`]) result[f] = obj[`${f}_ar`]
  }
  return result
}

export function localizeArray(arr: any[], locale: string, fields: string[]) {
  return arr.map((item: any) => localize(item, locale, fields))
}
