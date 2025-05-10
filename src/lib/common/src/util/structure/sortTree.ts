export function sortTree<T extends { id: number; children: T[]; parent?: T }>(
  items: T[],
): T[] {
  const knownItems: Map<number, T> = new Map();
  const missingParents: Map<number, T[]> = new Map();
  const result: T[] = [];

  for (const item of items || []) {
    if (!item.children) {
      item.children = [];
    }

    knownItems.set(item.id, item);

    if (item.parent?.id !== undefined) {
      if (knownItems.has(item.parent.id)) {
        knownItems.get(item.parent.id)!.children.push(item);
      } else {
        if (!missingParents.has(item.parent.id)) {
          missingParents.set(item.parent.id, []);
        }
        missingParents.get(item.parent.id)!.push(item);
      }
    } else {
      result.push(item);
    }

    if (missingParents.has(item.id)) {
      for (const newChild of missingParents.get(item.id)!) {
        item.children.push(newChild);
      }
      missingParents.delete(item.id);
    }
  }

  if (missingParents.size > 0) {
    console.warn("There must be no missingParent on this line");
  }

  return result;
}
