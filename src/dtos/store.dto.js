export const validateCreateStoreDto = (data) => {
    const { store_name, category, address, region_id } = data;
  
    if (!store_name || !category || !address || !region_id) {
      throw new Error("모든 필드는 필수입니다.");
    }
  
    if (
      typeof store_name !== "string" ||
      typeof category !== "string" ||
      typeof address !== "string"
    ) {
      throw new Error("store_name, category, address는 문자열이어야 합니다.");
    }
  
    if (isNaN(region_id)) {
      throw new Error("region_id는 숫자여야 합니다.");
    }
  
    return {
      store_name,
      category,
      address,
      region_id: Number(region_id),
    };
  };  