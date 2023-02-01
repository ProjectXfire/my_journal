import "@testing-library/jest-dom";
import axios from "axios";
// Helpers
import { imageReader } from "@/modules/shared/helpers";

describe("Test in Image reader", () => {
  test("should return the 2 images Files, the FormData and validation true", async () => {
    // Images size is lower than 50Kb
    const imageUrl = [
      "https://res.cloudinary.com/dqnzg6ipa/image/upload/v1644859285/gfapirmsfop2skjpaptl.jpg",
      "https://res.cloudinary.com/dqnzg6ipa/image/upload/v1645735280/zyrzk6rqid97ynsnnpxs.jpg",
    ];
    const resp1 = await axios.get(imageUrl[0], { responseType: "blob" });
    const resp2 = await axios.get(imageUrl[1], { responseType: "blob" });
    const blob1 = resp1.data;
    const blob2 = resp2.data;
    const file1 = new File([blob1], "test1.jpg", { type: "image/jpg" });
    const file2 = new File([blob2], "test2.jpg", { type: "image/jpg" });
    const result = await imageReader([file1, file2]);
    expect(typeof result).toBe("object");
    expect(result.allImagesAreOk).toBe(true);
    expect(Array.isArray(result.convertBase64Images)).toBe(true);
  });

  test("should return the 1 images Files, the FormData and validation false", async () => {
    // Images size is lower than 50Kb
    // One image exceed the limit
    const imageUrl = [
      "https://res.cloudinary.com/dqnzg6ipa/image/upload/v1657827187/cld-sample.jpg",
      "https://res.cloudinary.com/dqnzg6ipa/image/upload/v1645735280/zyrzk6rqid97ynsnnpxs.jpg",
    ];
    const resp1 = await axios.get(imageUrl[0], { responseType: "blob" });
    const resp2 = await axios.get(imageUrl[1], { responseType: "blob" });
    const blob1 = resp1.data;
    const blob2 = resp2.data;
    const file1 = new File([blob1], "test1.jpg", { type: "image/jpg" });
    const file2 = new File([blob2], "test2.jpg", { type: "image/jpg" });
    const result = await imageReader([file1, file2]);
    expect(typeof result).toBe("object");
    expect(result.allImagesAreOk).toBe(false);
    expect(Array.isArray(result.convertBase64Images)).toBe(true);
  });

  test("should return the 0 images Files, the FormData and validation false", async () => {
    // Images size is lower than 50Kb
    // Thw two image exceed the limit
    const imageUrl = [
      "https://res.cloudinary.com/dqnzg6ipa/image/upload/v1657827187/cld-sample.jpg",
      "https://res.cloudinary.com/dqnzg6ipa/image/upload/v1657827187/cld-sample.jpg",
    ];
    const resp1 = await axios.get(imageUrl[0], { responseType: "blob" });
    const resp2 = await axios.get(imageUrl[1], { responseType: "blob" });
    const blob1 = resp1.data;
    const blob2 = resp2.data;
    const file1 = new File([blob1], "test1.jpg", { type: "image/jpg" });
    const file2 = new File([blob2], "test2.jpg", { type: "image/jpg" });
    const result = await imageReader([file1, file2]);
    expect(typeof result).toBe("object");
    expect(result.allImagesAreOk).toBe(false);
    expect(Array.isArray(result.convertBase64Images)).toBe(true);
    expect(result.convertBase64Images.length === 0).toBe(true);
  });
});
