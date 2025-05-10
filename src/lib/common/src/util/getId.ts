let maxId = 0;
export function getId(validate: (id: string) => boolean = () => true) {
  let id = (maxId++).toString(36).toUpperCase();
  while (!validate(id)) {
    id = (maxId++).toString(36).toUpperCase();
  }
  return id;
}
