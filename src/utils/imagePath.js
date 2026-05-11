// 원본 이미지 경로를 WebP 최적화 이미지 경로로 바꿔주는 파일
export const getImagePath = (imagePath) => {
  const normalizedPath = imagePath.replace(/^\//, "");
  const webpPath = normalizedPath
    .replace(/^img\//, "img-webp/")
    .replace(/\.(jpe?g|png)$/i, ".webp");

  return `${import.meta.env.BASE_URL}${webpPath}`;
};
