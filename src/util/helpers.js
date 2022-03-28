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
