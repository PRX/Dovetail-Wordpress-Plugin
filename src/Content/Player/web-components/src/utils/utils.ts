export function attributesToObject(el: any): {[k: string]: any} {
  let result = {};
  for(let i = 0; i < el.attributes.length; i++) {
    result[el.attributes[i].name] = el.attributes[i].value;
  }
  return result;
}
