export const Sort = {
  String: {
    Asc: (a: string, b: string) => (a < b ? -1 : 1),
    AscMapped:
      <T>(map: (t: T) => string) =>
      (a: T, b: T) =>
        map(a) < map(b) ? -1 : 1,
  },
};
