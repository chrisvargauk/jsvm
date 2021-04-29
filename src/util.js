export const createMemory = size => {
  const arrayBuffer = new ArrayBuffer(size);
  const dataView    = new DataView(arrayBuffer);
  return dataView;
};