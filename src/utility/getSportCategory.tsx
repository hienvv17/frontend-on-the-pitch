export function getSportFieldsByBranch(branchId: any, data: any) {
  // console.log(!branchId);

  if (!branchId) return [];

  // Tìm branch tương ứng với branchId
  const branch = data.raw.branchs.find((b: any) => b.id === branchId);
  if (!branch) return [];

  // Lọc sportFields theo sport_categories của branch
  const filteredSportFields = data.raw.sportFields.filter((sportField: any) =>
    branch.sport_categories.some((category: any) => category.id === sportField.id),
  );

  // Định dạng lại dữ liệu
  return filteredSportFields.map((sportField: any) => ({
    value: sportField.id,
    label: sportField.name,
  }));
}
