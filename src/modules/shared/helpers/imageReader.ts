import { imageConst } from "./constants";

export const imageReader = async (files: File[]) => {
  const filteredImages = [];
  const formData = new FormData();

  // Filter by size and type
  for (let i = 0; i < files.length; i++) {
    const size = files[i].size;
    const type = files[i].type.includes("image");
    if (imageConst.LIMIT_SIZE >= size && type) filteredImages.push(files[i]);
  }

  // Get reader images
  const toBase64Promises = filteredImages.map((img) => {
    formData.append("files", img);
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  });

  // Resolve promises
  const convertBase64Images = await Promise.all(toBase64Promises);
  return {
    convertBase64Images,
    imageFiles: formData,
    allImagesAreOk: filteredImages.length === files.length,
  };
};
