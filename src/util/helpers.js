export function generateID() {
  const string = Date.now().toString(8);
  return (
    "1" +
    string
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("")
  );
}

export function groupBy(array, key) {
  return array.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function groupByAndSum(array, key) {
  var result = [];
  array.reduce(function (res, value) {
    if (!res[value[key]]) {
      res[value[key]] = { category: value[key], amount: 0 };
      result.push(res[value[key]]);
    }
    res[value[key]].amount += value.amount;
    return res;
  }, {});
  return result;
}
