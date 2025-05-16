import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male)).toBeGreaterThan(0);
});

test("Pommespanzer 150KG", () => {
  expect(calcDateOnDiet(79, 150, 1.81, 17, Sex.Male)).toBeCloseTo(99);
});