import { DataType } from "../../../pages/types/balance-type";

export type ScrollableListProps = {
    data: DataType[];
    loading: boolean;
    onLoadMore: () => void;
    setValue: (item: DataType) => JSX.Element;
    admin?: boolean;
  }