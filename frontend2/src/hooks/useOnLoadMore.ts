// useOnLoadMore.ts
import { useState } from "react";

type UseOnLoadMoreProps<T> = {
  apiFunc: (page: string, ...args: any[]) => Promise<T[]>;
  args?: any[];
  statusDiferent?: string;
};

export function useOnLoadMore<T>({
  apiFunc,
  args = [],
  statusDiferent,
}: UseOnLoadMoreProps<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);

  const onLoadMore = async () => {
    if (loading) return;

    setLoading(true);
    try {
      let results = await apiFunc(String(page), ...args);

      if (!results.length) {
        setLoading(false);
        return;
      }

      if (statusDiferent) {
        results = results.filter((item: any) => item.status !== statusDiferent);
      }

      const newData = [...new Set([...data, ...results])];
      setData(newData);
      setPage(page + 1);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, onLoadMore };
}
