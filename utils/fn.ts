/**
 *
 * 处理省市区
 *
 * */
export function transformData(data: any) {
  data.forEach((item: any) => {
    item.value = item.name;
    item.label = item.name;
    if (item.children && item.children.length > 0) {
      transformData(item.children);
    }
  });
}