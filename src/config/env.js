const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://example.com/api';
const uploadImgUrl = `${baseUrl}/file/uploadImageBase64`;

export {
  uploadImgUrl,
  baseUrl,
};
