import "@testing-library/jest-dom";

describe("Init test jest", () => {
  test("Equals strings", () => {
    // 1. Inicializamos
    const mensaje = "Hola mundo";
    // 2. Estímulo
    const mensaje2 = `Hola mundo`;
    // 3. Observar el comportamiento
    expect(mensaje).toBe(mensaje2);
  });
});
