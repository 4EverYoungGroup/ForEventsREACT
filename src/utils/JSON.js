export const mergeObjects = (obj1, obj2) => {
  if (!obj1 && !obj2) return null;
  if (!obj1) return JSON.parse(JSON.stringify(obj2));
  if (!obj2) return JSON.parse(JSON.stringify(obj1));
  var merged = {};
  for (var key1 in obj1) {
    if (obj2[key1] && obj2[key1] instanceof Object) {
      merged[key1] = mergeObjects(obj1[key1], obj2[key1]);
    } else if (obj2[key1]) {
      merged[key1] = obj2[key1];
    } else merged[key1] = obj1[key1];
  }
  for (var key2 in obj2) {
    if (!obj1[key2]) {
      merged[key2] = obj2[key2];
    }
  }
  return merged;
};
