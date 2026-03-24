export function getAlertLevel(percent: number): "green" | "orange" | "red" {
  if (percent < 79) return "green";
  if (percent < 99) return "orange";
  return "red";
}

export function getAlertClass(percent: number): string {
  return {
    green: "alert-green",
    orange: "alert-orange",
    red: "alert-red"
  }[getAlertLevel(percent)];
}
