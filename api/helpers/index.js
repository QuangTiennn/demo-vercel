export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const getDOB = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
  const year = dateObj.getFullYear();

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

export const hidePassword = (data) => {
  if (data.password) {
    const { password, ...dataRemain } = data;
    return dataRemain;
  }
  return;
};

export const mergedArray = (array1, array2, key) => {
  const mergedArray = [];
  array1.forEach((obj) => {
    mergedArray.push(obj);
  });
  // Merge elements from member or huntingZone and prioritize elements from array 2 when duplicate on "order" field
  array2.forEach((obj) => {
    const existingObjIndex = mergedArray.findIndex(
      (item) => item[key] === obj[key]
    );
    if (existingObjIndex !== -1) {
      mergedArray[existingObjIndex] = obj;
    } else {
      mergedArray.push(obj);
    }
  });
  return mergedArray;
};

export const paginateArray = (data, page, limit, sortField, sortOrder) => {
  let result = data;
  if (sortField && sortOrder) {
    result = sortData(data, sortField, sortOrder);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    docs: result.slice(startIndex, endIndex),
    totalDocs: data.length,
    limit: Number(limit),
    totalPages: Number(Math.ceil(data.length / limit)),
    page: Number(page),
    pagingCounter: Number(page),
    hasPrevPage: page > 1,
    hasNextPage: endIndex < data.length,
    prevPage: Number(page) - 1,
    nextPage: Number(page) + 1,
  };
};

export const sortData = (data, field, order) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (order === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return sortedData;
};
