export function localize(obj: any, locale: string, fields: string[]) {
  const plain = JSON.parse(JSON.stringify(obj))
  for (const f of fields) {
    if (locale === "ar" && plain[`${f}_ar`]) plain[f] = plain[`${f}_ar`]
    delete plain[`${f}_ar`]
  }
  return plain
}

export function localizeArray(arr: any[], locale: string, fields: string[]) {
  return arr.map((item: any) => localize(item, locale, fields))
}
