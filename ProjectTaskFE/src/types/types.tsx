import * as React from "react";
import {
  GetRowKey,
  ColumnType as RcColumnType,
  RenderedCell as RcRenderedCell,
  ExpandableConfig,
} from "rc-table/lib/interface";
import { ColumnsType } from "antd/es/table";
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}

export interface AllUsersProps {
  total: number;
  rows: User[] | undefined;
}

export interface getUsersParamsProps {
  page: number;
  limit: number;
  email: string | null;
  phonenumber: string | null;
  firstname: string | null;
  lastname: string | null;
}

export interface ColumnFilterItem {
  text: React.ReactNode;
  value: string | number | boolean;
  children?: ColumnFilterItem[];
}
export interface FilterConfirmProps {
  closeDropdown: boolean;
}

export interface FilterDropdownProps {
  prefixCls?: string;
  setSelectedKeys?: (selectedKeys: React.Key[]) => void;
  selectedKeys?: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible?: boolean;
}

export interface IColumnsProps extends ColumnsType<User> {}
