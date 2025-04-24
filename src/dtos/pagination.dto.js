export const cursorPaginationDTO = (items, idField) => {
    return {
      data: items,
      pagination: {
        cursor: items.length ? items[items.length - 1][idField] : null,
      },
    };
  };  